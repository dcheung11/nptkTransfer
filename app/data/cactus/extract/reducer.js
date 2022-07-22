import produce from 'immer';
import {
  FETCH_EXTRACT_METADATA,
  FETCH_EXTRACT_ACTIVITY,
  FETCH_UNIQUE_PEAKS,
  FETCH_EXTRACT_SMALLMOLECULES,
  FETCH_EXTRACT_CHEMOTYPES,
  FAILED_EXTRACT_CHEMOTYPES,
  FAILED_EXTRACT_ACTIVITY,
  FAILED_UNIQUE_PEAKS,
  FAILED_EXTRACT_SMALLMOLECULES,
  FAILED_EXTRACT_METADATA,
  SUCCESS_UNIQUE_PEAKS,
  SUCCESS_EXTRACT_SMALLMOLECULES,
  SUCCESS_EXTRACT_METADATA,
  SUCCESS_EXTRACT_ACTIVITY,
  SUCCESS_EXTRACT_CHEMOTYPES,
  SET_EXTRACT_ID,
  FETCH_EXTRACT_MALARIA_ASSAY,
  FETCH_EXTRACT_TB_ASSAY,
  SUCCESS_EXTRACT_MALARIA_ASSAY,
  FAILED_EXTRACT_MALARIA_ASSAY,
  SUCCESS_EXTRACT_TB_ASSAY,
  FAILED_EXTRACT_TB_ASSAY,
} from './constants';

export const initialState = {
  uniquePeaksLoading: false,
  smallMoleculesLoading: false,
  activityLoading: false,
  metadataLoading: false,
  chemotypeLoading: false,
  tbLoading: false,
  malariaLoading: false,
  uniquePeaks: {},
  smallMolecules: {},
  activities: {},
  metadata: {},
  chemotypes: {},
  tbAssay: {},
  malariaAssay: {},
  currentExtractId: '',
  error: '',
};

/* eslint-disable no-param-reassign, default-case */
const extractReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_EXTRACT_ID:
        draft.currentExtractId = action.extractQuery.extractId;
        break;
      case FETCH_EXTRACT_SMALLMOLECULES:
        draft.smallMoleculesLoading = true;
        break;
      case FETCH_UNIQUE_PEAKS:
        draft.uniquePeaksLoading = true;
        break;
      case FETCH_EXTRACT_ACTIVITY:
        draft.activityLoading = true;
        break;
      case FETCH_EXTRACT_METADATA:
        draft.metadataLoading = true;
        break;
      case FETCH_EXTRACT_CHEMOTYPES:
        draft.chemotypeLoading = true;
        break;
      case FETCH_EXTRACT_MALARIA_ASSAY:
        draft.malariaLoading = true;
        break;
      case FETCH_EXTRACT_TB_ASSAY:
        draft.tbLoading = true;
        break;
      case SUCCESS_EXTRACT_METADATA:
        draft.metadataLoading = false;
        // draft.metadata = { ...state.metadata, ...action.metaData };
        draft.metadata = action.metaData;
        break;
      case SUCCESS_EXTRACT_ACTIVITY:
        draft.activityLoading = false;
        // draft.activities = { ...state.activities, ...action.activityData };
        draft.activities = action.activityData;
        break;
      case SUCCESS_UNIQUE_PEAKS:
        draft.uniquePeaksLoading = false;
        // draft.uniquePeaks = { ...state.uniquePeaks, ...action.peakData };
        draft.uniquePeaks = action.peakData;
        break;
      case SUCCESS_EXTRACT_SMALLMOLECULES:
        draft.smallMoleculesLoading = false;
        // draft.smallMolecules = { ...state.smallMolecules, ...action.smData };
        draft.smallMolecules = action.smData;
        break;
      case SUCCESS_EXTRACT_CHEMOTYPES:
        draft.chemotypeLoading = false;
        // draft.chemotypes = { ...state.chemotypes, ...action.chemotypeData };
        draft.chemotypes = action.chemotypeData;
        break;
      case SUCCESS_EXTRACT_MALARIA_ASSAY:
        draft.malariaLoading = false;
        draft.malariaAssay = action.malariaData;
        break;
      case SUCCESS_EXTRACT_TB_ASSAY:
        draft.tbLoading = false;
        draft.tbAssay = action.tbData;
        break;
      case FAILED_EXTRACT_TB_ASSAY:
        draft.tbLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACT_MALARIA_ASSAY:
        draft.malariaAssay = false;
        draft.error = action.err;
        break;
      case FAILED_UNIQUE_PEAKS:
        draft.uniquePeaksLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACT_SMALLMOLECULES:
        draft.smallMoleculesLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACT_METADATA:
        draft.metadataLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACT_ACTIVITY:
        draft.activityLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACT_CHEMOTYPES:
        draft.chemotypeLoading = false;
        draft.error = action.err;
        break;
    }
  });

export default extractReducer;
