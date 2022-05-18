const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const followService = require('./follow.service');
const { secret } = require('../config.json');
const path = require('path');

router.post('/:id/follow', authorize(), follow)
router.delete('/:id/unfollow', authorize(), unfollow);
router.get('/:id/myFollowers', authorize(), getMyFollowers);
router.get('/:id/userFollowers', authorize(), getUserFollowers);
router.get('/:id/myFollowing',  getMyFollowing);
router.get('/:id/userFollowing',  getUserFollowing);
router.get('/:id/myFollowersCount',  getMyFollowersCount);
router.get('/:id/userFollowersCount',  getUserFollowersCount);
router.get('/:id/myFollowingCount',  getMyFollowingCount);
router.get('/:id/userFollowingCount',  getUserFollowingCount);
router.get('/:id/followingStatus',  getFollowingStatus);

module.exports = router;

function follow(req, res, next) {

    const followerId = req.params.id;
    const followedId = req.body.followedId;
    

    followService.follow(followerId, followedId)
        .then(() => res.json({ message: 'Follow successful' }))
        .catch(next);
}

function unfollow(req, res, next) {
    const followerId = req.params.id;
    const followedId = req.body.id;

    followService.unfollow(followerId, followedId)
        .then(() => res.json({ message: 'Unfollow successful' }))
        .catch(next);
}

function getMyFollowers(req, res, next) {
    const id = req.params.id;
    followService.getFollowers(id)
    .then(followers => res.json(followers))
    .catch(next);
}

function getUserFollowers(req, res, next) {
    const id = req.body.id;
    followService.getFollowers(id)
    .then(followers => res.json(followers))
    .catch(next);
}

function getMyFollowing(req, res, next){
    const id = req.params.id;
    followService.getFollowing(id)
    .then(following => res.json(following))
    .catch(next);
}

function getUserFollowing(req, res, next){
    const id = req.body.id;
    followService.getFollowing(id)
    .then(following => res.json(following))
    .catch(next);
}

//////////////////////////////////////////////

function getMyFollowersCount(req, res, next){
    const id = req.params.id;
    followService.getFollowersCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getUserFollowersCount(req, res, next){
    const id = req.body.id;
    followService.getFollowersCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getMyFollowingCount(req, res, next){
    const id = req.params.id;
    followService.getFollowingCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getUserFollowingCount(req, res, next){
    const id = req.body.id;
    followService.getFollowingCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getFollowingStatus(req, res, next){
    const followerId = req.params.id;
    const followedId = req.body.followedId;
    followService.getFollowingStatus(followerId, followedId)
    .then(status => res.json(status))
    .catch(next);
}
