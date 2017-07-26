import { createAction } from 'redux-actions';

export const ACTION_SHOW_LOADING = "ACTION_SHOW_LOADING";
export const ACTION_HIDE_LOADING = "ACTION_HIDE_LOADING";

export function show_loading() {
  return createAction(ACTION_SHOW_LOADING)();
}

export function hide_loading() {
  return createAction(ACTION_HIDE_LOADING)();
}
