import { userConstants } from '../_constants';

let userDetails = JSON.parse(localStorage.getItem('userDetails'));
let searchResults = JSON.parse(localStorage.getItem('searchResults'));

const initialState = userDetails ? { userDetailsLoaded: true, userDetails } : {};
const initialState2 = searchResults ? { searchResultsLoaded: true, searchResults } : {};

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

export function getSearchResults(state = initialState2, action) {
  switch (action.type) {
    case userConstants.USER_SEARCH_REQUEST:
      return {
        loadingSearchResults: true,
        searchResults: action.searchResults
      };
    case userConstants.USER_SEARCH_SUCCESS:
      return {
        searchResultsLoaded: true,
        searchResults: action.searchResults
      };
    case userConstants.USER_SEARCH_FAILURE:
      return {};
      
    default:
      return state
  }
}