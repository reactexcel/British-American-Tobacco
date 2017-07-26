import Immutable from 'immutable';
import {ACTION_SUCCESS_GET_OUTLET_LIST, ACTION_SUCCESS_GET_OUTLET ,ACTION_ERROR_OUTLET} from '../actions/outlets'

let initialState = {
    "viewoutlet" : [],
    "outlet": {},
    'error':false
}

export function outlets( state = Immutable.fromJS(initialState), action ){

    if( action.type === ACTION_SUCCESS_GET_OUTLET_LIST ){

        return state.set( 'viewoutlet' , action.payload ).set( 'error' , false ).set( 'outlet' ,{} )

    }else if( action.type === ACTION_SUCCESS_GET_OUTLET ){

        return state.set( 'outlet' , action.payload ).set( 'error' , false )

    }else if( action.type === ACTION_ERROR_OUTLET ){

        return state.set( 'error' , action.payload )

    }
    else{
    	return state
    }
}
