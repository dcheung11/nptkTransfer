import produce from 'immer';
import {
  FETCH_CROP_DISEASE,
  FETCH_CROP_DETAILS,
  SUCCESS_CROP_DISEASE,
  SUCCESS_CROP_DETAILS,
  FAILED_CROP_DISEASE,
  FAILED_CROP_DETAILS,
  FETCH_CROP_METAGENOMIC_SAMPLES,
  SUCCESS_CROP_METAGENOMIC_SAMPLES,
  FAILED_CROP_METAGENOMIC_SAMPLES,
} from './constants';

export const initialState = {
  cropDetailLoading: false,
  cropDiseaseLoading: false,
  cropMetagenomicLoading: false,
  diseaseMetadata: {},
  cropDetails: {},
  metagenomicDetails: {},
  error: 'null',
};
/* eslint-disable no-param-reassign, default-case */
const cropReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CROP_DETAILS:
        draft.cropDetailLoading = true;
        break;
      case FETCH_CROP_DISEASE:
        draft.cropDiseaseLoading = true;
        break;
      case FETCH_CROP_METAGENOMIC_SAMPLES:
        draft.cropMetagenomicLoading = true;
        break;
      case SUCCESS_CROP_DETAILS:
        draft.cropDetailLoading = false;
        draft.cropDetails = {
          ...state.cropDetails,
          ...action.cropData,
        };
        break;
      case SUCCESS_CROP_DISEASE:
        draft.cropDiseaseLoading = false;
        draft.diseaseMetadata = {
          ...state.diseaseMetadata,
          ...action.cropDiseaseData,
        };
        break;
      case SUCCESS_CROP_METAGENOMIC_SAMPLES:
        draft.cropMetagenomicLoading = false;
        draft.metagenomicDetails = {
          ...state.metagenomicDetails,
          ...action.cropMetagenomicData,
        };
        break;
      case FAILED_CROP_DETAILS:
        draft.cropDetailLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CROP_DISEASE:
        draft.cropDiseaseLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CROP_METAGENOMIC_SAMPLES:
        draft.cropMetagenomicLoading = false;
        draft.error = action.err;
        break;
    }
  });

export default cropReducer;
