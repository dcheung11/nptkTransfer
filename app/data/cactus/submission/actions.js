import {
  FETCH_PRISM_REPORT,
  FAILED_PRISM_FETCH,
  SUCCESSFUL_PRISM_FETCH,
  FETCH_METADATA,
  FAILED_METADATA,
  SUCCESSFUL_METADATA,
  FETCH_CLUSTERS,
  SUCCESSFUL_CLUSTERS,
  FAILED_CLUSTERS,
  FETCH_ORFS,
  SUCCESSFUL_ORFS,
  FAILED_ORFS,
} from './constants';

export function fetchPrismReport(submissionData) {
  return {
    type: FETCH_PRISM_REPORT,
    submissionData,
  };
}

export function successFetchPrismReport(prismResult) {
  return {
    type: SUCCESSFUL_PRISM_FETCH,
    prismResult,
  };
}

export function failedFetchPrismReport(error) {
  return {
    type: FAILED_PRISM_FETCH,
    error,
  };
}

export function fetchMetadata(submissionData) {
  return {
    type: FETCH_METADATA,
    submissionData,
  };
}

export function successFetchMetadata(metadata) {
  return {
    type: SUCCESSFUL_METADATA,
    metadata,
  };
}

export function failedFetchMetadata(error) {
  return {
    type: FAILED_METADATA,
    error,
  };
}

export function fetchClusters(submissionData) {
  return {
    type: FETCH_CLUSTERS,
    submissionData,
  };
}

export function successFetchClusters(clusters) {
  return {
    type: SUCCESSFUL_CLUSTERS,
    clusters,
  };
}

export function failedFetchClusters(error) {
  return {
    type: FAILED_CLUSTERS,
    error,
  };
}

export function fetchOrfs(submissionData) {
  return {
    type: FETCH_ORFS,
    submissionData,
  };
}

export function successFetchOrfs(orfs) {
  return {
    type: SUCCESSFUL_ORFS,
    orfs,
  };
}

export function failedFetchOrfs(error) {
  return {
    type: FAILED_ORFS,
    error,
  };
}
