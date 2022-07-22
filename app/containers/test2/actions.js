/* eslint-disable prettier/prettier */
import {
  CREATE_TAXONOMY_NODE,
  SUCCESS_CREATE_TAXONOMY_NODE,
  FAILED_CREATE_TAXONOMY_NODE,
} from './constants';

export function createTaxonomyNodeRequest(taxonomyData) {
  return {
    type: CREATE_TAXONOMY_NODE,
    taxonomyData,
  };
}


export function successCreateTaxonomyNode(taxonomyData) {
  return {
    type: SUCCESS_CREATE_TAXONOMY_NODE,
    taxonomyData,
  };
}

export function failedCreateTaxonomyNode(err) {
  return {
    type: FAILED_CREATE_TAXONOMY_NODE,
    err,
  };
}
