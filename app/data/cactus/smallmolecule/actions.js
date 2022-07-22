import {
  FETCH_IDENTITY,
  FETCH_SIMILARITY,
  FETCH_SMILES_SUBSTRUCTURES,
  FETCH_SMARTS_SUBSTRUCTURES,
  SUCCESS_IDENTITY,
  SUCCESS_SIMILARITY,
  SUCCESS_SMARTS_SUBSTRUCTURES,
  SUCCESS_SMILES_SUBSTRUCTURES,
  FAILED_IDENTITY,
  FAILED_SIMILARITY,
  FAILED_SMARTS_SUBSTRUCTURES,
  FAILED_SMILES_SUBSTRUCTURES,
  FETCH_SMALLMOLECULE_META,
  FAILED_SMALLMOLECULE_META,
  SUCCESS_SMALLMOLECULE_META,
  FETCH_TARGET_SMALLMOLECULE,
  SUCCESS_TARGET_SMALLMOLECULE,
  FAILED_TARGET_SMALLMOLECULE,
  FETCH_TARGET_NAMES,
  FAILED_TARGET_NAMES,
  SUCCESS_TARGET_NAMES,
  FETCH_SMALLMOLECULE_BY_CATEGORY,
  SUCCESS_SMALLMOLECULE_BY_CATEGORY,
  FAILED_SMALLMOLECULE_BY_CATEGORY,
  FETCH_SMALLMOLECULE_BY_NAME,
  SUCCESS_SMALLMOLECULE_BY_NAME,
  FAILED_SMALLMOLECULE_BY_NAME,
  FETCH_SMALLMOLECULE_VERBOSE,
  SUCCESS_SMALLMOLECULE_VERBOSE,
  FAILED_SMALLMOLECULE_VERBOSE,
} from './constants';

export function fetchTargetNames(queryData) {
  return {
    type: FETCH_TARGET_NAMES,
    queryData,
  };
}

export function successTargetNames(namesData) {
  return {
    type: SUCCESS_TARGET_NAMES,
    namesData,
  };
}

export function failedTargetNames(err) {
  return {
    type: FAILED_TARGET_NAMES,
    err,
  };
}

export function fetchIdentity(smilesData) {
  return {
    type: FETCH_IDENTITY,
    smilesData,
  };
}

export function fetchSimilarity(smilesData) {
  return {
    type: FETCH_SIMILARITY,
    smilesData,
  };
}

export function fetchSmilesSubstructures(smilesData) {
  return {
    type: FETCH_SMILES_SUBSTRUCTURES,
    smilesData,
  };
}

export function fetchSmartsSubstructures(smartsData) {
  return {
    type: FETCH_SMARTS_SUBSTRUCTURES,
    smartsData,
  };
}

export function fetchTargetSmallMolecule(targetData) {
  return {
    type: FETCH_TARGET_SMALLMOLECULE,
    targetData,
  };
}

export function successTargetSmallMolecule(targetHits) {
  return {
    type: SUCCESS_TARGET_SMALLMOLECULE,
    targetHits,
  };
}

export function failedTargetSmallMolecule(err) {
  return {
    type: FAILED_TARGET_SMALLMOLECULE,
    err,
  };
}

export function successIdentity(hitsData) {
  return {
    type: SUCCESS_IDENTITY,
    hitsData,
  };
}

export function successSimilarity(hitsData) {
  return {
    type: SUCCESS_SIMILARITY,
    hitsData,
  };
}

export function successSmilesSubstructures(hitsData) {
  return {
    type: SUCCESS_SMILES_SUBSTRUCTURES,
    hitsData,
  };
}

export function successSmartsSubstructures(hitsData) {
  return {
    type: SUCCESS_SMARTS_SUBSTRUCTURES,
    hitsData,
  };
}

export function failedIdentity(err) {
  return {
    type: FAILED_IDENTITY,
    err,
  };
}

export function failedSimilarity(err) {
  return {
    type: FAILED_SIMILARITY,
    err,
  };
}

export function failedSmilesSubstructures(err) {
  return {
    type: FAILED_SMILES_SUBSTRUCTURES,
    err,
  };
}

export function failedSmartsSubstructures(err) {
  return {
    type: FAILED_SMARTS_SUBSTRUCTURES,
    err,
  };
}

export function fetchSmallmoleculeMeta(smData) {
  return {
    type: FETCH_SMALLMOLECULE_META,
    smData,
  };
}

export function failedSmallmoleculeMeta(err) {
  return {
    type: FAILED_SMALLMOLECULE_META,
    err,
  };
}

export function successSmallmoleculeMeta(meta) {
  return {
    type: SUCCESS_SMALLMOLECULE_META,
    meta,
  };
}

export function fetchSmallmoleculeByCategory(categoryData) {
  return {
    type: FETCH_SMALLMOLECULE_BY_CATEGORY,
    categoryData,
  };
}

export function successSmallmoleculeByCategory(categoryHits) {
  return {
    type: SUCCESS_SMALLMOLECULE_BY_CATEGORY,
    categoryHits,
  };
}

export function failedSmallmoleculeByCategory(err) {
  return {
    type: FAILED_SMALLMOLECULE_BY_CATEGORY,
    err,
  };
}

export function fetchSmallmoleculeByName(namesData) {
  return {
    type: FETCH_SMALLMOLECULE_BY_NAME,
    namesData,
  };
}

export function successSmallmoleculeByName(namesHits) {
  return {
    type: SUCCESS_SMALLMOLECULE_BY_NAME,
    namesHits,
  };
}

export function failedSmallmoleculeByName(err) {
  return {
    type: FAILED_SMALLMOLECULE_BY_NAME,
    err,
  };
}

export function fetchSmallmoleculeVerbose(queryData) {
  return {
    type: FETCH_SMALLMOLECULE_VERBOSE,
    queryData,
  };
}

export function successSmallmoleculeVerbose(metaData) {
  return {
    type: SUCCESS_SMALLMOLECULE_VERBOSE,
    metaData,
  };
}

export function failedSmallmoleculeVerbose(err) {
  return {
    type: FAILED_SMALLMOLECULE_VERBOSE,
    err,
  };
}
