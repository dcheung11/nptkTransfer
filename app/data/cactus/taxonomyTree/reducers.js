import produce from 'immer';
import {
  FETCH_INHOUSE_REQUESTED,
  SUCCESS_INHOUSE,
  FAILED_INHOUSE,
} from './constants';

// The initial state of the App
export const initialState = {
  error: false,
  loading: false,
  inhouseData: [],
};

/* eslint-disable default-case, no-param-reassign */
const taxonomyTreeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INHOUSE_REQUESTED:
        draft.loading = true;
        break;
      case SUCCESS_INHOUSE:
        draft.loading = false;
        draft.inhouseData = action.inhouseData;
        break;
      case FAILED_INHOUSE:
        draft.loading = false;
        draft.error = action.err;
        break;
    }
  });

export default taxonomyTreeReducer;
