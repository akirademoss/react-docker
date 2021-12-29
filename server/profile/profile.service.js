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


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Create storage for image upload
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
        cb(null, "avatar" + path.extname(file.originalname));
    }
});

// Create a file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
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
    upload_multer,
    makeDir
};

async function update(id, params) {
    const profile = await getProfile(id);
    //console.log(profile)
    console.log(params.name);
    console.log(params.bio);
    console.log(params.previewImg);
    console.log(params.previewImgMobile);
    console.log(params.thumbImg);
    console.log(params.thumbImgMobile); 

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

//make directory
function makeDir(req){
    console.log(req.user.username)
    fs.mkdir('./uploads/' + req.user.username,  { recursive: true }, (err) => {
      if (err)
        return console.error(err.code);
    });
}

//Image resizing function
async function resizeImage(id, username){
    //need to check that file exists first
    console.log("testing resize image")
    
    let imgBuffer = await sharp('./uploads/' + username + '/avatar.jpeg').toBuffer()
    console.log("testing resize image")
    let avatar_thumb = await sharp(imgBuffer).resize(40,40).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    let avatar_thumb_mobile = await sharp(imgBuffer).resize(30,30).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    let avatar_preview = await sharp(imgBuffer).resize(180,180).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    let avatar_preview_mobile = await sharp(imgBuffer).resize(110,110).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    console.log("testing buffers set")

    fs.writeFile('./uploads/' + username + '/avatar_thumb.jpg', avatar_thumb, err => {
        if (err) console.log(err);
        else{
           uploadFile('./uploads/' + username + '/avatar_thumb.jpg', 'avatar_thumb.jpg');
        }
    });   
    fs.writeFile('./uploads/' + username + '/avatar_thumb_mobile.jpg', avatar_thumb_mobile, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_thumb_mobile.jpg', 'avatar_thumb_mobile.jpg');
         }
    });
    fs.writeFile('./uploads/' + username + '/avatar_preview.jpg', avatar_preview, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_preview.jpg', 'avatar_preview.jpg');
         }
    });
    fs.writeFile('./uploads/' + username + '/avatar_preview_mobile.jpg', avatar_preview_mobile, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_preview_mobile.jpg', 'avatar_preview_mobile.jpg');
         }
    });
    
    // Enter copied or downloaded access ID and secret key here
    const ID = config.AWS_ACCESS_KEY_ID;
    const SECRET = config.AWS_SECRET_ACCESS_KEY;

    // The name of the bucket that you have created
    const BUCKET_NAME = config.AWS_BUCKET_NAME;

    //AWS code portion
    //initialize the s3 interface
    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });

    //here we upload the file
   const uploadFile = (fileName, avatarName) => {
     // Read content from the file
     const fileContent = fs.readFileSync(fileName);

     // Setting up S3 upload parameters
     const params = {
         Bucket: BUCKET_NAME,
         Key: username + '/' + avatarName, // File name you want to save as in S3
         Body: fileContent
     };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
   };

}

const rmAsync = promisify(fs.rm)

async function upload(req, res, next){
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    
    const id = req.user.id
    const username = req.user.username
    await resizeImage(req.params.id, username);
    await rmAsync('./uploads/' + username, { recursive: true, force: true })

    const profile = await getProfile(id);

    var params = {
        thumbImg: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_thumb.jpg',
        thumbImgMobile: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_thumb_mobile.jpg',
        previewImg: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_preview.jpg',
        previewImgMobile: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_preview_mobile.jpg'
    }

    Object.assign(profile, params);
    await profile.save();
    res.send(file);   
};