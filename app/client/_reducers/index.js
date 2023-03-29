import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';

import { alert } from './alert.reducer';
import { getUserDetails, getSearchResults } from './user.reducer';
import { getProfile, getUserProfile} from './profile.reducer';
import {getFollowStatus, getMyFollowerCount, getMyFollowingCount, getUserFollowerCount, getUserFollowingCount, getFollowingInfo, getFollowerInfo, getUserFollowingInfo, getUserFollowerInfo, getFollowingStatusEUM, getFollowingStatusIUM} from './follow.reducer';

const rootReducer = combineReducers({
  getUserDetails,
  getSearchResults,
  authentication,
  registration,
  alert,
  getProfile,
  getUserProfile,
  getFollowStatus,
  getMyFollowerCount,
  getMyFollowingCount, 
  getUserFollowerCount, 
  getUserFollowingCount,
  getFollowingInfo, 
  getFollowerInfo, 
  getUserFollowingInfo, 
  getUserFollowerInfo,
  getFollowingStatusEUM,
  getFollowingStatusIUM,
});

export default rootReducer;
