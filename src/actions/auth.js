import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import { userConstants } from '../_constants/user.constants';
import { alertActions } from './alert.actions';
import AuthService from "../services/auth.service";

import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  register
};



function register(email, username, password){
  return dispatch =>{
  dispatch({
    type: REGISTER_REQUEST,
  });
  AuthService.register(email, username, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
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
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
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

function logout() {
  return dispatch =>{
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
  history.push('/');
  }; 
 }
 