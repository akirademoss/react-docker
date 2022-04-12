import { profileConstants } from '../_constants';

let profile = JSON.parse(localStorage.getItem('profile'));
const initialState = profile ? { profileLoaded: true, profile } : {};

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