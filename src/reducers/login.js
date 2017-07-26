import Immutable from 'immutable';
import {USERS_LOGIN_SUCCESS, JWT_TOKEN_EXPIRED} from '../actions/login';

let initialState =  {
  LoginStatus: '',
  token: '',
  tokenStatus: '',
};

export function login(state = Immutable.Map(initialState), action) {
    switch (action.type) {
        case USERS_LOGIN_SUCCESS:
          return state.set("status",action.payload.status)
                .set("token",action.payload.token)
                .set("tokenStatus", "Active");
        case JWT_TOKEN_EXPIRED:
          return state.set("tokenStatus", "Expired");
        default:
          return state;
    }
}
