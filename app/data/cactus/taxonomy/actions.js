/* eslint-disable prettier/prettier */
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
  FETCH_GENOME_STATS,
  SUCCESS_GENOME_STATS,
  FAILED_GENOME_STATS,
  FAILED_METABOLOGENOMIC,
  FETCH_METABOLOGENOMIC,
  SUCCESS_METABOLOGENOMIC,
  CREATE_TAXONOMY_NODE,
  SUCCESS_CREATE_TAXONOMY_NODE,
  FAILED_CREATE_TAXONOMY_NODE,
  FETCH_INHOUSE,
  SUCCESS_INHOUSE,
  FAILED_INHOUSE
} from './constants';

/* Used by React App via Dispatch to trigger Saga */

export function fetchMetabologenomic(taxonomyData) {
  return {
    type: FETCH_METABOLOGENOMIC,
    taxonomyData,
  };
}

export function successMetabologenomic(hitData) {
  return {
    type: SUCCESS_METABOLOGENOMIC,
    hitData,
  };
}

export function failedMetabologenomic(err) {
  return {
    type: FAILED_METABOLOGENOMIC,
    err,
  };
}

export function fetchTaxonomy(taxonomyData) {
  return {
    type: FETCH_TAXONOMY,
    taxonomyData,
  };
}

export function ajaxNameSearch(nameSearch) {
  return {
    type: AJAX_NAME_SEARCH,
    nameSearch,
  };
}

export function fetchChildren(taxonomyData) {
  return {
    type: FETCH_CHILDREN_STATS,
    taxonomyData,
  };
}

/* Used by the Sagas to access update Redux state with error/data */
export function successFetchTaxonomy(taxonomyData) {
  return {
    type: SUCCESS_FETCH_TAXONOMY,
    taxonomyData,
  };
}

export function failedFetchTaxonomy(err) {
  return {
    type: FAILED_FETCH_TAXONOMY,
    err,
  };
}

export function successNameSearch(names) {
  return {
    type: SUCCESS_NAME_SEARCH,
    names,
  };
}

export function failedNameSearch(err) {
  return {
    type: FAILED_NAME_SEARCH,
    err,
  };
}

export function successChildren(taxonomyData) {
  return {
    type: SUCCESS_CHILDREN_STATS,
    taxonomyData,
  };
}

export function failedChildren(err) {
  return {
    type: FAILED_CHILDREN_STATS,
    err,
  };
}

export function fetchTaxMolecules(taxonomyData) {
  return {
    type: FETCH_TAX_MOLECULES,
    taxonomyData,
  };
}

export function successTaxMolecules(smData) {
  return {
    type: SUCCESS_TAX_MOLECULES,
    smData,
  };
}

export function failedTaxMolecules(err) {
  return {
    type: FAILED_TAX_MOLECULES,
    err,
  };
}

export function fetchParentStats(taxonomyData) {
  return {
    type: FETCH_PARENT_STATS,
    taxonomyData,
  };
}

export function successParentStats(taxonomyData) {
  return {
    type: SUCCESS_PARENT_STATS,
    taxonomyData,
  };
}

export function failedParentStats(err) {
  return {
    type: FAILED_PARENT_STATS,
    err,
  };
}

export function fetchCultureExtracts(taxonomyData) {
  return {
    type: FETCH_CULTURE_EXTRACTS,
    taxonomyData,
  };
}

export function successCultureExtracts(taxonomyData) {
  return {
    type: SUCCESS_CULTURE_EXTRACTS,
    taxonomyData,
  };
}

export function failedCultureExtracts(err) {
  return {
    type: FAILED_CULTURE_EXTRACTS,
    err,
  };
}

export function fetchGenomeStats(taxonomyData) {
  return {
    type: FETCH_GENOME_STATS,
    taxonomyData,
  };
}

export function successGenomeStats(taxonomyData) {
  return {
    type: SUCCESS_GENOME_STATS,
    taxonomyData,
  };
}

export function failedGenomeStats(err) {
  return {
    type: FAILED_GENOME_STATS,
    err,
  };
}


export function createTaxonomyNode(taxonomyData) {
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

export function fetchInhouseData(taxonomyData) {
  return {
    type: FETCH_INHOUSE,
    taxonomyData,
  };
}

export function successInhouse(taxonomyData) {
  return {
    type: SUCCESS_INHOUSE,
    taxonomyData,
  };
}

export function failedInhouse(err) {
  return {
    type: FAILED_INHOUSE,
    err,
  };
}
