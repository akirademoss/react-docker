import { followConstants } from '../_constants';

let follow = JSON.parse(localStorage.getItem('follow'));
const initialState = follow ? { loadingFollowStatus: true, follow } : {};


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
