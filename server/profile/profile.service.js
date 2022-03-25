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
        cb(null, "avatar" + path.extname(file.originalname));
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
    upload_multer,
    makeDir,
    getProfile
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

//make directory
function makeDir(req){
    console.log(req.user.username)
    fs.mkdir('./uploads/' + req.user.username,  { recursive: true }, (err) => {
      if (err)
        return console.error(err.code);
    });
}

//Image resizing function
async function resizeImage(id, username, fileExt){
    //need to check that file exists first
    console.log("testing resize image")
    console.log('./uploads/' + username + '/avatar.jpeg')
  
    let imgBuffer = await sharp('./uploads/' + username + '/avatar' + fileExt).toBuffer()

    //convert to a standard file format to ensure no duplicates in bucket
    fileExt = ".png"
    let avatar_thumb = await sharp(imgBuffer).resize(40,40).toFormat(fileExt.substring(1)).toBuffer();
    let avatar_thumb_mobile = await sharp(imgBuffer).resize(30,30).toFormat(fileExt.substring(1)).toBuffer();
    let avatar_preview = await sharp(imgBuffer).resize(180,180).toFormat(fileExt.substring(1)).toBuffer();
    let avatar_preview_mobile = await sharp(imgBuffer).resize(110,110).toFormat(fileExt.substring(1)).toBuffer();
    console.log("testing buffers set")

    fs.writeFile('./uploads/' + username + '/avatar_thumb' + fileExt, avatar_thumb, err => {
        if (err) console.log(err);
        else{
           uploadFile('./uploads/' + username + '/avatar_thumb' + fileExt, 'avatar_thumb' + fileExt);
           //img1 = "s3://tlts/" + username + "/avatar_thumb" + fileExt;
        }
    });   
    fs.writeFile('./uploads/' + username + '/avatar_thumb_mobile' + fileExt, avatar_thumb_mobile, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_thumb_mobile' + fileExt, 'avatar_thumb_mobile' + fileExt);
            //img2 = "s3://tlts/" + username + "/avatar_thumb_mobile" + fileExt;
         }
    });
    fs.writeFile('./uploads/' + username + '/avatar_preview' + fileExt, avatar_preview, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_preview' + fileExt, 'avatar_preview' + fileExt);
            //img3 = "s3://tlts/" + username + "/avatar_preview" + fileExt;
         }
    });
    fs.writeFile('./uploads/' + username + '/avatar_preview_mobile' + fileExt, avatar_preview_mobile, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/' + username + '/avatar_preview_mobile' + fileExt, 'avatar_preview_mobile' + fileExt);
            //img4 = "s3://tlts/" + username + "/avatar_preview_mobile" + fileExt;
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
     console.log(fileName.mimetype)

     // Setting up S3 upload parameters
     const params = {
         Bucket: BUCKET_NAME,
         Key: username + '/' + avatarName, // File name you want to save as in S3
         Body: fileContent,
         ContentType: 'image/png',
         ACL: 'public-read'
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
    console.log(req.file)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    var fileExt = path.extname(file.originalname)
    const id = req.user.id
    const username = req.user.username
    await resizeImage(req.params.id, username, fileExt);
    await rmAsync('./uploads/' + username, { recursive: true, force: true })

    const profile = await getProfile(id);
    fileExt = ".png"
    var params = {
        thumbImg: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_thumb' + fileExt,
        thumbImgMobile: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_thumb_mobile' + fileExt,
        previewImg: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_preview' + fileExt,
        previewImgMobile: 'https://tlts.s3.amazonaws.com/' + username + '/avatar_preview_mobile' + fileExt
    }

    Object.assign(profile, params);
    await profile.save();
    res.send(file);   
};