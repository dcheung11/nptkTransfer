import {
  COUNT_CLUSTERS,
  COUNT_EXTRACTS,
  COUNT_SM_MOLECULES,
  COUNT_SUBMISSIONS,
  SUCCESSFUL_COUNT_CLUSTERS,
  SUCCESSFUL_COUNT_SM_MOLECULES,
  SUCCESSFUL_COUNT_EXTRACTS,
  SUCCESSFUL_COUNT_SUBMISSIONS,
  FAILED_COUNT_CLUSTERS,
  FAILED_COUNT_EXTRACTS,
  FAILED_COUNT_SM_MOLECULES,
  FAILED_COUNT_SUBMISSIONS,
} from './constants';

export function countClusters() {
  return {
    type: COUNT_CLUSTERS,
  };
}

export function countExtracts() {
  return {
    type: COUNT_EXTRACTS,
  };
}

export function countSmMolecules() {
  return {
    type: COUNT_SM_MOLECULES,
  };
}

export function countSubmissions() {
  return {
    type: COUNT_SUBMISSIONS,
  };
}

export function successCountClusters(countData) {
  return {
    type: SUCCESSFUL_COUNT_CLUSTERS,
    countData,
  };
}

export function successCountExtracts(countData) {
  return {
    type: SUCCESSFUL_COUNT_EXTRACTS,
    countData,
  };
}

export function successCountSmMolecules(countData) {
  return {
    type: SUCCESSFUL_COUNT_SM_MOLECULES,
    countData,
  };
}

export function successCountSubmissions(countData) {
  return {
    type: SUCCESSFUL_COUNT_SUBMISSIONS,
    countData,
  };
}

export function failedCountClusters(err) {
  return {
    type: FAILED_COUNT_CLUSTERS,
    err,
  };
}

export function failedCountExtracts(err) {
  return {
    type: FAILED_COUNT_EXTRACTS,
    err,
  };
}

export function failedCountSmMolecules(err) {
  return {
    type: FAILED_COUNT_SM_MOLECULES,
    err,
  };
}

export function failedCountSubmissions(err) {
  return {
    type: FAILED_COUNT_SUBMISSIONS,
    err,
  };
}
