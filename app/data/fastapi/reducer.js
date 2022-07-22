/*
 * IbisReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_IBIS_RESPONSE,
  LOAD_IBIS_RESPONSE_SUCCESS,
  LOAD_IBIS_RESPONSE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentResponse: false,
  inputSequence: false,
};

/* eslint-disable default-case, no-param-reassign */
const ibisReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_IBIS_RESPONSE:
        draft.loading = true;
        draft.error = false;
        draft.currentResponse = false;
        draft.inputSequence = action.inputSequence;
        break;

      case LOAD_IBIS_RESPONSE_SUCCESS:
        draft.currentResponse = action.response;
        draft.loading = false;
        break;

      case LOAD_IBIS_RESPONSE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default ibisReducer;
