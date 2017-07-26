import axios from 'axios';
import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import {show_loading, hide_loading} from '../loader';
import {tokenExpiredError} from '../login';

export const ACTION_SUCCESS_BRANDLIST = 'ACTION_SUCCESS_BRANDLIST';
export const ACTION_SUCCESS_BRAND = 'ACTION_SUCCESS_BRAND';
export const ACTION_UNSUCCESS_BRAND = 'ACTION_UNSUCCESS_BRAND';

export function success_brandList(data) {
  return createAction(ACTION_SUCCESS_BRANDLIST)(data);
}

export function err_addBrand(data) {
  return createAction(ACTION_UNSUCCESS_BRAND)(data);
}


function getAsync_get_brand_list(page, limit) {
  return axios.get(`get/brand/${page}/${limit}`);
}
export function brandList( page, limit ) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return getAsync_get_brand_list(page, limit).then((res) => {
				dispatch(hide_loading());
				if (res.status === 200 && !res.data.error) {
					dispatch(success_brandList(res.data));
					resolve();
				}
			}, (error) => {
			
				dispatch(hide_loading());
			})
		})
	}
}

export function success_getBrand(data) {
  return createAction(ACTION_SUCCESS_BRAND)(data);
}

function getAsync_getBrandById(brandId) {
  return axios.get('get/brandById/' + brandId);
}
export function getBrandById(brandId) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
      dispatch(show_loading());
			return getAsync_getBrandById(brandId).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          dispatch(success_getBrand(res.data));
					resolve();
        }
			}, (error) => {
        dispatch(hide_loading());
				reject(error)
			})
		})
	}
}

function getAsync_addBrand(brandData) {
  return axios.post('brand', brandData);
}
export function addBrand(brandData) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
      dispatch(show_loading());
			return getAsync_addBrand(brandData).then((res) => {
        dispatch(hide_loading());
        if (res.status === 200) {
          resolve("Brand Added");
        }
			}, (error) => {
        dispatch(hide_loading());
        dispatch(err_addBrand(true));
			})
		})
	}
}

function getAsync_updateBrand(brandData, brandId) {
  return axios.put('brand/update/' + brandId, brandData);
}
export function updateBrand(brandData, brandId) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
      dispatch(show_loading());
			return getAsync_updateBrand(brandData, brandId).then((res) => {
        dispatch(hide_loading());

        if (res.status === 200) {
          resolve(res.data);
        }
			}, (error) => {
        dispatch(hide_loading());
				reject(error)
			})
		})
	}
}
