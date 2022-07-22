import {
  FETCH_EXTRACT_SMALLMOLECULES,
  FETCH_UNIQUE_PEAKS,
  FETCH_EXTRACT_ACTIVITY,
  FETCH_EXTRACT_METADATA,
  FETCH_EXTRACT_CHEMOTYPES,
  FAILED_EXTRACT_ACTIVITY,
  FAILED_EXTRACT_METADATA,
  FAILED_EXTRACT_SMALLMOLECULES,
  FAILED_UNIQUE_PEAKS,
  FAILED_EXTRACT_CHEMOTYPES,
  SUCCESS_EXTRACT_ACTIVITY,
  SUCCESS_EXTRACT_METADATA,
  SUCCESS_EXTRACT_SMALLMOLECULES,
  SUCCESS_UNIQUE_PEAKS,
  SUCCESS_EXTRACT_CHEMOTYPES,
  SET_EXTRACT_ID,
  FETCH_EXTRACT_MALARIA_ASSAY,
  FETCH_EXTRACT_TB_ASSAY,
  SUCCESS_EXTRACT_MALARIA_ASSAY,
  SUCCESS_EXTRACT_TB_ASSAY,
  FAILED_EXTRACT_MALARIA_ASSAY,
  FAILED_EXTRACT_TB_ASSAY,
} from './constants';

export function fetchExtractSmallmolecules(extractQuery) {
  return {
    type: FETCH_EXTRACT_SMALLMOLECULES,
    extractQuery,
  };
}

export function setExtractId(extractQuery) {
  return {
    type: SET_EXTRACT_ID,
    extractQuery,
  };
}

export function fetchUniquePeaks(extractQuery) {
  return {
    type: FETCH_UNIQUE_PEAKS,
    extractQuery,
  };
}

export function fetchExtractActivity(extractQuery) {
  return {
    type: FETCH_EXTRACT_ACTIVITY,
    extractQuery,
  };
}

export function fetchExtractMetadata(extractQuery) {
  return {
    type: FETCH_EXTRACT_METADATA,
    extractQuery,
  };
}

export function fetchExtractChemotypes(extractQuery) {
  return {
    type: FETCH_EXTRACT_CHEMOTYPES,
    extractQuery,
  };
}

export function fetchExtractMalariaAssay(extractQuery) {
  return {
    type: FETCH_EXTRACT_MALARIA_ASSAY,
    extractQuery,
  };
}
export function fetchExtractTbAssay(extractQuery) {
  return {
    type: FETCH_EXTRACT_TB_ASSAY,
    extractQuery,
  };
}

export function successExtractActivity(activityData) {
  return {
    type: SUCCESS_EXTRACT_ACTIVITY,
    activityData,
  };
}

export function successExtractMetadata(metaData) {
  return {
    type: SUCCESS_EXTRACT_METADATA,
    metaData,
  };
}

export function successExtractSmallmolecules(smData) {
  return {
    type: SUCCESS_EXTRACT_SMALLMOLECULES,
    smData,
  };
}

export function successUniquePeaks(peakData) {
  return {
    type: SUCCESS_UNIQUE_PEAKS,
    peakData,
  };
}

export function successExtractChemotypes(chemotypeData) {
  return {
    type: SUCCESS_EXTRACT_CHEMOTYPES,
    chemotypeData,
  };
}

export function successExtractMalariaAssay(malariaData) {
  return {
    type: SUCCESS_EXTRACT_MALARIA_ASSAY,
    malariaData,
  };
}
export function successExtractTbAssay(tbData) {
  return {
    type: SUCCESS_EXTRACT_TB_ASSAY,
    tbData,
  };
}

export function failedExtractActivity(err) {
  return {
    type: FAILED_EXTRACT_ACTIVITY,
    err,
  };
}

export function failedExtractMetadata(err) {
  return {
    type: FAILED_EXTRACT_METADATA,
    err,
  };
}

export function failedExtractSmallmolecules(err) {
  return {
    type: FAILED_EXTRACT_SMALLMOLECULES,
    err,
  };
}

export function failedUniquePeaks(err) {
  return {
    type: FAILED_UNIQUE_PEAKS,
    err,
  };
}

export function failedExtractChemotypes(err) {
  return {
    type: FAILED_EXTRACT_CHEMOTYPES,
    err,
  };
}

export function failedExtractMalariaAssay(err) {
  return {
    type: FAILED_EXTRACT_MALARIA_ASSAY,
    err,
  };
}
export function failedExtractTbAssay(err) {
  return {
    type: FAILED_EXTRACT_TB_ASSAY,
    err,
  };
}
