import produce from 'immer';

import {
  FETCH_EXPERIMENT_CLASSES,
  FETCH_CULTURE_MEDIUM,
  FAILED_CULTURE_MEDIUM,
  FAILED_EXPERIMENT_CLASSES,
  SUCCESS_CULTURE_MEDIUM,
  SUCCESS_EXPERIMENT_CLASSES,
  FETCH_ORGANIZATION_IDS,
  FAILED_ORGANIZATION_IDS,
  SUCCESS_ORGANIZATION_IDS,
  FETCH_EXTRACTION_SOLVENTS,
  SUCCESS_EXTRACTION_SOLVENTS,
  FAILED_EXTRACTION_SOLVENTS,
  FETCH_EXTRACTION_METHODS,
  SUCCESS_EXTRACTION_METHODS,
  FAILED_EXTRACTION_METHODS,
  CREATE_EXTRACT,
  CREATE_EXPERIMENTAL_CLASS,
  CREATE_MEDIA_TYPE,
  CREATE_CULTURE,
  CREATE_ORGANIZATION,
  CREATE_EXTRACTION_SOLVENT,
  CREATE_EXTRACTION_METHOD,
  SUCCESS_CREATE_EXTRACT,
  SUCCESS_CREATE_EXPERIMENTAL_CLASS,
  SUCCESS_CREATE_MEDIA_TYPE,
  SUCCESS_CREATE_CULTURE,
  SUCCESS_CREATE_ORGANIZATION,
  SUCCESS_CREATE_EXTRACTION_SOLVENT,
  SUCCESS_CREATE_EXTRACTION_METHOD,
  FAILED_CREATE_EXTRACT,
  FAILED_CREATE_EXPERIMENTAL_CLASS,
  FAILED_CREATE_MEDIA_TYPE,
  FAILED_CREATE_EXTRACTION_METHOD,
  FAILED_CREATE_EXTRACTION_SOLVENT,
  FAILED_CREATE_ORGANIZATION,
  FAILED_CREATED_CULTURE,
  SUCCESS_FETCH_ME,
  FAILED_FETCH_ME,
  FETCH_ME,
} from './constants';

export const initialState = {
  mediumLoading: false,
  medium: [],
  experimentalClassLoading: false,
  experimentalClass: [],
  extractionMethodLoading: false,
  extractionMethods: [],
  solventLoading: false,
  solvents: [],
  organizationIdsLoading: false,
  organizationIds: [],
  error: '',
  createExtractLoading: false,
  createdExtract: '',
  createExperimentalClassLoading: false,
  createdExperimentalClass: '',
  createMediaTypeLoading: false,
  createdMediaType: '',
  createOrganizationLoading: false,
  createdOrganization: '',
  createExtractionSolventLoading: false,
  createdExtractionSolvent: '',
  createExtractionMethodLoading: false,
  createdExtractionMethod: '',
  createCultureLoading: false,
  createdCulture: '',
  fetchMeLoading: false,
  me: {},
};

