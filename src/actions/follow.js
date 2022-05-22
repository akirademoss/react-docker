import { followConstants } from '../_constants/follow.constants';
import { alertActions } from './alert.actions';
import FollowService from "../services/follow.service";

import { history } from '../_helpers';

export const followActions = {
  followUser,
  unfollow,
  getFollowerCount,
  getUserFollowerCount,
  getFollowingCount,
  getUserFollowingCount,
  getFollowerInfo,
  getUserFollowerInfo,
  getFollowingInfo,
  getUserFollowingInfo,
  getFollowingStatus,
};



function followUser(id, token, followedId, username){
  return dispatch =>{
    dispatch(request(username));
    console.log("dispatching follow request")
    FollowService.follow(id, token, followedId)
    .then(
    
      follow => {
        dispatch(success(follow));
        history.push('/' + username + '/user');
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(follow) { return { type: followConstants.FOLLOW_REQUEST, follow } }
  function success(follow) { return { type: followConstants.FOLLOW_SUCCESS, follow } }
  function failure(error) { return { type: followConstants.FOLLOW_FAILURE, error } }
}

function unfollow(id, token, followedId, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.unfollow(id, token, followedId)
      .then(
      
        unfollow => {
          dispatch(success(unfollow));
          history.push('/' + username + '/user');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(unfollow) { return { type: followConstants.UNFOLLOW_REQUEST, unfollow } }
    function success(unfollow) { return { type: followConstants.UNFOLLOW_SUCCESS, unfollow } }
    function failure(error) { return { type: followConstants.UNFOLLOW_FAILURE, error } }
  }

  function getFollowerCount(id, token, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getFollowerCount(id, token)
      .then(
      
        followerCount => {
          dispatch(success(followerCount));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(followerCount) { return { type: followConstants.FOLLOWER_COUNT_REQUEST, followerCount } }
    function success(followerCount) { return { type: followConstants.FOLLOWER_COUNT_SUCCESS, followerCount } }
    function failure(error) { return { type: followConstants.FOLLOWER_COUNT_FAILURE, error } }
  }

  function getUserFollowerCount(id, token, followedId, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getUserFollowerCount(id, token, followedId)
      .then(
      
        userFollowerCount => {
          dispatch(success(userFollowerCount));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(userFollowerCount) { return { type: followConstants.USER_FOLLOWER_COUNT_REQUEST, userFollowerCount } }
    function success(userFollowerCount) { return { type: followConstants.USER_FOLLOWER_COUNT_SUCCESS, userFollowerCount } }
    function failure(error) { return { type: followConstants.USER_FOLLOWER_COUNT_FAILURE, error } }
  }

  function getFollowingCount(id, token, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getFollowingCount(id, token)
      .then(
      
        followingCount => {
          dispatch(success(followingCount));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(followingCount) { return { type: followConstants.FOLLOWING_COUNT_REQUEST, followingCount } }
    function success(followingCount) { return { type: followConstants.FOLLOWING_COUNT_SUCCESS, followingCount } }
    function failure(error) { return { type: followConstants.FOLLOWING_COUNT_FAILURE, error } }
  }

  function getUserFollowingCount(id, token, followedId, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getUserFollowingCount(id, token, followedId)
      .then(
      
        userFollowingCount => {
          dispatch(success(userFollowingCount));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(userFollowingCount) { return { type: followConstants.USER_FOLLOWING_COUNT_REQUEST, userFollowingCount } }
    function success(userFollowingCount) { return { type: followConstants.USER_FOLLOWING_COUNT_SUCCESS, userFollowingCount } }
    function failure(error) { return { type: followConstants.USER_FOLLOWING_COUNT_FAILURE, error } }
  }

  function getFollowerInfo(id, token, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getFollowerInfo(id, token)
      .then(
      
        followerInfo => {
          dispatch(success(followerInfo));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(followerInfo) { return { type: followConstants.FOLLOWER_INFO_REQUEST, followerInfo } }
    function success(followerInfo) { return { type: followConstants.FOLLOWER_INFO_SUCCESS, followerInfo } }
    function failure(error) { return { type: followConstants.FOLLOWER_INFO_FAILURE, error } }
  }

  function getUserFollowerInfo(id, token, followedId, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getUserFollowerInfo(id, token, followedId)
      .then(
      
        userFollowerInfo => {
          dispatch(success(userFollowerInfo));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(userFollowerInfo) { return { type: followConstants.USER_FOLLOWER_INFO_REQUEST, userFollowerInfo } }
    function success(userFollowerInfo) { return { type: followConstants.USER_FOLLOWER_INFO_SUCCESS, userFollowerInfo } }
    function failure(error) { return { type: followConstants.USER_FOLLOWER_INFO_FAILURE, error } }
  }

  function getFollowingInfo(id, token, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getFollowingInfo(id, token)
      .then(
      
        followingInfo => {
          dispatch(success(followingInfo));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(followingInfo) { return { type: followConstants.FOLLOWING_INFO_REQUEST, followingInfo } }
    function success(followingInfo) { return { type: followConstants.FOLLOWING_INFO_SUCCESS, followingInfo } }
    function failure(error) { return { type: followConstants.FOLLOWING_INFO_FAILURE, error } }
  }

  function getUserFollowingInfo(id, token, followedId, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getUserFollowingInfo(id, token, followedId)
      .then(
      
        userFollowingInfo => {
          dispatch(success(userFollowingInfo));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(userFollowingInfo) { return { type: followConstants.USER_FOLLOWING_INFO_REQUEST, userFollowingInfo } }
    function success(userFollowingInfo) { return { type: followConstants.USER_FOLLOWING_INFO_SUCCESS, userFollowingInfo } }
    function failure(error) { return { type: followConstants.USER_FOLLOWING_INFO_FAILURE, error } }
  }

  function getFollowingStatus(id, token, followedId, username){
    return dispatch =>{
      dispatch(request(username));
  
      FollowService.getFollowingStatus(id, token, followedId)
      .then(
      
        follow => {
          dispatch(success(follow));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request(follow) { return { type: followConstants.FOLLOW_STATUS_REQUEST, follow } }
    function success(follow) { return { type: followConstants.FOLLOW_STATUS_SUCCESS, follow } }
    function failure(error) { return { type: followConstants.FOLLOW_STATUS_FAILURE, error } }
  }