import axios from 'axios';
import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import {show_loading, hide_loading} from '../loader';
import {tokenExpiredError} from '../login';

export const ACTION_GET_REBATE_REQUEST_LIST_SUCCESS = 'ACTION_GET_REBATE_REQUEST_LIST_SUCCESS';
export const ACTION_GET_REBATE_REQUEST_LIST_ERROR = 'ACTION_GET_REBATE_REQUEST_LIST_ERROR';
export const getRebateRequestsList = (data) => {
	return (dispatch, getState) => {
		dispatch(show_loading());
		return axios.get(`get/rebateRequest/${data.page}/${data.limit}`)
			.then((res)=>{
				dispatch(hide_loading());
				dispatch(createAction(ACTION_GET_REBATE_REQUEST_LIST_SUCCESS)(res.data))
			})
			.catch((error) => {
				dispatch(hide_loading());
				dispatch(createAction(ACTION_GET_REBATE_REQUEST_LIST_ERROR)(error))
			})
	}
}

export const ACTION_APPLY_REBATE_REQUEST_SUCCESS = 'ACTION_APPLY_REBATE_REQUEST_SUCCESS';
export const ACTION_APPLY_REBATE_REQUEST_ERROR = 'ACTION_APPLY_REBATE_REQUEST_ERROR';
export const applyRebateRequest = (id) => {
	return (dispatch, getState) => {
		dispatch(show_loading());
		return axios.put(`rebateRequest/apply/${id}`)
			.then((res)=>{
				dispatch(hide_loading());
				dispatch(createAction(ACTION_APPLY_REBATE_REQUEST_SUCCESS)(res.data))
			})
			.catch((error) => {
				dispatch(hide_loading());
				dispatch(createAction(ACTION_APPLY_REBATE_REQUEST_ERROR)(error))
			})
	}
}

export const ACTION_CANCEL_REBATE_REQUEST_SUCCESS = 'ACTION_CANCEL_REBATE_REQUEST_SUCCESS';
export const ACTION_CANCEL_REBATE_REQUEST_ERROR = 'ACTION_CANCEL_REBATE_REQUEST_ERROR';
export const cancelRebateRequest = (id) => {
	return (dispatch, getState) => {
		dispatch(show_loading());
		return axios.put(`rebateRequest/cancel/${id}`)
			.then((res)=>{
				dispatch(hide_loading());
				dispatch(createAction(ACTION_CANCEL_REBATE_REQUEST_SUCCESS)(res.data))
			})
			.catch((error) => {
				dispatch(hide_loading());
				dispatch(createAction(ACTION_CANCEL_REBATE_REQUEST_ERROR)(error))
			})
	}
}


// export const ACTION_SUCCESS_BRANDLIST = 'ACTION_SUCCESS_BRANDLIST';
// export const ACTION_SUCCESS_BRAND = 'ACTION_SUCCESS_BRAND';
// export const ACTION_UNSUCCESS_BRAND = 'ACTION_UNSUCCESS_BRAND';

// export function success_brandList(data) {
//   return createAction(ACTION_SUCCESS_BRANDLIST)(data);
// }

// export function err_addBrand(data) {
//   return createAction(ACTION_UNSUCCESS_BRAND)(data);
// }


// function getAsync_get_brand_list(page, limit) {
//   return axios.get(`get/brand/${page}/${limit}`);
// }
// export function brandList( page, limit ) {
// 	return (dispatch, getState) => {
// 		return new Promise(function(resolve, reject) {
// 			dispatch(show_loading());
// 			return getAsync_get_brand_list(page, limit).then((res) => {
// 				dispatch(hide_loading());
// 				if (res.status === 200) {
// 					dispatch(success_brandList(res.data));
// 					resolve();
// 				} else {
// 					dispatch(tokenExpiredError());
// 				}
// 			}, (error) => {
// 				console.log(error);
// 				dispatch(hide_loading());
// 			})
// 		})
// 	}
// }