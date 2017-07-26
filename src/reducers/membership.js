import Immutable from 'immutable';
import { ACTION_SUCCESS_MEMBERLIST, ACTION_SUCCESS_ADDMEMBER, ACTION_ERROR_ADDMEMBER, ACTION_SUCCESS_UPDATEMEMBER, ACTION_SUCCESS_GET_MEMBERLIST} from '../actions/membership/index';
const initialState = {
  membershipList: {},
  membershipData: [],
  Addmembership: {},
  member: {},
  msg: '',
  err: '',
};

export function membership(state = Immutable.fromJS(initialState), action) {
  if (action.type == ACTION_SUCCESS_MEMBERLIST) {

    return state.set('membershipData', action.payload);
  }
  else if (action.type == ACTION_SUCCESS_ADDMEMBER) {
    return state.set('Addmembership', action.payload);
  }
  else if (action.type == ACTION_ERROR_ADDMEMBER) {
     return state.set('Addmembership', action.payload);
   }
   else if (action.type == ACTION_SUCCESS_UPDATEMEMBER) {
       return state.set('msg', action.payload);
     }
     else if (action.type == ACTION_SUCCESS_GET_MEMBERLIST) {
       return state.set('member', action.payload);
  }
  return state;
}
