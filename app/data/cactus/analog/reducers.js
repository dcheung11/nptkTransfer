import produce from 'immer';
import {
  FETCH_SMALL_MOLECULES,
  FAILED_SMALL_MOLECULES,
  SUCCESS_SMALL_MOLECULES,
  FAILED_EXTRACTS_AND_METADATA,
  FETCH_EXTRACTS_AND_METADATA,
  SUCCESS_EXTRACTS_AND_METADATA,
} from './constants';

export const initialState = {
  smallMoleculeLoading: false,
  extractAndMetaDataLookupLoading: false,
  smallMoleculeLookup: {},
  extractAndMetaDataLookup: {},
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const analogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SMALL_MOLECULES:
        draft.smallMoleculesLoading = true;
        break;
      case FETCH_EXTRACTS_AND_METADATA:
        draft.extractAndMetaDataLookupLoading = true;
        break;
      case SUCCESS_SMALL_MOLECULES:
        draft.smallMoleculesLoading = false;
        draft.smallMoleculeLookup = action.smallMoleculeData;
        break;
      case SUCCESS_EXTRACTS_AND_METADATA:
        draft.extractAndMetaDataLookupLoading = false;
        draft.extractAndMetaDataLookup = action.extractData;
        break;
      case FAILED_SMALL_MOLECULES:
        draft.smallMoleculesLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACTS_AND_METADATA:
        draft.extractAndMetaDataLookupLoading = false;
        draft.error = action.err;
    }
  });

export default analogReducer;
