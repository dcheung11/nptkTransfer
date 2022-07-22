import {
  FETCH_CLUSTER_INTERPRO,
  FETCH_MINHASH_RELATIVES,
  SUCCESS_CLUSTER_INTERPRO,
  SUCCESS_MINHASH_RELATIVES,
  FAILED_CLUSTER_INTERPRO,
  FAILED_MINHASH_RELATIVES,
  FETCH_PRISM_REPORT,
  FAILED_PRISM_FETCH,
  SUCCESSFUL_PRISM_FETCH,
  FETCH_QUINCE_KNOWN,
  FAILED_QUINCE_KNOWN,
  SUCCESSFUL_QUINCE_KNOWN,
  FETCH_CLUSTER_METADATA,
  SUCCESS_CLUSTER_METADATA,
  FAILED_CLUSTER_METADATA,
} from './constants';

export function fetchClusterInterpro(clusterId) {
  return {
    type: FETCH_CLUSTER_INTERPRO,
    clusterId,
  };
}

export function successClusterInterpro(interproData) {
  return {
    type: SUCCESS_CLUSTER_INTERPRO,
    interproData,
  };
}

export function failedClusterInterpro(err) {
  return {
    type: FAILED_CLUSTER_INTERPRO,
    err,
  };
}

export function fetchMinhashRelatives(submissionData) {
  return {
    type: FETCH_MINHASH_RELATIVES,
    submissionData,
  };
}

export function successMinhashRelatives(relatives) {
  return {
    type: SUCCESS_MINHASH_RELATIVES,
    relatives,
  };
}

export function failedMinhashRelatives(err) {
  return {
    type: FAILED_MINHASH_RELATIVES,
    err,
  };
}

export function fetchPrismCluster(submissionData) {
  return {
    type: FETCH_PRISM_REPORT,
    submissionData,
  };
}

export function successFetchPrismCluster(prismData, submissionId) {
  return {
    type: SUCCESSFUL_PRISM_FETCH,
    prismData,
    submissionId,
  };
}

export function failedFetchPrismCluster(error, submissionId) {
  return {
    type: FAILED_PRISM_FETCH,
    error,
    submissionId,
  };
}

export function fetchQuinceKnown(submissionData) {
  return {
    type: FETCH_QUINCE_KNOWN,
    submissionData,
  };
}

export function successFetchQuinceKnown(knownData) {
  return {
    type: SUCCESSFUL_QUINCE_KNOWN,
    knownData,
  };
}

export function failedFetchQuinceKnown(error) {
  return {
    type: FAILED_QUINCE_KNOWN,
    error,
  };
}

export function fetchClusterMetadata(submissionData) {
  return {
    type: FETCH_CLUSTER_METADATA,
    submissionData,
  };
}

export function successClusterMetadata(metadata) {
  return {
    type: SUCCESS_CLUSTER_METADATA,
    metadata,
  };
}

export function failedClusterMetadata(error) {
  return {
    type: FAILED_CLUSTER_METADATA,
    error,
  };
}
