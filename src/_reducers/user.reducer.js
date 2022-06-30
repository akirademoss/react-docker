import { userConstants } from '../_constants';

let userDetails = JSON.parse(localStorage.getItem('userDetails'));

const initialState = userDetails ? { userDetailsLoaded: true, userDetails } : {};


export function getUserDetails(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_DETAILS_REQUEST:
      return {
        loadingUserDetails: true,
        userDetails: action.userDetails
      };
    case userConstants.USER_DETAILS_SUCCESS:
      return {
        userDetailsLoaded: true,
        userDetails: action.userDetails
      };
    case userConstants.USER_DETAILS_FAILURE:
      return {};
      
    default:
      return state
  }
}
