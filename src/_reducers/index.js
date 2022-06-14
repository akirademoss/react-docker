import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';

import { alert } from './alert.reducer';
import { getProfile, getUserProfile} from './profile.reducer';
import {getFollowStatus, getMyFollowerCount, getMyFollowingCount, getUserFollowerCount, getUserFollowingCount, getFollowingInfo, getFollowerInfo, getUserFollowingInfo, getUserFollowerInfo} from './follow.reducer';

const rootReducer = combineReducers({
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
});

export default rootReducer;
