import { profileConstants } from '../_constants';

let profile = JSON.parse(localStorage.getItem('profile'));
let userProfile = JSON.parse(localStorage.getItem('userProfile'));
const initialState = profile ? { profileLoaded: true, profile } : {};
const initialStateUser = userProfile ? { userProfileLoaded: true, userProfile} : {};

export function getProfile(state = initialState, action) {
  switch (action.type) {
    case profileConstants.PROFILE_REQUEST:
      return {
        loadingProfile: true,
        profile: action.profile
      };
    case profileConstants.PROFILE_SUCCESS:
      return {
        profileLoaded: true,
        profile: action.profile
      };
    case profileConstants.PROFILE_FAILURE:
      return {};
      
    default:
      return state
  }
}

export function getUserProfile(state = initialStateUser, action) {
  switch (action.type) {
    case profileConstants.USER_PROFILE_REQUEST:
      return {
        loadingUserProfile: true,
        userProfile: action.userProfile
      };
    case profileConstants.USER_PROFILE_SUCCESS:
      return {
        userProfileLoaded: true,
        userProfile: action.userProfile

      };
    case profileConstants.USER_PROFILE_FAILURE:
      return {};
      
    default:
      return state
  }
}