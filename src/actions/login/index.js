import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import axios from "axios";
import { show_loading, hide_loading } from '../loader';

export const USERS_LOGIN_SUCCESS = "USERS_LOGIN_SUCCESS";
export const JWT_TOKEN_EXPIRED = "JWT_TOKEN_EXPIRED";

export function tokenExpiredError() {
	return createAction(JWT_TOKEN_EXPIRED)();
}

export function success_login(data) {
	return createAction(USERS_LOGIN_SUCCESS)(data);
}

function async_login(username, password) {
	return axios.post('admin/login', {
		email: username,
		password: password
	});
}

export function login(username, password) {
	return (dispatch, getState) => {
		return new Promise(function(resolve, reject) {
			dispatch(show_loading());
			return async_login(username, password).then((res) => {
				dispatch(hide_loading());
				if (res.status === 200) {
					if (res.data && res.data.status) {
						localStorage.setItem("bat-access-token", res.data.token);
						dispatch(success_login(res));
						resolve(res.data.status)
					} else {
						reject('Wrong Credentials');
					}
				}
			}, (error) => {
				dispatch(hide_loading());
				reject(error);
			});
		});
	}
}