import Immutable from 'immutable';
import { ACTION_SUCCESS_SKULIST, ACTION_SUCCESS_ADDSKU, ACTION_ERROR, ACTION_ERROR_ADDSKU, ACTION_SUCCESS_UPDATE, ACTION_SUCCESS_SKU } from '../actions/allsku';
const initialState = {
  skuList: [],
  brandName: [],
  skuData: [],
  sku: {},
  msg: '',
  err: '',
};

export function skuList(state = Immutable.fromJS(initialState), action) {
  if (action.type == ACTION_SUCCESS_SKULIST) {
    return state.set('skuList', action.payload).set('err', false).set('skuData',[]);
  } else if (action.type == ACTION_SUCCESS_ADDSKU) {
    return state.set('skuData', action.payload).set('err', false);
  } else if (action.type == ACTION_ERROR_ADDSKU) {
    return state.set('skuData', action.payload).set('err', false);
  } else if (action.type === ACTION_SUCCESS_SKU) {
    return state.set('sku', action.payload.details).set('err', false);
  } else if (action.type == ACTION_SUCCESS_UPDATE) {
    return state.set('msg', action.payload).set('err', false);
  } else if (action.type == ACTION_ERROR) {
    return state.set('err', action.payload);
  }
  return state;
}
