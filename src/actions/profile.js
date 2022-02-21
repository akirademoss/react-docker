import { profileConstants } from '../_constants/profile.constants';
import { alertActions } from './alert.actions';
import ProfileService from "../services/profile.service";

import { history } from '../_helpers';

export const profileActions = {
  update,
  getInfo
};



function update(name, bio, link, username, id, token){
  return dispatch =>{
    dispatch(request(username));

    ProfileService.updateProfile(name, bio, link, id, token)
    .then(
    
      profile => {
        dispatch(success(profile));
        history.push('/' + username + '/profile');
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(profile) { return { type: profileConstants.UPDATE_REQUEST, profile } }
  function success(profile) { return { type: profileConstants.UPDATE_SUCCESS, profile } }
  function failure(error) { return { type: profileConstants.UPDATE_FAILURE, error } }
}

function getInfo(username, id, token, page){
  return dispatch =>{
    dispatch(request(username));

    ProfileService.getInfo(id, token)
    .then(
    
      profile => {
        dispatch(success(profile));
        console.log(profile)
        history.push('/' + username + page);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(profile) { return { type: profileConstants.PROFILE_REQUEST, profile } }
  function success(profile) { return { type: profileConstants.PROFILE_SUCCESS, profile } }
  function failure(error) { return { type: profileConstants.PROFILE_FAILURE, error } }
}
