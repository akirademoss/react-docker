const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    getFollowersCount,
    getFollowingCount,
    getFollowingStatus
};

async function follow(followerId, followedId) {

    
    const params = {};
    params["follower"] = followerId;
    params["followed"] = followedId;
    console.log(params)
    
    const follow = await db.Follow.create(params);
}

async function unfollow(followerId, followedId) {
    const params = {};
    params["follower"] = followerId;
    params["followed"] = followedId;
    const follow = await getFollowed(followerId, followedId)
    await follow.destroy();
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

async function getFollowersCount(id) {

    const count = await db.Follow.count({
        where: {
            followed: id
        },
    })

    console.log(count);
    return count;
}

async function getFollowingCount(id) {

    const count = await db.Follow.count({
        where: {
            follower: id
        },
    })

    console.log(count);
    return count;
}

async function getFollowingStatus(followerId, followedId) {
    
    console.log("testing getFollowed")
    const follow = await db.Follow.findOne({
        where: {
            follower: followerId,
            followed: followedId,
        }
    });

    const followingStatus = {};

    if (!follow) {
        followingStatus["isFollowing"] = "F";
    }
    else{
        followingStatus["isFollowing"] = "T";
    }

    return followingStatus;
}

