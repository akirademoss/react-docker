const express = require('express');
const db = require('../_helpers/db');
const config = require('../config.json');
const sharp = require("sharp");
const AWS = require("aws-sdk");
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const jwt = require('express-jwt');
const { secret } = require('../config.json');
const { promisify } = require('util')
//disable cache so we can upload a new photo
sharp.cache(false);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//AWS bucket name constant
const BUCKET_NAME = config.AWS_BUCKET_NAME;
// Enter copied or downloaded access ID and secret key here
const ID = config.AWS_ACCESS_KEY_ID;
const SECRET = config.AWS_SECRET_ACCESS_KEY;
//initialize the s3 interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// Creates a directory with a user's username on server in uploads directory and resaves image as avatar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const path = 'uploads/'+req.user.username
        if (!fs.existsSync(path)){
          fs.mkdirSync(path);
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log("path.extname: ")
        console.log(path.extname(file.originalname))
        cb(null, "avatar" );
    }
});

// Create a file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Create multer instance
const upload_multer = multer({ storage: storage, fileFilter: fileFilter});

module.exports = {
    update,
    upload,
    remove,
    upload_multer,
    makeDir,
    getProfile,
    getUserProfile,
};

async function update(id, params) {
    const profile = await getProfile(id);
    Object.assign(profile, params);
    await profile.save();

    return profile.get();
}

// helper functions

async function getProfile(id) {
    const profile = await db.Profile.findByPk(id);
    return profile;
}

async function getUserProfile(username) {
    console.log("Tesing getUserProfile")
    const user = await db.User.findAll({
        raw: true,
        where: {
            username: username,
        }
    })
    id = user[0].id
    
    return getProfile(id);
}
//make directory
function makeDir(req){
    console.log(req.user.username)
    fs.mkdir('./uploads/' + req.user.username,  { recursive: true }, (err) => {
      if (err)
        return console.error(err.code);
    });
}

//Image resizing function
async function resizeImage(id, username, dt, fileExt){
    //first remove image 
    removeFile(id)
    console.log("entering resizeImage function")
    let imgBuffer = await sharp('./uploads/' + username + '/avatar').toBuffer()
    let avatar_preview = await sharp(imgBuffer).resize(150,150).toFormat(fileExt.substring(1)).toBuffer();

    console.log("testing buffers set")

    fs.writeFile('./uploads/' + username + '/avatar_preview' + fileExt, avatar_preview, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_preview' + fileExt, 'avatar_preview' + dt + fileExt, username);
            //img3 = "s3://tlts/" + username + "/avatar_preview" + fileExt;
         }
    });
    
    // Enter copied or downloaded access ID and secret key here
    //const ID = config.AWS_ACCESS_KEY_ID;
    //const SECRET = config.AWS_SECRET_ACCESS_KEY;

    // The name of the bucket that you have created
    //const BUCKET_NAME = config.AWS_BUCKET_NAME;

    //AWS code portion
    //initialize the s3 interface
   // const s3 = new AWS.S3({
       // accessKeyId: ID,
      //  secretAccessKey: SECRET
   // });
    

    //here we upload the file
    {/*const uploadFile = (fileName, avatarName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
    console.log(fileName.mimetype)

    // Setting up S3 upload parameters
    const params = {
         Bucket: BUCKET_NAME,
         Key: username + '/' + avatarName, // File name you want to save as in S3
         Body: fileContent,
         ContentType: 'image/png',
         ACL: 'public-read',
         
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
   };  */}

}

const rmAsync = promisify(fs.rm)

async function upload(req, res, next){
    const file = req.file
    console.log("test1")
    console.log(req.file)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    const id = req.user.id
    const username = req.user.username
    const dt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const fileExt = ".png"
    console.log(dt)
    console.log("waiting for resize")

    
    await resizeImage(req.params.id, username, dt, fileExt);
    await rmAsync('./uploads/' + username, { recursive: true, force: true })
    const profile = await getProfile(id);
    
    var params = {
        previewImg: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_preview' + dt + fileExt,
        previewImgKey:  username + '/avatar_preview' + dt + fileExt,
        //thumbImg: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_thumb' + fileExt,
        //thumbImgMobile: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_thumb_mobile' + fileExt,
        //previewImgMobile: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_preview_mobile' + fileExt
    }

    Object.assign(profile, params);
    await profile.save();
    return profile.get();  
};

async function remove(req, res, next){
    const id = req.user.id
    console.log(id)
    console.log("testing remove")

    
    removeFile(id)


    var params = {
        previewImg: '',
        previewImgKey:  '',
    }
    const profile = await getProfile(id);
    Object.assign(profile, params);
    await profile.save();

    return profile.get(); 
};

async function removeFile(id){
    const profile = await getProfile(id);
    console.log(profile.previewImgKey)
    key = profile.previewImgKey

    const params = {
        Bucket: BUCKET_NAME,
        Key: key, // File name you want to save as in S3
        //Body: fileContent,
        //ContentType: 'image/png',
        //ACL: 'public-read',
        
    };

    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log("file successfully removed from s3 bucket");                 // deleted
    });
}

async function uploadFile(fileName, avatarName, username) {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
    console.log(fileName.mimetype)

    // Setting up S3 upload parameters
    const params = {
         Bucket: BUCKET_NAME,
         Key: username + '/' + avatarName, // File name you want to save as in S3
         Body: fileContent,
         ContentType: 'image/png',
         ACL: 'public-read',
         
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};