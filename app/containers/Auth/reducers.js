import produce from 'immer';
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  GET_USER_METADATA_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  error: '',
  loading: false,
  authenticated: false,
  user: {
    email: 'placeholder@magarveylab.ca',
    exp: '0',
    first_name: 'first',
    initials: 'FN',
    is_active: 'false',
    last_name: 'name',
    organization_id: 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
    role: 'none',
    username: 'familiar_name_not_found',
  },
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.loading = true;
        break;
      case GET_USER_METADATA_SUCCESS:
        draft.user = action.user;
        break;
      case LOGIN_FAILED:
        draft.loading = false;
        draft.error = action.error;
        break;
      case LOGIN_SUCCESS:
        draft.authenticated = true;
        draft.loading = false;
        draft.error = '';
        break;
      case LOGOUT:
        draft.loading = true;
        break;
      case LOGOUT_FAILED:
        draft.loading = false;
        draft.error = action.error;
        break;
      case LOGOUT_SUCCESS:
        return initialState;
    }
  });

export default authReducer;
