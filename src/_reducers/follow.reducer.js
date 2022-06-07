import { followConstants } from '../_constants';

let follow = JSON.parse(localStorage.getItem('follow'));
let myFollowerCount = JSON.parse(localStorage.getItem('myFollowerCount'));
let myFollowingCount = JSON.parse(localStorage.getItem('myFollowingCount'));
let userFollowerCount = JSON.parse(localStorage.getItem('userFollowerCount'));
let userFollowingCount = JSON.parse(localStorage.getItem('userFollowingCount'));

let followerInfo = JSON.parse(localStorage.getItem('followerInfo'));
let followingInfo = JSON.parse(localStorage.getItem('followingInfo'));
let userFollowerInfo = JSON.parse(localStorage.getItem('userFollowerInfo'));
let userFollowingInfo = JSON.parse(localStorage.getItem('userFollowingInfo'));

const initialState = follow ? { followStatusLoaded: false, follow } : {};
const initialState2 = myFollowerCount ? { myFollowerCountLoaded: false, myFollowerCount } : {};
const initialState3 = myFollowingCount ? { myFollowingCountLoaded: false, myFollowingCount } : {};
const initialState4 = userFollowerCount ? { userFollowerCountLoaded: false, userFollowerCount  } : {};
const initialState5 = userFollowingCount ? { userFollowingCountLoaded: false, userFollowingCount } : {};

const initialState6 = followerInfo ? { followerInfoLoaded: false, followerInfo } : {};
const initialState7 = followingInfo ? { followingInfoLoaded: false, followingInfo } : {};
const initialState8 = userFollowerInfo? { userFollowerInfoLoaded: false, userFollowerInfo  } : {};
const initialState9 = userFollowingInfo ? { userFollowingInfoLoaded: false, userFollowingInfo } : {};


export function getFollowStatus(state = initialState, action) {
  switch (action.type) {
    case followConstants.FOLLOW_STATUS_REQUEST:
      return {
        loadingFollowStatus: true,
        follow: action.follow
      };
    case followConstants.FOLLOW_STATUS_SUCCESS:
      return {
        followStatusLoaded: true,
        follow: action.follow
      };
    case followConstants.FOLLOW_STATUS_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getMyFollowerCount(state = initialState2, action) {
  switch (action.type) {
    case followConstants.FOLLOWER_COUNT_REQUEST:
      return {
        loadingMyFollowerCount: true,
        myFollowerCount: action.myFollowerCount
      };
    case followConstants.FOLLOWER_COUNT_SUCCESS:
      return {
        myfollowerCountLoaded: true,
        myFollowerCount: action.myFollowerCount
      };
    case followConstants.FOLLOWER_COUNT_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getMyFollowingCount(state = initialState3, action) {
  switch (action.type) {
    case followConstants.FOLLOWING_COUNT_REQUEST:
      return {
        loadingMyFollowingCount: true,
        myFollowingCount: action.myFollowingCount
      };
    case followConstants.FOLLOWING_COUNT_SUCCESS:
      return {
        myfollowingCountLoaded: true,
        myFollowingCount: action.myFollowingCount
      };
    case followConstants.FOLLOWING_COUNT_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getUserFollowerCount(state = initialState4, action) {
  switch (action.type) {
    case followConstants.USER_FOLLOWER_COUNT_REQUEST:
      return {
        loadingUserFollowerCount: true,
        userFollowerCount: action.userFollowerCount
      };
    case followConstants.USER_FOLLOWER_COUNT_SUCCESS:
      return {
        userFollowerCountLoaded: true,
        userFollowerCount: action.userFollowerCount
      };
    case followConstants.USER_FOLLOWER_COUNT_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getUserFollowingCount(state = initialState5, action) {
  switch (action.type) {
    case followConstants.USER_FOLLOWING_COUNT_REQUEST:
      return {
        loadingUserFollowingCount: true,
        userFollowingCount: action.userFollowingCount
      };
    case followConstants.USER_FOLLOWING_COUNT_SUCCESS:
      return {
        userFollowingCountLoaded: true,
        userFollowingCount: action.userFollowingCount
      };
    case followConstants.USER_FOLLOWING_COUNT_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getFollowingInfo(state = initialState6, action) {
  switch (action.type) {
    case followConstants.FOLLOWING_INFO_REQUEST:
      return {
        loadingFollowingInfo: true,
        followingInfo: action.followingInfo
      };
    case followConstants.FOLLOWING_INFO_SUCCESS:
      return {
        followingInfoLoaded: true,
        followingInfo: action.followingInfo
      };
    case followConstants.FOLLOWING_INFO_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getFollowerInfo(state = initialState7, action) {
  switch (action.type) {
    case followConstants.FOLLOWER_INFO_REQUEST:
      return {
        loadingFollowerInfo: true,
        followerInfo: action.followerInfo
      };
    case followConstants.FOLLOWER_INFO_SUCCESS:
      return {
        followerInfoLoaded: true,
        followerInfo: action.followerInfo
      };
    case followConstants.FOLLOWER_INFO_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getUserFollowingInfo(state = initialState8, action) {
  switch (action.type) {
    case followConstants.USER_FOLLOWING_INFO_REQUEST:
      return {
        loadingUserFollowingInfo: true,
        userFollowingInfo: action.userFollowingInfo
      };
    case followConstants.USER_FOLLOWING_INFO_SUCCESS:
      return {
        userFollowingInfoLoaded: true,
        userFollowingInfo: action.userFollowingInfo
      };
    case followConstants.USER_FOLLOWING_INFO_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getUserFollowerInfo(state = initialState9, action) {
  switch (action.type) {
    case followConstants.USER_FOLLOWER_INFO_REQUEST:
      return {
        loadingUserFollowerInfo: true,
        userFollowerInfo: action.userFollowerInfo
      };
    case followConstants.USER_FOLLOWER_INFO_SUCCESS:
      return {
        userFollowerInfoLoaded: true,
        userFollowerInfo: action.userFollowerInfo
      };
    case followConstants.USER_FOLLOWER_INFO_FAILURE:
      return {};
      
    default:
      return state
  }
}