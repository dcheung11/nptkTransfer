import produce from 'immer';
import {
  FETCH_TAXONOMY,
  SUCCESS_FETCH_TAXONOMY,
  FAILED_FETCH_TAXONOMY,
  AJAX_NAME_SEARCH,
  SUCCESS_NAME_SEARCH,
  FAILED_NAME_SEARCH,
  FETCH_CHILDREN_STATS,
  SUCCESS_CHILDREN_STATS,
  FAILED_CHILDREN_STATS,
  FETCH_TAX_MOLECULES,
  SUCCESS_TAX_MOLECULES,
  FAILED_TAX_MOLECULES,
  FETCH_PARENT_STATS,
  SUCCESS_PARENT_STATS,
  FAILED_PARENT_STATS,
  FETCH_CULTURE_EXTRACTS,
  SUCCESS_CULTURE_EXTRACTS,
  FAILED_CULTURE_EXTRACTS,
  FAILED_GENOME_STATS,
  FETCH_GENOME_STATS,
  SUCCESS_GENOME_STATS,
  FETCH_METABOLOGENOMIC,
  SUCCESS_METABOLOGENOMIC,
  FAILED_METABOLOGENOMIC,
  FETCH_INHOUSE,
  SUCCESS_INHOUSE,
  FAILED_INHOUSE,
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
      case SUCCESS_FETCH_TAXONOMY:
        draft.taxonomyLoading = false;
        draft.taxonomyData = action.taxonomyData;
        break;
      case FAILED_FETCH_TAXONOMY:
        draft.taxonomyLoading = false;
        draft.error = action.err;
        break;
      case FETCH_TAXONOMY:
        draft.taxonomyLoading = true;
        draft.queryId = action.taxonomyData.taxonomyId;
        break;
      case AJAX_NAME_SEARCH:
        draft.ajaxLoading = true;
        draft.queryStr = action.nameSearch.nameStr;
        break;
      case SUCCESS_NAME_SEARCH:
        draft.ajaxLoading = false;
        draft.names = action.names;
        break;
      case FAILED_NAME_SEARCH:
        draft.ajaxLoading = false;
        draft.error = action.err;
        break;
      case FETCH_CHILDREN_STATS:
        draft.childLoading = true;
        break;
      case SUCCESS_CHILDREN_STATS:
        draft.childLoading = false;
        draft.childNodes = action.taxonomyData.result;
        break;
      case FAILED_CHILDREN_STATS:
        draft.childLoading = false;
        draft.error = action.error;
        break;
      case FETCH_TAX_MOLECULES:
        draft.molLoading = true;
        break;
      case SUCCESS_TAX_MOLECULES:
        draft.molLoading = false;
        draft.smallMolecules = action.smData;
        break;
      case FAILED_TAX_MOLECULES:
        draft.molLoading = false;
        draft.err = action.err;
        break;
      case FETCH_PARENT_STATS:
        draft.parentLoading = true;
        break;
      case SUCCESS_PARENT_STATS:
        draft.parentLoading = false;
        draft.parentNodes = action.taxonomyData.result;
        break;
      case FAILED_PARENT_STATS:
        draft.parentLoading = false;
        draft.err = action.err;
        break;
      case FETCH_CULTURE_EXTRACTS:
        draft.cultureLoading = true;
        break;
      case SUCCESS_CULTURE_EXTRACTS:
        draft.cultureLoading = false;
        draft.cultures = action.taxonomyData[0].culture;
        break;
      case FAILED_CULTURE_EXTRACTS:
        draft.cultureLoading = false;
        draft.err = action.err;
        break;
      case FETCH_GENOME_STATS:
        draft.genomeLoading = true;
        break;
      case SUCCESS_GENOME_STATS:
        draft.genomeLoading = false;
        draft.genomeStats = action.taxonomyData;
        break;
      case FAILED_GENOME_STATS:
        draft.genomeLoading = false;
        draft.err = action.err;
        break;
      case FETCH_METABOLOGENOMIC:
        draft.metabologenomicData.metabologenomicLoading = true;
        break;
      case SUCCESS_METABOLOGENOMIC:
        draft.metabologenomicData.metabologenomicLoading = false;
        draft.metabologenomicData.metabologenomicHits = action.hitData;
        break;
      case FAILED_METABOLOGENOMIC:
        draft.metabologenomicData.metabologenomicLoading = false;
        draft.metabologenomicData.error = action.err;
        break;
      case FETCH_INHOUSE:
        draft.inhouseData.inhouseLoading = true;
        break;
      case SUCCESS_INHOUSE:
        draft.inhouseData.inhouseLoading = false;
        draft.inhouseData.inhouseHits = action.taxonomyData;
        break;
      case FAILED_INHOUSE:
        draft.inhouseData.inhouseLoading = false;
        draft.inhouseData.error = action.err;
        break;
    }
  });

export default taxonomyReducer;
