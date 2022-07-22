import produce from 'immer';
import {
  FETCH_PRISM_REPORT,
  SUCCESSFUL_PRISM_FETCH,
  FAILED_PRISM_FETCH,
  FETCH_METADATA,
  FAILED_METADATA,
  SUCCESSFUL_METADATA,
  FETCH_ORFS,
  FETCH_CLUSTERS,
  FAILED_ORFS,
  FAILED_CLUSTERS,
  SUCCESSFUL_CLUSTERS,
  SUCCESSFUL_ORFS,
} from './constants';

// The initial state of the App
export const initialState = {
  prismLoading: false,
  metadataLoading: false,
  orfsLoading: false,
  clustersLoading: false,
  orfs: {
    results: {
      0: [
        {
          aa_id: 0,
          nuc_id: 0,
          orf_id: 0,
          orf_start: 0,
          orf_stop: 0,
        },
      ],
    },
  },
  clusters: {
    results: {
      0: [
        {
          cluster_id: 0,
          cluster_start: 0,
          cluster_stop: 0,
          nuc_id: 0,
          predicted_families: ['NULL'],
        },
      ],
    },
  },
  submissionId: '',
  report: {
    results: {
      0: [{}],
    },
  },
  metadata: {
    0: {
      contigs: [
        {
          contig_length: 0,
          contig_name: 'placeholder',
          gc_content: 0,
          gene_count: 0,
          nuc_id: 0,
        },
      ],
      submission_fh: 'placeholder',
      submitted_by: 'placeholder',
      tax: {},
      taxonomy_id: 0,
    },
  },
};

/* eslint-disable default-case, no-param-reassign */
const submissionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PRISM_REPORT:
        draft.prismLoading = true;
        draft.submissionId = action.submissionData.submissionId;
        break;
      case FETCH_METADATA:
        draft.metadataLoading = true;
        break;
      case FETCH_CLUSTERS:
        draft.clustersLoading = true;
        break;
      case FETCH_ORFS:
        draft.orfsLoading = true;
        break;
      case SUCCESSFUL_PRISM_FETCH:
        draft.prismLoading = false;
        draft.report = action.prismResult;
        break;
      case SUCCESSFUL_METADATA:
        draft.metadataLoading = false;
        draft.metadata = action.metadata;
        break;
      case SUCCESSFUL_CLUSTERS:
        draft.clustersLoading = false;
        draft.clusters = action.clusters;
        break;
      case SUCCESSFUL_ORFS:
        draft.orfsLoading = false;
        draft.orfs = action.orfs;
        break;
      case FAILED_PRISM_FETCH:
        draft.prismLoading = false;
        draft.error = action.error;
        break;
      case FAILED_METADATA:
        draft.metadataLoading = false;
        draft.error = action.error;
        break;
      case FAILED_CLUSTERS:
        draft.clustersLoading = false;
        draft.error = action.error;
        break;
      case FAILED_ORFS:
        draft.orfsLoading = false;
        draft.error = action.error;
        break;
    }
  });

export default submissionReducer;
