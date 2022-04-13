const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    newAccessToken
};

//note do not do this in production, but this is easier to demo
let refreshTokens = []

async function authenticate({ username, password }) {

    const user = await db.User.scope('withHash').findOne({ where: { username } });
   // console.log(user)
    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ sub: user.id }, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    refreshTokens.push(refreshToken)
    return { ...omitHash(user.get()), accessToken, refreshToken };
}

//TEST
async function newAccessToken({username, password}, { token }) {
    const refreshToken = await validRefreshToken(token);

    //TODO: NEED TO ADD CODE TO VERIFY THE JWT
    console.log(username)
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // generate new jwt
    const accessToken = generateAccessToken(user);
    console.log(accessToken)
    // return basic details and tokens
    return { 
        ...omitHash(user.get()),
        accessToken,
        refreshToken: refreshToken
    };
}

//TEST
async function validRefreshToken(token) {
  //This needs to change - we are not 
  //check if the refresh token exists
  if (token == null) return res.sendStatus(401)
  //check if our current refresh tokens includes a valid token for this refresh
  //if it doesn't exist they don't have access
  if (!refreshTokens.includes(token)) return res.sendStatus(403)
return token;
}

//TEST
async function getRefreshTokens(userId) {
    // check that user exists
    await getUser(userId);

    // return refresh tokens for user
    const refreshTokens = await db.RefreshToken.find({ user: userId });
    return refreshTokens;
}

//TEST
function generateAccessToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: user.id }, config.secret, { expiresIn: '6000s' });
}

//TEST
function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}


async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        const salt = await bcrypt.genSalt()
        console.log(salt)
        params.hash = await bcrypt.hash(params.password, salt)
        //params.hash = await bcrypt.hash(params.password, 10);
        console.log(params.hash)
    }

    // save user
    await db.User.create(params);
    
    // create an associated user profile
    const user = await db.User.findOne({order: [ [ 'createdAt', 'DESC' ]]});
    await db.Profile.create({name: '', bio: '', link: '', previewImg: '', previewImgKey: '',userId: user.id});
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}