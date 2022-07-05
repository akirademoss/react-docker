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
router.delete('/:id/unfollow', unfollow);
router.delete('/:id/removefollower', removeFollower);
router.get('/:id/myFollowers', authorize(), getMyFollowers);
router.post('/:id/userFollowers', getUserFollowers);
router.get('/:id/myFollowing',  getMyFollowing);
router.post('/:id/userFollowing',  getUserFollowing);
router.get('/:id/myFollowersCount',  getMyFollowersCount);
router.post('/:id/userFollowersCount',  getUserFollowersCount);
router.get('/:id/myFollowingCount',  getMyFollowingCount);
router.post('/:id/userFollowingCount',  getUserFollowingCount);
//note: this should be get request but axios cannot add body with get method so we are using post
router.post('/:id/followingStatus',  authorize(),getFollowingStatus);
router.post('/:id/followingStatusEUM',  authorize(),getFollowingStatusEUM);
router.post('/:id/followingStatusIUM',  authorize(),getFollowingStatusIUM);

module.exports = router;

function follow(req, res, next) {
    const followerId = req.params.id;
    const followedId = req.body.followedId;
    console.log("followedId: ", followedId)
    console.log("followerId: ", followerId)
    console.log("TESTING FOLLOW")
    

    followService.follow(followerId, followedId)
        .then(follow => res.json(follow))
        .catch(next);
}

function unfollow(req, res, next) {
    console.log("entering unfollow code")
    const followerId = req.params.id;
    const followedId = req.body.followedId;
    console.log(followerId);
    console.log(followedId);
    followService.unfollow(followerId, followedId)
        .then(unfollow => res.json(unfollow))
        .catch(next);
}

function removeFollower(req, res, next) {
    console.log("entering removeFollower code")
    const followedId = req.params.id;
    const followerId = req.body.followerId;
    console.log(followerId);
    console.log(followedId);
    followService.removeFollower(followerId, followedId)
        .then(removeFollow => res.json(removeFollow))
        .catch(next);
}

function getMyFollowers(req, res, next) {
    const id = req.params.id;
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

function getUserFollowers(req, res, next) {
    const id = req.body.followedId;
    console.log(id)
    console.log("ENTERING USERFOLLOWER")
    followService.getFollowers(id)
    .then(followers => res.json(followers))
    .catch(next);
}

function getUserFollowing(req, res, next){
    const id = req.body.followedId;
    console.log(id)
    console.log("ENTERING USERFOLLOWING")
    followService.getFollowing(id)
    .then(following => res.json(following))
    .catch(next);
}

function getFollowingStatusEUM(req, res, next) {
    const id = req.body.followedId;
    console.log(id)
    console.log("ENTERING USERFOLLOWER")
    followService.getFollowingStatusEUM(id)
    .then(followers => res.json(followers))
    .catch(next);
}

function getFollowingStatusIUM(req, res, next){
    const id = req.body.followedId;
    console.log(id)
    console.log("ENTERING USERFOLLOWING")
    followService.getFollowingStatusIUM(id)
    .then(following => res.json(following))
    .catch(next);
}

//////////////////////////////////////////////

function getMyFollowersCount(req, res, next){
    const id = req.params.id;
    followService.getMyFollowersCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getUserFollowersCount(req, res, next){
    console.log(".....................................")
    console.log("GETUSERFOLLOWERSCOUNT ENTERING FUNCTION")
    console.log(".....................................")
    const id = req.body.followedId;
    console.log("id: ", id);
    followService.getUserFollowersCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getMyFollowingCount(req, res, next){
    const id = req.params.id;
    followService.getMyFollowingCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getUserFollowingCount(req, res, next){
    const id = req.body.followedId;
    followService.getUserFollowingCount(id)
    .then(count => res.json(count))
    .catch(next);
}

function getFollowingStatus(req, res, next){
    console.log("entering getFollowingStatus server side")
    //console.log(req)
    //console.log(req.body)
    const followerId = req.params.id;
    const followedId = req.body.followedId;
    console.log(req.body)
    console.log("followedId: ", followedId)
    console.log("followerId: ", followerId)

    followService.getFollowingStatus(followerId, followedId)
    .then(status => res.json(status))
    .catch(next);
}
