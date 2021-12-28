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
//router.post('/upload', authorize(), profileService.upload_multer.single('image'), upload);
router.post('/upload', authorize(), profileService.upload_multer.single('image'), upload);
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

function upload(req, res, next) {
    profileService.upload(req, res, next)
}