/* eslint-disable no-param-reassign, default-case */
const limsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CULTURE_MEDIUM:
        draft.mediumLoading = true;
        break;
      case FETCH_EXPERIMENT_CLASSES:
        draft.experimentalClassLoading = true;
        break;
      case FETCH_ORGANIZATION_IDS:
        draft.organizationIdsLoading = true;
        break;
      case FETCH_EXTRACTION_SOLVENTS:
        draft.solventLoading = true;
        break;
      case CREATE_EXTRACT:
        draft.createExtractLoading = true;
        break;
      case FAILED_CREATE_EXTRACT:
        draft.createExtractLoading = false;
        draft.error = action.err;
        break;
      case SUCCESS_CREATE_EXTRACT:
        draft.createExtractLoading = false;
        draft.createdExtract = action.createdEntry;
        break;
      case SUCCESS_EXTRACTION_SOLVENTS:
        draft.solventLoading = false;
        draft.solvents = action.solventData;
        break;
      case FAILED_EXTRACTION_SOLVENTS:
        draft.solventLoading = false;
        draft.error = action.err;
        break;
      case FETCH_EXTRACTION_METHODS:
        draft.extractionMethodLoading = true;
        break;
      case SUCCESS_EXTRACTION_METHODS:
        draft.extractionMethodLoading = false;
        draft.extractionMethods = action.methodData;
        break;
      case FAILED_EXTRACTION_METHODS:
        draft.extractMethodLoading = false;
        draft.error = action.err;
        break;
      case SUCCESS_ORGANIZATION_IDS:
        draft.organizationIdsLoading = false;
        draft.organizationIds = action.organizationData;
        break;
      case FAILED_ORGANIZATION_IDS:
        draft.organizationIdsLoading = false;
        draft.error = action.err;
        break;
      case SUCCESS_CULTURE_MEDIUM:
        draft.mediumLoading = false;
        draft.medium = action.cultureData;
        break;
      case SUCCESS_EXPERIMENT_CLASSES:
        draft.experimentalClassLoading = false;
        draft.experimentalClass = action.experimentData;
        break;
      case FAILED_EXPERIMENT_CLASSES:
        draft.experimentalClassLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CULTURE_MEDIUM:
        draft.mediumLoading = false;
        draft.error = action.err;
        break;
      case CREATE_EXPERIMENTAL_CLASS:
        draft.createExperimentalClassLoading = true;
        break;
      case CREATE_MEDIA_TYPE:
        draft.createMediaTypeLoading = true;
        break;
      case CREATE_CULTURE:
        draft.createCultureLoading = true;
        break;
      case CREATE_ORGANIZATION:
        draft.createOrganizationLoading = true;
        break;
      case CREATE_EXTRACTION_SOLVENT:
        draft.createExtractionSolventLoading = true;
        break;
      case CREATE_EXTRACTION_METHOD:
        draft.createExtractionMethodLoading = true;
        break;
      case SUCCESS_CREATE_EXPERIMENTAL_CLASS:
        draft.createExperimentalClassLoading = true;
        draft.createdExperimentalClass = action.classResponse;
        break;
      case SUCCESS_CREATE_MEDIA_TYPE:
        draft.createMediaTypeLoading = false;
        draft.createdMediaType = action.mediaResponse;
        break;
      case SUCCESS_CREATE_CULTURE:
        draft.createCultureLoading = false;
        draft.createdCulture = action.cultureResponse;
        break;
      case SUCCESS_CREATE_ORGANIZATION:
        draft.createOrganizationLoading = false;
        draft.createdOrganization = action.organizationResponse;
        break;
      case SUCCESS_CREATE_EXTRACTION_SOLVENT:
        draft.createExtractionSolventLoading = false;
        draft.createdExtractionSolvent = action.solventResponse;
        break;
      case SUCCESS_CREATE_EXTRACTION_METHOD:
        draft.createExtractionMethodLoading = false;
        draft.createdExtractionMethod = action.methodData;
        break;
      case FAILED_CREATED_CULTURE:
        draft.createCultureLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CREATE_ORGANIZATION:
        draft.createOrganizationLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CREATE_EXTRACTION_SOLVENT:
        draft.createExtractionSolventLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CREATE_EXTRACTION_METHOD:
        draft.createExtractionMethodLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CREATE_MEDIA_TYPE:
        draft.createMediaTypeLoading = false;
        draft.error = action.err;
        break;
      case FAILED_CREATE_EXPERIMENTAL_CLASS:
        draft.createdExperimentalClass = false;
        draft.error = action.err;
        break;
      case FETCH_ME:
        draft.fetchMeLoading = true;
        break;
      case SUCCESS_FETCH_ME:
        draft.fetchMeLoading = false;
        draft.me = action.meData;
        break;
      case FAILED_FETCH_ME:
        draft.fetchMeLoading = false;
        draft.error = action.err;
        break;
    }
  });

export default limsReducer;
