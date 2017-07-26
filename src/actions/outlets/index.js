import axios from "axios";
import * as _ from 'lodash';
import { CONFIG } from '../../config/index';
import { createAction } from 'redux-actions';
import {show_loading, hide_loading} from '../loader';
import {tokenExpiredError} from '../login';

export const ACTION_SUCCESS_GET_OUTLET_LIST = "ACTION_SUCCESS_GET_OUTLET_LIST";
export const ACTION_SUCCESS_GET_OUTLET = "ACTION_SUCCESS_GET_OUTLET";
export const ACTION_ERROR_OUTLET = "ACTION_ERROR_OUTLET";

export function success_outletList( data ){
	return createAction( ACTION_SUCCESS_GET_OUTLET_LIST )( data )
}
export function error_addOutlet( data ){
	return createAction( ACTION_ERROR_OUTLET )( data )
}

function getAsync_get_outlet_list( page, limit, accessToken ) {
  return axios.get('outlet/get/'+ 1 + "/"+ 13);
 }
export function outletList( page, limit ) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return getAsync_get_outlet_list(page, limit).then((res) => {
				dispatch(hide_loading());
				if (res.status === 200 && !res.data.error) {
					dispatch(success_outletList(res.data));
					resolve(res);
        }
			}, (error) => {
				dispatch(hide_loading());
				reject(error);
			})
		})
	}
}

export function success_getOutlet( data ){
	return createAction( ACTION_SUCCESS_GET_OUTLET )( data )
}

function getAsync_onGetOutletById(outletId) {
  return axios.get('get/outletById/'+outletId);
 }

export function onGetOutletById(outletId) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return getAsync_onGetOutletById(outletId).then((res) => {
				dispatch(hide_loading());
				if (res.status === 200) {
					dispatch(success_getOutlet(res.data));
					resolve();
        }
			}, (error) => {
				dispatch(hide_loading());
				reject(error)
			})
		})
	}
}

function getAsync_addOutlet(outletData) {
  return axios.post('outlet/create', outletData);
 }

export function addOutlet(outletData) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return getAsync_addOutlet(outletData).then((res) => {
				if (res.status === 200 && res.data.error){
					dispatch(hide_loading());
					resolve(res.data)
					dispatch(error_addOutlet(true));
				}
				resolve("added successfully")
			}, (error) =>  {
				dispatch(hide_loading());
				reject(error)
			})
		})
	}
}

function getAsync_updateOutlet(outletData, outletId) {
  return axios.put('outlet/update/'+outletId ,outletData);
 }

export function updateOutlet(outletData, outletId) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return getAsync_updateOutlet(outletData, outletId).then((res) => {
				dispatch(hide_loading());
				if (res.status === 200) {
					resolve(res.data)
        }
			}, (error) => {
				dispatch(hide_loading());
				reject(error)
			})
		})
	}
}

function async_onChangePassword(id,username,newPass) {
  return axios.put('password/change/'+username+'/'+id,{
    password : newPass
  });
}



export function onChangePassword(id,username,newPass) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_onChangePassword(id,username,newPass).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          resolve(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}

function async_onMembershipList() {
  return axios.get('membership/get');
}



export function onMembershipList() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_onMembershipList().then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          resolve(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}
