import Immutable from 'immutable';
import {ACTION_SUCCESS_BRANDLIST, ACTION_SUCCESS_BRAND,ACTION_UNSUCCESS_BRAND} from '../actions/brands';

let initialState = {
    "viewbrands" : [],
    "brand": {},
    "error":''
}

export function brands( state = Immutable.fromJS(initialState), action ){

    if( action.type == ACTION_SUCCESS_BRANDLIST ){

      return state.set( 'viewbrands' , action.payload ).set( 'error' , false ).set( 'brand' , {});

    }else if( action.type == ACTION_SUCCESS_BRAND ){

      return state.set( 'brand' , action.payload.brand).set( 'error' , false );

    }else if( action.type == ACTION_UNSUCCESS_BRAND ){

      return state.set( 'error' , action.payload);

    }else{

      return state;

    }
}
