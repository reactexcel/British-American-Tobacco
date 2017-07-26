import Immutable from 'immutable';
import {
	ACTION_GET_REBATE_REQUEST_LIST_SUCCESS,
	ACTION_GET_REBATE_REQUEST_LIST_ERROR,
	ACTION_APPLY_REBATE_REQUEST_SUCCESS,
	ACTION_APPLY_REBATE_REQUEST_ERROR,
	ACTION_CANCEL_REBATE_REQUEST_SUCCESS,
	ACTION_CANCEL_REBATE_REQUEST_ERROR,
 } from '../actions/rebateRequest/rebateRequest.action';
const initialState = {
	data         : [],
	successApply : false,
	msg          : '',
	err          : '',
};
export function rebateRequests (state = Immutable.fromJS(initialState), action) {
	switch (action.type) {
	case ACTION_GET_REBATE_REQUEST_LIST_SUCCESS: {
			return state.set('data', action.payload).set('err', false);
		}
	case ACTION_APPLY_REBATE_REQUEST_SUCCESS: {
			return state.set('successApply', action.payload).set('err', false);
		}
	case ACTION_CANCEL_REBATE_REQUEST_SUCCESS: {
			return state.set('successCancel', action.payload).set('err', false);
		}
	}
	return state;
}
