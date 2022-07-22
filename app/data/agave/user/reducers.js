import produce from 'immer';
import {
  FETCH_USERS,
  SUCCESS_FETCH_USERS,
  FAILED_FETCH_USERS,
} from './constants';

export const initialState = {
  userLoading: false,
  users: {},
  err: null,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USERS:
        draft.userLoading = true;
        break;
      case SUCCESS_FETCH_USERS:
        draft.userLoading = false;
        draft.users = action.userResponse;
        break;
      case FAILED_FETCH_USERS:
        draft.userLoading = false;
        draft.err = action.err;
        break;
    }
  });

export default userReducer;
