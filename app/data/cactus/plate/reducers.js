import produce from 'immer';
import {
  FETCH_PLATE,
  FAILED_PLATE,
  SUCCESS_PLATE,
  FETCH_ALL_PLATES_INFO,
  FAILED_FETCH_ALL_PLATES_INFO,
  SUCCESS_FETCH_ALL_PLATES_INFO,
} from './constants';

export const initialState = {
  plateLoading: false,
  plate: {},
  error: 'null',
  allPlateLoading: false,
  allPlateInfo: [],
};
/* eslint-disable default-case, no-param-reassign */
const plateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PLATE:
        draft.plateLoading = true;
        break;
      case SUCCESS_PLATE:
        draft.plateLoading = false;
        draft.plate = { ...action.plateData };
        break;
      case FAILED_PLATE:
        draft.plateLoading = false;
        draft.error = action.err;
        break;
      case FETCH_ALL_PLATES_INFO:
        draft.allPlateLoading = true;
        break;
      case SUCCESS_FETCH_ALL_PLATES_INFO:
        draft.allPlateLoading = false;
        draft.allPlateLoading = action.allPlateData;
        break;
      case FAILED_FETCH_ALL_PLATES_INFO:
        draft.allPlateLoading = false;
        draft.err = action.err;
        break;
    }
  });

export default plateReducer;
