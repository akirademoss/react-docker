const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const profileService = require('./profile.service');

router.post('/edit')
router.put('/update')

module.exports = router;

function getProfileData(req, res, next) {
    const schema = Joi.object({
        profile_pic: Joi.string().required(),
        name: Joi.string().required(),
        bio: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function write(req, res, next) {
    profileService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}