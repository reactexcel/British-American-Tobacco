import axios from 'axios';
import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import {show_loading, hide_loading} from '../loader';
import {tokenExpiredError} from '../login'

export const ACTION_SUCCESS_TMELIST = 'ACTION_SUCCESS_TMELIST';
export const ACTION_ERROR = 'ACTION_ERROR';

export const ACTION_SUCCESS_ADDTME = 'ACTION_SUCCESS_ADDTME';
export const ACTION_ERROR_ADDTME = 'ACTION_ERROR_ADDTME';
export const ACTION_SUCCESS_SEARCH = 'ACTION_SUCCESS_SEARCH';

export const ACTION_SUCCESS_UPDATE = 'ACTION_SUCCESS_UPDATE';

export const ACTION_SUCCESS_TME = 'ACTION_SUCCESS_TME';
export const ACTION_SUCCESS_TME_OUTLETLIST = 'ACTION_SUCCESS_TME_OUTLETLIST';

export function success_tmeList(data) {
  return createAction(ACTION_SUCCESS_TMELIST)(data);
}

export function error_msg(data) {
  return createAction(ACTION_ERROR)(data);
}

function getAsync_get_tme_list(page, limit) {
  return axios.get(`tme/get/${page}/${limit}`);
}


export function tmeList(page, limit) {
  return (dispatch, getState) => {
    dispatch(show_loading());
    return new Promise(function(resolve, reject) {
      return getAsync_get_tme_list(page, limit).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200 && !res.data.error) {
          dispatch(success_tmeList(res.data));
          resolve(res);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}


export function success_addtme(data) {
  return createAction(ACTION_SUCCESS_ADDTME)(data);
}

export function error_addtme(data) {
  return createAction(ACTION_ERROR_ADDTME)(data);
}

function getAsync_get_add_tme(tmeData) {
  return axios.post('tme/register',tmeData);
}


export function addtme(tmeData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      getAsync_get_add_tme(tmeData).then((res) => {
        if (res.status === 200 && res.data.error) {
          dispatch(error_msg(true));
          resolve(res.data);
        } else if(res.data.status) {
          dispatch(success_addtme(res.data));
          resolve(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
      });
    });
  }
}

export function success_updatetme(data) {
  return createAction(ACTION_SUCCESS_UPDATE)(data);
}

function async_updatetme( tmeData,tmeId) {
  return axios.put('tme/update/'+tmeId, tmeData);
}


export function updatetme( tmeData,tmeId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_updatetme( tmeData,tmeId).then((res) => {
        dispatch(hide_loading());

        if (res.status === 200) {
          resolve(res.data);
          success_updatetme(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}

export function success_getDataOnSearch(data) {
  return createAction(ACTION_SUCCESS_SEARCH)(data);
}

function async_getDataOnSearch(key,filter) {
  if(key === '' || key === undefined || key === null){
    return axios.get('tme/searchoutlet/'+filter);
  }else{
    return axios.get('tme/searchoutlet/'+filter+ '/' + key);
  }
}


export function getDataOnSearch(key,filter) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_getDataOnSearch(key,filter).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          resolve(res.data);
          dispatch(success_getDataOnSearch(res.data));
        }
      }, (error) => {
        dispatch(hide_loading());
      });
    });
  }
}


export function success_gettmeById(data) {
  return createAction(ACTION_SUCCESS_TME)(data);
}

function async_gettmeById(tmeId) {
  return axios.get('tme/getById/'+tmeId);
}


export function getTmeById(tmeId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_gettmeById(tmeId).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          dispatch(success_gettmeById(res.data));
          resolve(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}


export function success_getTmeOutletList(data) {
  return createAction(ACTION_SUCCESS_TME_OUTLETLIST)(data);
}

function async_getTmeOutletList(outletId) {
  return axios.get('tme/outlet/'+outletId);
}


export function getTmeOutletList(outletId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_getTmeOutletList(outletId).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          dispatch(success_getTmeOutletList(res.data));
          resolve(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}


function async_onUnassign(outletId) {
  return axios.put('tme/unassignoutlet/'+outletId);
}



export function onUnassign(outletId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_onUnassign(outletId).then((res) => {
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

function async_onAssign(tmeId,outletIDs) {
  return axios.put('tme/assignoutlet/'+outletIDs+'/'+tmeId);
}



export function onAssign(tmeId,outletIDs) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_onAssign(tmeId,outletIDs).then((res) => {
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
