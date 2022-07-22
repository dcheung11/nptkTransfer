import produce from 'immer';
import {
  FETCH_PRISM_REPORT,
  FETCH_QUINCE_KNOWN,
  FETCH_MINHASH_RELATIVES,
  FETCH_CLUSTER_INTERPRO,
  FETCH_CLUSTER_METADATA,
  SUCCESSFUL_PRISM_FETCH,
  SUCCESSFUL_QUINCE_KNOWN,
  SUCCESS_CLUSTER_INTERPRO,
  SUCCESS_MINHASH_RELATIVES,
  SUCCESS_CLUSTER_METADATA,
  FAILED_PRISM_FETCH,
  FAILED_QUINCE_KNOWN,
  FAILED_MINHASH_RELATIVES,
  FAILED_CLUSTER_INTERPRO,
  FAILED_CLUSTER_METADATA,
} from './constants';

// setAutoFreeze(false);

// The initial state of the App
export const initialState = {
  prismLoading: false,
  interproLoading: false,
  minhashLoading: false,
  quinceKnownLoading: false,
  metadataLoading: false,
  metadata: {},
  clusterOrfs: {},
  report: {},
  relatives: { 0: { hits: [], total: 0 } },
  knownData: [],
  error: 'null',
};

/* eslint-disable default-case, no-param-reassign */
const clusterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PRISM_REPORT:
        draft.report[action.submissionData.submissionId] = {
          ...state.report[action.submissionData.submissionId],
          prismLoading: true,
        };
        break;
      case FETCH_CLUSTER_INTERPRO:
        draft.interproLoading = true;
        break;
      case FETCH_MINHASH_RELATIVES:
        draft.minhashLoading = true;
        break;
      case FETCH_QUINCE_KNOWN:
        draft.quinceKnownLoading = true;
        break;
      case FETCH_CLUSTER_METADATA:
        draft.metadataLoading = true;
        break;
      case SUCCESSFUL_PRISM_FETCH:
        draft.report = {
          ...state.report,
          ...action.prismData.response.results,
        };
        draft.report[action.submissionId] = {
          ...draft.report[action.submissionId],
          prismLoading: false,
        };
        break;
      case SUCCESS_CLUSTER_INTERPRO:
        draft.interproLoading = false;
        draft.interproData = action.interproData;
        break;
      case SUCCESS_MINHASH_RELATIVES:
        draft.minhashLoading = false;
        draft.relatives = action.relatives;
        break;
      case SUCCESSFUL_QUINCE_KNOWN:
        draft.quinceKnownLoading = false;
        draft.knownData = action.knownData;
        break;
      case SUCCESS_CLUSTER_METADATA:
        draft.metadataLoading = false;
        draft.metadata = action.metadata;
        break;
      case FAILED_PRISM_FETCH:
        draft.error = action.error;
        draft.report[action.submissionId] = {
          ...state.report[action.submissionId],
          prismLoading: true,
        };
        break;
      case FAILED_CLUSTER_INTERPRO:
        draft.interproLoading = false;
        draft.error = action.error;
        break;
      case FAILED_MINHASH_RELATIVES:
        draft.minhashLoading = false;
        draft.error = action.error;
        break;
      case FAILED_QUINCE_KNOWN:
        draft.quinceKnownLoading = false;
        draft.error = action.error;
        break;
      case FAILED_CLUSTER_METADATA:
        draft.metadataLoading = false;
        draft.error = action.error;
        break;
    }
  });

export default clusterReducer;
