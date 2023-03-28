const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    follow,
    unfollow,
    getFollowers,
    getMyFollowers,
    getFollowing,
    getMyFollowing,
    getFollowingStatusEUM,
    getFollowingStatusIUM,
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

async function getFollowers(id, myId) {
    const [results, metadata] = await db.sequelize.query("SELECT profile.name, profile.previewImg, profile.previewImgKey, user.username, user.id FROM Profiles profile INNER JOIN Follows follow ON follow.followed = :id INNER JOIN Users user ON user.id = profile.userId AND follow.follower = user.id ORDER BY CASE WHEN profile.userId = :myId THEN 0 ELSE 1 END", {replacements: {id, myId}});
    console.log(results)
    console.log(metadata)
    
    return results;

}

async function getMyFollowers(id) {
    const [results, metadata] = await db.sequelize.query("SELECT profile.name, profile.previewImg, profile.previewImgKey, user.username, user.id FROM Profiles profile INNER JOIN Follows follow ON follow.followed = :id INNER JOIN Users user ON user.id = profile.userId AND follow.follower = user.id", {replacements: {id}});
    console.log(results)
    console.log(metadata)
    
    return results;

}

async function getFollowing(id, myId) {
    const [results, metadata] = await db.sequelize.query("SELECT profile.name, profile.previewImg, profile.previewImgKey, user.username, user.id FROM Profiles profile INNER JOIN Follows follow ON follow.follower = :id INNER JOIN Users user ON user.id = profile.userId AND follow.followed = user.id ORDER BY CASE WHEN profile.userId = :myId THEN 0 ELSE 1 END", {replacements: {id, myId}});
    console.log(results)
    console.log(metadata)
    
    return results;
}

async function getMyFollowing(id) {   
    const [results, metadata] = await db.sequelize.query("SELECT profile.name, profile.previewImg, profile.previewImgKey, user.username, user.id FROM Profiles profile INNER JOIN Follows follow ON follow.follower = :id INNER JOIN Users user ON user.id = profile.userId AND follow.followed = user.id", {replacements: {id}});
    console.log(results)
    console.log(metadata)
    
    return results;
}


async function getFollowingStatusEUM(id, myId) {
    const [results, metadata] = await db.sequelize.query("SELECT user.follower, IF(i.followed, 'True', 'False') AS status FROM Follows user LEFT JOIN Follows i ON (i.followed = user.follower AND i.follower= :myId) WHERE user.followed= :id ORDER BY CASE WHEN user.follower = :myId THEN 0 ELSE 1 END", {replacements: {myId, id}});
    console.log(results)
    console.log(metadata)

    return results;

}

async function getFollowingStatusIUM(id, myId) {
    //TODO rewrite this to work for user's following list
    const [results, metadata] = await db.sequelize.query("SELECT user.followed, IF(i.followed, 'True', 'False') AS status FROM Follows user LEFT JOIN Follows i ON (i.followed = user.followed AND i.follower= :myId) WHERE user.follower= :id ORDER BY CASE WHEN user.followed = :myId THEN 0 ELSE 1 END", {replacements: {myId, id}});
    console.log(results)
    console.log(metadata)
    
return results;
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
        },
    });
    console.log("LOGGING THE RESULT FOR GETFOLLOWINGSTATUS QUERY")
    console.log(follow)
    const followingStatus = {};

    if (!follow) {
        followingStatus["isFollowing"] = "False";
    }
    else{
        followingStatus["isFollowing"] = "True";
    }
    
    let result = JSON.stringify(followingStatus);
    console.log(result)
    return followingStatus;
}