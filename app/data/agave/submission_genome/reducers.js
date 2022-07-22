import produce from 'immer';
import {
  DEPOSIT_GENOME,
  SUCCESS_DEPOSIT_GENOME,
  FAILED_DEPOSIT_GENOME,
} from './constants';

export const initialState = {
  depositingGenome: false,
  submission: {},
  err: null,
};

/* eslint-disable default-case, no-param-reassign */
const genomeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEPOSIT_GENOME:
        draft.depositingGenome = true;
        break;
      case SUCCESS_DEPOSIT_GENOME:
        draft.depositingGenome = false;
        draft.submission = action.genomeResponse;
        break;
      case FAILED_DEPOSIT_GENOME:
        draft.depositingGenome = false;
        draft.err = action.err;
        break;
    }
  });

export default genomeReducer;
