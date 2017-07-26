import axios from 'axios';
import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import {show_loading, hide_loading} from '../loader';
import {tokenExpiredError} from '../login'

export const ACTION_SUCCESS_SKULIST = 'ACTION_SUCCESS_SKULIST';
export const ACTION_ERROR = 'ACTION_ERROR';

export const ACTION_SUCCESS_ADDSKU = 'ACTION_SUCCESS_ADDSKU';
export const ACTION_ERROR_ADDSKU = 'ACTION_ERROR_ADDSKU';

export const ACTION_SUCCESS_UPDATE = 'ACTION_SUCCESS_UPDATE';

export const ACTION_SUCCESS_SKU = 'ACTION_SUCCESS_SKU';

export function success_skuList(data) {
  return createAction(ACTION_SUCCESS_SKULIST)(data);
}

export function error_msg(data) {
  return createAction(ACTION_ERROR)(data);
}

function getAsync_get_sku_list(page, limit) {
  return axios.get(`get/sku/${page}/${limit}`);
}


export function skuList(page, limit) {
  return (dispatch, getState) => {
    dispatch(show_loading());
    return new Promise(function(resolve, reject) {
      return getAsync_get_sku_list(page, limit).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200 && !res.data.error) {
          dispatch(success_skuList(res.data));
          resolve();
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}


export function success_addSku(data) {
  return createAction(ACTION_SUCCESS_ADDSKU)(data);
}

export function error_addSku(data) {
  return createAction(ACTION_ERROR_ADDSKU)(data);
}

function getAsync_get_add_sku(skuData) {
  return axios.post('sku', skuData);
}


export function addSku(skuData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      getAsync_get_add_sku(skuData).then((res) => {
        if (res.status === 200 && res.data.error) {
          dispatch(hide_loading());
          resolve(res.data);
          dispatch(error_msg(true));
        }else{
          dispatch(success_addSku(res.data));
        }
      }, (error) => {

        dispatch(hide_loading());
      });
    });
  }
}

export function success_updateSku(data) {
  return createAction(ACTION_SUCCESS_UPDATE)(data);
}

function async_updateSku(skuData, skuId) {
  return axios.put('sku/update/' + skuId, skuData);
}


export function updateSku(skuData, skuId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_updateSku(skuData, skuId).then((res) => {
        dispatch(hide_loading());

        if (res.status === 200) {
          resolve(res.data);
          success_updateSku(res.data);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }
}

export function success_getSkuById(data) {
  return createAction(ACTION_SUCCESS_SKU)(data);
}

function async_getSkuById(skuId) {
  return axios.get('get/skuById/' + skuId);
}


export function getSkuById(skuId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_getSkuById(skuId).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          dispatch(success_getSkuById(res.data));
          resolve(res.data);
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
