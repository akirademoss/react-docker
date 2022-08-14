import { userConstants } from '../_constants/user.constants';
import { alertActions } from './alert';
import AuthService from "../_services/auth.service";
import UserService from "../_services/user.service";

import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  register,
  getUserDetails,
  userSearch,
};



function register(email, username, password){
  return dispatch =>{
  dispatch({
    type: userConstants.REGISTER_REQUEST,
  });
  AuthService.register(email, username, password).then(
    (response) => {
      dispatch({
        type: userConstants.REGISTER_SUCCESS,
      });

      dispatch({
        type: userConstants.SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: userConstants.REGISTER_FAILURE,
      });

      dispatch({
        type: userConstants.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
  };


}

function login(username, password){
  return dispatch =>{
    dispatch(request(username));

    AuthService.authenticate(username, password)
    .then(
    
      user => {
        dispatch(success(user));
        history.push('/' + username + '/profile');
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getUserDetails(username){
  return dispatch =>{
    dispatch(request(username));

    UserService.getUserDetails(username)
    .then(
    
      userDetails => {
        dispatch(success(userDetails));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(userDetails) { return { type: userConstants.USER_DETAILS_REQUEST, userDetails } }
  function success(userDetails) { return { type: userConstants.USER_DETAILS_SUCCESS, userDetails } }
  function failure(error) { return { type: userConstants.USER_DETAILS_FAILURE, error } }
}

function userSearch(name){
  return dispatch =>{
    dispatch(request(name));

    UserService.userSearch(name)
    .then(
    
      searchResults => {
        dispatch(success(searchResults));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(searchResults) { return { type: userConstants.USER_SEARCH_REQUEST} }
  function success(searchResults) { return { type: userConstants.USER_SEARCH_SUCCESS, searchResults } }
  function failure(error) { return { type: userConstants.USER_SEARCH_FAILURE, error } }
}



function logout() {
  return dispatch =>{
  AuthService.logout();

  dispatch({
    type: userConstants.LOGOUT,
  });
  history.push('/');
  }; 
 }
 