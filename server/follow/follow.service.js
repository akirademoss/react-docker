const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    getMyFollowersCount,
    getUserFollowersCount,
    getMyFollowingCount,
    getUserFollowingCount,
    getFollowingStatus, 
    removeFollower,
};

async function follow(followerId, followedId) {

    
    const params = {};
    params["follower"] = followerId;
    params["followed"] = followedId;
    console.log(params)

    if (await db.Follow.findOne({ 
        where: { 
            follower: followerId,
            followed: followedId, 
        } })) 
        {
        throw 'Already Following';
        }
    
    const follow = await db.Follow.create(params);
    const dict = {}
    if(follow){
        dict["followingUser"] = "true";
    }

    return dict;
}

async function unfollow(followerId, followedId) {
    const params = {};
    const dict = {}
    params["follower"] = followerId;
    params["followed"] = followedId;
    const follow = await getFollowed(followerId, followedId)
    if(follow){
        await follow.destroy();
        dict["followingUser"] = "";
    }
}

async function removeFollower(followerId, followedId) {
    const params = {};
    const dict = {}
    params["follower"] = followerId;
    params["followed"] = followedId;
    const follow = await getFollowed(followerId, followedId)
    if(follow){
        await follow.destroy();
        dict["followingUser"] = "";
    }
}

//helper function
async function getFollowed(followerId, followedId) {
    console.log("testing getFollowed")
    const follow = await db.Follow.findOne({
        where: {
            follower: followerId,
            followed: followedId,
        }
    });
    if (!follow) throw 'Follow not found';
    return follow;
}

async function getFollowers(id) {
    const followerInfo = await db.Profile.findAll({
        raw: true,
        nest: true,
        attributes: ['name', 'previewImg', 'previewImgKey'],
        include: [{
            model: db.User,
            required: true,
            attributes: ['id', 'username'],
            include: [{
                model: db.Follow,
                where: {
                    followed: id
                },
                as: 'follower',
                attributes: [],
                required: true
            }]
        }],
    })
    console.log(followerInfo)
    return followerInfo;
}


async function getFollowing(id) {
    const followerInfo = await db.Profile.findAll({
        raw: true,
        nest: true,
        attributes: ['name', 'previewImg', 'previewImgKey'],
        include: [{
            model: db.User,
            required: true,
            attributes: ['id', 'username'],
            include: [{
                model: db.Follow,
                where: {
                    follower: id
                },
                as: 'followed',
                attributes: [],
                required: true
            }]
        }],
    })
    console.log(followerInfo)
    
return followerInfo;
}

async function getMyFollowersCount(id) {

    const count = await db.Follow.count({
        where: {
            followed: id
        },
    })

    const dict = {};
    dict["count"] = count;
    return dict;
}

async function getUserFollowersCount(id) {

    const count = await db.Follow.count({
        where: {
            followed: id
        },
    })

    const dict = {};
    dict["count"] = count;
    return dict;
}

async function getMyFollowingCount(id) {

    const count = await db.Follow.count({
        where: {
            follower: id
        },
    })

    const dict = {};
    dict["count"] = count;
    return dict;
}

async function getUserFollowingCount(id) {

    const count = await db.Follow.count({
        where: {
            follower: id
        },
    })

    const dict = {};
    dict["count"] = count;
    return dict;
}

async function getFollowingStatus(followerId, followedId) {
    
    console.log("testing getFollowed")
    const follow = await db.Follow.findOne({
        where: {
            follower: followerId,
            followed: followedId,
        }
    });
    console.log(follow)
    const followingStatus = {};

    if (!follow) {
        followingStatus["isFollowing"] = "";
    }
    else{
        followingStatus["isFollowing"] = "true";
    }
    
    let result = JSON.stringify(followingStatus);
    console.log(result)
    return followingStatus;
}