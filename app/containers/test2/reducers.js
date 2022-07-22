import produce from 'immer';
import {
  CREATE_TAXONOMY_NODE,
  SUCCESS_CREATE_TAXONOMY_NODE,
  FAILED_CREATE_TAXONOMY_NODE,
} from './constants';

// The initial state of the App
export const initialState = {
  queryId: '',
  error: {},
  names: [
    {
      value: '',
      path: '',
      taxonomy_id: '',
      rank: '',
    },
  ],
  cultures: [
    {
      agitation: null,
      comments: null,
      created_date: '2006-06-25T16:20:00.000000+00:00',
      culture_id: 0,
      culture_medium: {
        culture_medium_id: 0,
        name: '',
      },
      experiment_class: {
        name: null,
      },
      experiment_class_id: null,
      fermentation_temperature: null,
      fermentation_time: null,
      fermentation_volume: null,
      inoculation_date: null,
      medium_id: 0,
      organization_id: null,
      replicons: null,
      researcher_id: 0,
      status: '',
      study_id: null,
      user_details: {
        email: null,
        first_name: '',
        initials: null,
        last_name: null,
        organization_id: '',
        user_details_id: 0,
      },
    },
  ],
  metabologenomicData: {
    metabologenomicHits: [],
    metabologenomicLoading: false,
    err: '',
  },
  taxonomyData: {
    name: '',
    ncbi_id: 0,
    path: '',
    rank: '',
    tax: {
      kingdom: '',
      kingdom_id: '',
      phylum: '',
      phylum_id: '',
      order: '',
      order_id: '',
    },
    taxonomy_id: '',
  },
  childNodes: [],
  parentNodes: [],
  taxonomyLoading: false,
  childLoading: false,
  molLoading: false,
  smallMolecules: {
    0: [
      {
        activity: [],
        chemotype: [],
        names: [],
        original_smiles: '',
        smallmolecule_id: '',
      },
    ],
  },
  genomeStats: {
    0: [
      {
        submission_id: 0,
        num_clusters: 0,
        chemotypes: [
          {
            count: 0,
            families: [],
          },
        ],
      },
    ],
  },
};

/* eslint-disable default-case, no-param-reassign */
const taxonomyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_TAXONOMY_NODE:
        draft.taxonomyLoading = true;
        break;
      case SUCCESS_CREATE_TAXONOMY_NODE:
        draft.taxonomyLoading = false;
        draft.taxonomyData = action.taxonomyData;
        break;
      case FAILED_CREATE_TAXONOMY_NODE:
        draft.taxonomyLoading = false;
        draft.error = action.err;
        break;
    }
  });

export default taxonomyReducer;
