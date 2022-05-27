import { followConstants } from '../_constants';

let follow = JSON.parse(localStorage.getItem('follow'));
let myFollowerCount = JSON.parse(localStorage.getItem('myFollowerCount'));
let myFollowingCount = JSON.parse(localStorage.getItem('myFollowingCount'));
let userFollowerCount = JSON.parse(localStorage.getItem('userFollowerCount'));
let userFollowingCount = JSON.parse(localStorage.getItem('userFollowingCount'));
const initialState = follow ? { followStatusLoaded: false, follow } : {};
const initialState2 = myFollowerCount ? { myFollowerCountLoaded: false, myFollowerCount } : {};
const initialState3 = myFollowingCount ? { myFollowingCountLoaded: false, myFollowingCount } : {};
const initialState4 = userFollowerCount ? { userFollowerCountLoaded: false, userFollowerCount  } : {};
const initialState5 = userFollowingCount ? { userFollowingCountLoaded: false, userFollowingCount } : {};

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