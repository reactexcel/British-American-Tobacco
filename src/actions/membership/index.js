import axios from 'axios';
import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import {show_loading, hide_loading} from '../loader';
import {tokenExpiredError} from '../login'

export const ACTION_SUCCESS_MEMBERLIST = 'ACTION_SUCCESS_MEMBERLIST';
export const ACTION_ERROR = 'ACTION_ERROR';

export const ACTION_SUCCESS_ADDMEMBER = 'ACTION_SUCCESS_ADDMEMBER';
export const ACTION_ERROR_ADDMEMBER = 'ACTION_ERROR_ADDMEMBER';

export const ACTION_SUCCESS_UPDATEMEMBER = 'ACTION_SUCCESS_UPDATEMEMBER';
export const ACTION_SUCCESS_GET_MEMBERLIST = 'ACTION_SUCCESS_GET_MEMBERLIST';
export const ACTION_ERROR_UPDATEMEMBER = 'ACTION_ERROR_UPDATEMEMBER';

export function success_memberList(data) {
  return createAction(ACTION_SUCCESS_MEMBERLIST)(data);
}

function getAsync_get_member_list() {
  return axios.get('membership/get');
}

export function memberList() {
  return (dispatch, getState) => {
    dispatch(show_loading());
    return new Promise(function(resolve, reject) {
      return getAsync_get_member_list().then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          dispatch(success_memberList(res.data));
          resolve(res);
        } else {

          dispatch(tokenExpiredError());
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}

export function success_addMember(data) {
  return createAction(ACTION_SUCCESS_ADDMEMBER)(data);
}

export function error_addMember(data) {
  return createAction(ACTION_ERROR_ADDMEMBER)(data);
}

function getAsync_get_add_member(memberData) {
  return axios.post('membership/create', memberData);
}


export function addMember(memberData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      getAsync_get_add_member(memberData).then((res) => {
        if (res.status === 200 && res.data.error) {
          dispatch(hide_loading());
          resolve(res);
        }else{
          dispatch(success_addMember(res.data));
          resolve(res);
        }
      }, (error) => {

        dispatch(hide_loading());
      });
    });
  }
}


export function success_getMember( data ){
	return createAction( ACTION_SUCCESS_GET_MEMBERLIST )( data )
}

function getAsync_getMemberById(id) {
  return axios.get('membership/getById/' + id);
 }

export function getMemberById(id) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return getAsync_getMemberById(id).then((res) => {
				dispatch(hide_loading());
				if (res.status === 200) {
					dispatch(success_getMember(res.data));
					resolve(res.data);
        }
			}, (error) => {
				dispatch(hide_loading());
				reject(error)
			})
		})
	}
}

function async_updateMember(id, memberData) {
  return axios.put('membership/update/' + id, memberData);
}

export function updateMember(id, memberData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_updateMember(id, memberData).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          resolve(res);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}
