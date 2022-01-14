const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const profileService = require('./profile.service');
const { secret } = require('../config.json');
const path = require('path');

router.put('/:id', authorize(), validateUpdate, updateProfile)
router.post('/upload', authorize(), profileService.upload_multer.single('image'), upload);
//router.get('/avatar', authorize(), getAvatar)
module.exports = router;

function validateUpdate(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        bio: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateProfile(req, res, next) {
    console.log(req.params);
    console.log(req.body)
    profileService.update(req.params.id, req.body)
        .then(profile => res.json(profile))
        .catch(next);
}

function upload(req, res, next) {
    profileService.upload(req, res, next)
}

/*function getAvatar(req, res, next){

}*/

