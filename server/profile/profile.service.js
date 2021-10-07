const db = require('../_helpers/db');

module.exports = {
    update,
};

async function update(id, params) {
    const profile = await getProfile(id);

    // validate
/*    const nameChanged = params.name && profile.name !== params.name;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }*/

    // copy params to user and save
    console.log(params.profile_pic);
    console.log(params.name);
    console.log(params.bio);

    Object.assign(profile, params);
    await profile.save();

    return profile.get();
}

// helper functions

async function getProfile(id) {

    console.log(id);
    const profile = await db.Profile.findByPk(id);
    return profile;
}