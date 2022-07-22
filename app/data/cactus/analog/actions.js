import {
  FETCH_SMALL_MOLECULES,
  FETCH_EXTRACTS_AND_METADATA,
  FAILED_EXTRACTS_AND_METADATA,
  SUCCESS_EXTRACTS_AND_METADATA,
  FAILED_SMALL_MOLECULES,
  SUCCESS_SMALL_MOLECULES,
} from './constants';

export function fetchExtractAndMetadata(analogData) {
  return {
    type: FETCH_EXTRACTS_AND_METADATA,
    analogData,
  };
}

export function SmallMoleculeData(analogData) {
  return {
    type: FETCH_SMALL_MOLECULES,
    analogData,
  };
}

export function failedExtractAndMetadata(err) {
  return {
    type: FAILED_EXTRACTS_AND_METADATA,
    err,
  };
}

export function failedSmallMoleculeData(err) {
  return {
    type: FAILED_SMALL_MOLECULES,
    err,
  };
}

export function successExtractAndMetadata(extractData) {
  return {
    type: SUCCESS_EXTRACTS_AND_METADATA,
    extractData,
  };
}

export function successSmallMoleculeData(smallMoleculeData) {
  return {
    type: SUCCESS_SMALL_MOLECULES,
    smallMoleculeData,
  };
}
