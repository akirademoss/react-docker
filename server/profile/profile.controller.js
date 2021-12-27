const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const profileService = require('./profile.service');
const { secret } = require('../config.json');
const path = require('path');
const multer = require('multer');
//const sharp = require("sharp");
//const AWS = require("aws-sdk");
//const fs = require('fs');
//const config = require('../config.json');



//uploads path
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Create storage for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
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


router.put('/:id', authorize(), validateUpdate, updateProfile)
router.post('/upload', authorize(), upload_multer.single('image'), upload);

module.exports = router;

function validateUpdate(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        bio: Joi.string().required(),
        imageType: Joi.string().required(),
        imageName: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateProfile(req, res, next) {
    console.log(req.params.id);
    profileService.update(req.params.id, req.body)
        .then(profile => res.json(profile))
        .catch(next);
}
/*
//Image resizing function
async function resizeImage(){
    //need to check that file exists first
    console.log("testing resize image")
    
    let imgBuffer = await sharp('./uploads/avatar.jpeg').toBuffer()
    console.log("testing resize image")
    let avatar_thumb = await sharp(imgBuffer).resize(40,40).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    let avatar_thumb_mobile = await sharp(imgBuffer).resize(30,30).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    let avatar_preview = await sharp(imgBuffer).resize(180,180).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    let avatar_preview_mobile = await sharp(imgBuffer).resize(110,110).toFormat('jpeg').jpeg({quality : 100}).toBuffer();
    console.log("testing buffers set")
/
    fs.writeFile('./uploads/avatar_thumb.jpg', avatar_thumb, err => {
        if (err) console.log(err);
        else{
           uploadFile('./uploads/avatar_thumb.jpg', 'avatar_thumb.jpg');
        }
    });
    
    fs.writeFile('./uploads/avatar_thumb_mobile.jpg', avatar_thumb_mobile, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/avatar_thumb_mobile.jpg', 'avatar_thumb_mobile.jpg');
         }
    });
    fs.writeFile('./uploads/avatar_preview.jpg', avatar_preview, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/avatar_preview.jpg', 'avatar_preview.jpg');
         }
    });
    fs.writeFile('./uploads/avatar_preview_mobile.jpg', avatar_preview_mobile, err => {
        if(err) console.log(err)
        else{
            uploadFile('./uploads/avatar_preview_mobile.jpg', 'avatar_preview_mobile.jpg');
         }
    });
}
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
const uploadFile = (fileName, s3_name) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: s3_name, // File name you want to save as in S3
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

function upload(req, res, next){
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      resizeImage();
      res.send(file);
};*/

function upload(req, res, next) {
    profileService.upload(req, res, next)
}