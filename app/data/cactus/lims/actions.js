import {
  FAILED_CULTURE_MEDIUM,
  FAILED_EXPERIMENT_CLASSES,
  FAILED_EXTRACTION_METHODS,
  FAILED_EXTRACTION_SOLVENTS,
  FAILED_ORGANIZATION_IDS,
  FETCH_CULTURE_MEDIUM,
  FETCH_EXPERIMENT_CLASSES,
  FETCH_EXTRACTION_METHODS,
  FETCH_EXTRACTION_SOLVENTS,
  FETCH_ORGANIZATION_IDS,
  SUCCESS_CULTURE_MEDIUM,
  SUCCESS_EXPERIMENT_CLASSES,
  SUCCESS_EXTRACTION_METHODS,
  SUCCESS_EXTRACTION_SOLVENTS,
  SUCCESS_ORGANIZATION_IDS,
  CREATE_EXTRACT,
  FAILED_CREATE_EXTRACT,
  SUCCESS_CREATE_EXTRACT,
  CREATE_EXTRACTION_METHOD,
  FAILED_CREATE_EXTRACTION_METHOD,
  SUCCESS_CREATE_EXTRACTION_METHOD,
  CREATE_EXTRACTION_SOLVENT,
  FAILED_CREATE_EXTRACTION_SOLVENT,
  SUCCESS_CREATE_EXTRACTION_SOLVENT,
  CREATE_ORGANIZATION,
  SUCCESS_CREATE_ORGANIZATION,
  FAILED_CREATE_ORGANIZATION,
  CREATE_CULTURE,
  SUCCESS_CREATE_CULTURE,
  FAILED_CREATED_CULTURE,
  CREATE_MEDIA_TYPE,
  SUCCESS_CREATE_MEDIA_TYPE,
  FAILED_CREATE_MEDIA_TYPE,
  CREATE_EXPERIMENTAL_CLASS,
  SUCCESS_CREATE_EXPERIMENTAL_CLASS,
  FAILED_CREATE_EXPERIMENTAL_CLASS,
  FETCH_ME,
  SUCCESS_FETCH_ME,
  FAILED_FETCH_ME,
} from './constants';

export function fetchCultureMedium(queryData) {
  return {
    type: FETCH_CULTURE_MEDIUM,
    queryData,
  };
}

export function successCultureMedium(cultureData) {
  return {
    type: SUCCESS_CULTURE_MEDIUM,
    cultureData,
  };
}

export function failedCultureMedium(err) {
  return {
    type: FAILED_CULTURE_MEDIUM,
    err,
  };
}

export function fetchExperimentClasses(queryData) {
  return {
    type: FETCH_EXPERIMENT_CLASSES,
    queryData,
  };
}

export function successExperimentClasses(experimentData) {
  return {
    type: SUCCESS_EXPERIMENT_CLASSES,
    experimentData,
  };
}

export function failedExperimentClasses(err) {
  return {
    type: FAILED_EXPERIMENT_CLASSES,
    err,
  };
}

export function fetchOrganizationIds(queryData) {
  return {
    type: FETCH_ORGANIZATION_IDS,
    queryData,
  };
}

export function successOrganizationIds(organizationData) {
  return {
    type: SUCCESS_ORGANIZATION_IDS,
    organizationData,
  };
}

export function failedOrganizationIds(err) {
  return {
    type: FAILED_ORGANIZATION_IDS,
    err,
  };
}

export function fetchExtractionMethods(queryData) {
  return {
    type: FETCH_EXTRACTION_METHODS,
    queryData,
  };
}

export function successExtractionMethods(methodData) {
  return {
    type: SUCCESS_EXTRACTION_METHODS,
    methodData,
  };
}

export function failedExtractionMethods(err) {
  return {
    type: FAILED_EXTRACTION_METHODS,
    err,
  };
}

export function fetchExtractionSolvents(queryData) {
  return {
    type: FETCH_EXTRACTION_SOLVENTS,
    queryData,
  };
}

export function successExtractionSolvents(solventData) {
  return {
    type: SUCCESS_EXTRACTION_SOLVENTS,
    solventData,
  };
}

export function failedExtractionSolvents(err) {
  return {
    type: FAILED_EXTRACTION_SOLVENTS,
    err,
  };
}

export function createExtract(extractForm) {
  return {
    type: CREATE_EXTRACT,
    extractForm,
  };
}

export function successCreateExtract(createdEntry) {
  return {
    type: SUCCESS_CREATE_EXTRACT,
    createdEntry,
  };
}

export function failedCreateExtract(err) {
  return {
    type: FAILED_CREATE_EXTRACT,
    err,
  };
}

export function createExtractionMethod(methodData) {
  return {
    type: CREATE_EXTRACTION_METHOD,
    methodData,
  };
}

export function failedCreateExtractionMethod(err) {
  return {
    type: FAILED_CREATE_EXTRACTION_METHOD,
    err,
  };
}

export function successCreateExtractionMethod(methodResponse) {
  return {
    type: SUCCESS_CREATE_EXTRACTION_METHOD,
    methodResponse,
  };
}

export function createExtractionSolvent(solventData) {
  return {
    type: CREATE_EXTRACTION_SOLVENT,
    solventData,
  };
}

export function failedCreateExtractionSolvent(err) {
  return {
    type: FAILED_CREATE_EXTRACTION_SOLVENT,
    err,
  };
}

export function successCreateExtractionSolvent(solventResponse) {
  return {
    type: SUCCESS_CREATE_EXTRACTION_SOLVENT,
    solventResponse,
  };
}

export function createOrganization(organizationData) {
  return {
    type: CREATE_ORGANIZATION,
    organizationData,
  };
}

export function successCreateOrganization(organizationResponse) {
  return {
    type: SUCCESS_CREATE_ORGANIZATION,
    organizationResponse,
  };
}

export function failedCreateOrganization(err) {
  return {
    type: FAILED_CREATE_ORGANIZATION,
    err,
  };
}

export function createCulture(cultureForm) {
  return {
    type: CREATE_CULTURE,
    cultureForm,
  };
}

export function successCreateCulture(cultureResponse) {
  return {
    type: SUCCESS_CREATE_CULTURE,
    cultureResponse,
  };
}

export function failedCreateCulture(err) {
  return {
    type: FAILED_CREATED_CULTURE,
    err,
  };
}

export function createMediaType(mediaData) {
  return {
    type: CREATE_MEDIA_TYPE,
    mediaData,
  };
}

export function successCreateMediaType(mediaResponse) {
  return {
    type: SUCCESS_CREATE_MEDIA_TYPE,
    mediaResponse,
  };
}

export function failedCreateMediaType(err) {
  return {
    type: FAILED_CREATE_MEDIA_TYPE,
    err,
  };
}

export function createExperimentalClass(classData) {
  return {
    type: CREATE_EXPERIMENTAL_CLASS,
    classData,
  };
}

export function successCreateExperimentalClass(classResponse) {
  return {
    type: SUCCESS_CREATE_EXPERIMENTAL_CLASS,
    classResponse,
  };
}

export function failedCreateExperimentalClass(err) {
  return {
    type: FAILED_CREATE_EXPERIMENTAL_CLASS,
    err,
  };
}

export function fetchMe(queryData) {
  return {
    type: FETCH_ME,
    queryData,
  };
}

export function successFetchMe(meData) {
  return {
    type: SUCCESS_FETCH_ME,
    meData,
  };
}

export function failedFetchMe(err) {
  return {
    type: FAILED_FETCH_ME,
    err,
  };
}
