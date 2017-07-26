import Immutable from 'immutable';
import { ACTION_SHOW_LOADING, ACTION_HIDE_LOADING } from '../../actions/loader';


const initialState = {
  show_loading: false,
};

export function loader(state = Immutable.Map(initialState), action) {
  if (action.type == ACTION_SHOW_LOADING) {
    return state.set('show_loading', true);
  } else if (action.type == ACTION_HIDE_LOADING) {
    return state.set('show_loading', false);
  }
  return state;
}
