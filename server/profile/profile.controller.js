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
router.put('/:id/upload', authorize(), profileService.upload_multer.single('image'), upload);
//Delete profile picture from Amazon s3 bucket
router.delete('/:id/remove', authorize(), remove);
router.get('/:id/info', authorize(), getInfo);
router.get('/:username/userinfo',  getUserInfo);
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
    console.log("testing upload");
    profileService.upload(req, res, next)
    .then(profile => res.json(profile))
    .catch(next);
}

function remove(req, res, next){
    console.log("testing remove");
    console.log(req.user)
    profileService.remove(req, res, next)
    .then(profile => res.json(profile))
    .catch(next);
}

function getInfo(req, res, next) {
    //console.log(req.params.id)
    profileService.getProfile(req.params.id)
    .then(profile => res.json(profile))
    .catch(next);
}

function getUserInfo(req, res, next) {
    console.log("test")
    console.log(req.params.username)
    profileService.getUserProfile(req.params.username)
    .then(profile => res.json(profile))
    .catch(next);
}

/*function getAvatar(req, res, next){

}*/

