import produce from 'immer';
import { FETCH_MS2_IONS, SUCCESS_MS2_IONS, FAILED_MS2_IONS } from './constants';

export const initialState = {
  ms1PeakId: '',
  ms2IonData: [],
  ms2Loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const ms1Reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_MS2_IONS:
        draft.ms2Loading = true;
        draft.ms1PeakId = action.queryData.ms1PeakId;
        break;
      case SUCCESS_MS2_IONS:
        draft.ms2Loading = false;
        draft.ms2IonData = action.ms2Data;
        break;
      case FAILED_MS2_IONS:
        draft.ms2Loading = false;
        draft.error = action.err;
        break;
    }
  });

export default ms1Reducer;
