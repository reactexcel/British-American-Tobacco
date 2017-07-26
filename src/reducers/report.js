import Immutable from 'immutable';
import {ACTION_SUCCESS_REPORT, ACTION_SUCCESS_ALL_REPORT, ACTION_SUCCESS_ROLLBACK} from '../actions/report';

let initialState = {
    "report": [],
    "allReports": [],
    "rollback": false
}

export function report( state = Immutable.fromJS(initialState), action ){
    if( action.type == ACTION_SUCCESS_REPORT ){
      return state.set( 'report' , action.payload );
    } else if( action.type == ACTION_SUCCESS_ALL_REPORT ){
      return state.set( 'allReports' , action.payload );
    } else if( action.type == ACTION_SUCCESS_ROLLBACK ){
      return state.set( 'rollback' , true );
    } else {
      return state;
    }
}
