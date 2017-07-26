import Immutable from 'immutable';
import { ACTION_SUCCESS_TMELIST,ACTION_SUCCESS_SEARCH,ACTION_SUCCESS_TME_OUTLETLIST, ACTION_SUCCESS_ADDTME, ACTION_ERROR, ACTION_ERROR_ADDTME, ACTION_SUCCESS_UPDATE, ACTION_SUCCESS_TME } from '../actions/tme';
const initialState = {
  tmeList: [],
  brandName: [],
  tmeData: [],
  tme: {},
  msg: '',
  err: '',
  searchData : [],
  tmeOutletList:[]
};

export function tmeList(state = Immutable.fromJS(initialState), action) {
  if (action.type == ACTION_SUCCESS_TMELIST) {
    return state.set('tmeList', action.payload).set('err', false).set('tmeData', []);
  } else if (action.type == ACTION_SUCCESS_ADDTME) {
    return state.set('tmeData', action.payload).set('err', false);
  } else if (action.type == ACTION_ERROR_ADDTME) {
    return state.set('tmeData', action.payload).set('err', false);
  } else if (action.type === ACTION_SUCCESS_TME) {
    return state.set('tme', action.payload).set('err', false);
  } else if (action.type == ACTION_SUCCESS_UPDATE) {
    return state.set('msg', action.payload).set('err', false);
  } else if (action.type == ACTION_ERROR) {
    return state.set('err', action.payload);
  } else if (action.type == ACTION_SUCCESS_SEARCH) {
    return state.set('searchData', action.payload).set('err', false);
  }else if (action.type == ACTION_SUCCESS_TME_OUTLETLIST) {
    return state.set('tmeOutletList', action.payload).set('err', false);
  }
  return state;
}
