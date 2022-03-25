const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const profileService = require('./profile.service');
const { secret } = require('../config.json');
const path = require('path');

router.put('/:id', authorize(), updateProfile)
//First uploads the image to server using multer, then resizes and uploads to Amazon s3 bucket
router.post('/upload', authorize(), profileService.upload_multer.single('image'), upload);
router.get('/:id/info', authorize(), getInfo);
//router.get('/avatar', authorize(), getAvatar) 
module.exports = router;

/*function validateUpdate(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        bio: Joi.string().required(),
        link: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}*/

function updateProfile(req, res, next) {
    console.log(req.body.link);
    console.log(req.body)

    profileService.update(req.params.id, req.body)
        .then(profile => res.json(profile))
        .catch(next);
}

function upload(req, res, next) {
    profileService.upload(req, res, next)
}

function getInfo(req, res, next) {
    //console.log(req.params.id)
    profileService.getProfile(req.params.id)
    .then(profile => res.json(profile))
    .catch(next);
}

/*function getAvatar(req, res, next){

}*/

