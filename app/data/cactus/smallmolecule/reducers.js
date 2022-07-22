import produce from 'immer';
import {
  FETCH_SMALLMOLECULE_META,
  FETCH_SMARTS_SUBSTRUCTURES,
  FETCH_SMILES_SUBSTRUCTURES,
  FETCH_SIMILARITY,
  FETCH_IDENTITY,
  SUCCESS_SMALLMOLECULE_META,
  SUCCESS_SMARTS_SUBSTRUCTURES,
  SUCCESS_SMILES_SUBSTRUCTURES,
  SUCCESS_SIMILARITY,
  SUCCESS_IDENTITY,
  FAILED_SMALLMOLECULE_META,
  FAILED_SMARTS_SUBSTRUCTURES,
  FAILED_SMILES_SUBSTRUCTURES,
  FAILED_SIMILARITY,
  FAILED_IDENTITY,
  FETCH_TARGET_SMALLMOLECULE,
  SUCCESS_TARGET_SMALLMOLECULE,
  FAILED_TARGET_SMALLMOLECULE,
  FETCH_TARGET_NAMES,
  SUCCESS_TARGET_NAMES,
  FAILED_TARGET_NAMES,
  FETCH_SMALLMOLECULE_BY_NAME,
  FETCH_SMALLMOLECULE_BY_CATEGORY,
  FAILED_SMALLMOLECULE_BY_NAME,
  FAILED_SMALLMOLECULE_BY_CATEGORY,
  SUCCESS_SMALLMOLECULE_BY_NAME,
  SUCCESS_SMALLMOLECULE_BY_CATEGORY,
  SUCCESS_SMALLMOLECULE_VERBOSE,
  FAILED_SMALLMOLECULE_VERBOSE,
  FETCH_SMALLMOLECULE_VERBOSE,
} from './constants';

export const initialState = {
  identityLoading: false,
  similarityLoading: false,
  substructureLoading: false,
  metadataLoading: false,
  targetLoading: false,
  targetNamesLoading: false,
  categoriesLoading: false,
  nameSmallmoleculeLoading: false,
  categorySmallmoleculeLoading: false,
  verboseLoading: false,
  verbose: {},
  metadata: {},
  identity: {},
  similarity: {},
  substructures: {},
  targetHits: [],
  targetNames: [],
  nameHits: [],
  categoryHits: [],
  error: 'null',
};

/* eslint-disable default-case, no-param-reassign */
const smallMoleculeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_IDENTITY:
        draft.identityLoading = true;
        break;
      case FETCH_SIMILARITY:
        draft.similarityLoading = true;
        break;
      case FETCH_SMILES_SUBSTRUCTURES:
        draft.substructureLoading = true;
        break;
      case FETCH_SMARTS_SUBSTRUCTURES:
        draft.substructureLoading = true;
        break;
      case FETCH_SMALLMOLECULE_META:
        draft.metadataLoading = true;
        break;
      case FETCH_TARGET_SMALLMOLECULE:
        draft.targetLoading = true;
        break;
      case FETCH_TARGET_NAMES:
        draft.targetNamesLoading = true;
        break;
      case FETCH_SMALLMOLECULE_BY_NAME:
        draft.nameSmallmoleculeLoading = true;
        break;
      case FETCH_SMALLMOLECULE_BY_CATEGORY:
        draft.categorySmallmoleculeLoading = true;
        break;
      case FETCH_SMALLMOLECULE_VERBOSE:
        draft.verboseLoading = true;
        break;
      case SUCCESS_SMALLMOLECULE_VERBOSE:
        draft.verboseLoading = false;
        draft.verbose = action.metaData;
        break;
      case FAILED_SMALLMOLECULE_VERBOSE:
        draft.verboseLoading = false;
        draft.error = action.err;
        break;
      case SUCCESS_TARGET_NAMES:
        draft.targetNamesLoading = false;
        draft.targetNames = action.namesData;
        break;
      case SUCCESS_IDENTITY:
        draft.identityLoading = false;
        draft.identity = action.hitsData;
        break;
      case SUCCESS_SIMILARITY:
        draft.similarityLoading = false;
        draft.similarity = action.hitsData;
        break;
      case SUCCESS_SMILES_SUBSTRUCTURES:
        draft.substructureLoading = false;
        draft.substructures = action.hitsData;
        break;
      case SUCCESS_SMARTS_SUBSTRUCTURES:
        draft.substructureLoading = false;
        draft.substructures = action.hitsData;
        break;
      case SUCCESS_SMALLMOLECULE_META:
        draft.metadataLoading = false;
        draft.metadata = {
          ...state.metadata,
          ...action.meta,
        };
        break;
      case SUCCESS_TARGET_SMALLMOLECULE:
        draft.targetLoading = false;
        draft.targetHits = action.targetHits;
        break;
      case SUCCESS_SMALLMOLECULE_BY_CATEGORY:
        draft.categorySmallmoleculeLoading = false;
        draft.categoryHits = action.categoryHits;
        break;
      case SUCCESS_SMALLMOLECULE_BY_NAME:
        draft.nameSmallmoleculeLoading = false;
        draft.nameHits = action.namesHits;
        break;
      case FAILED_TARGET_NAMES:
        draft.targetNamesLoading = false;
        draft.error = action.err;
        break;
      case FAILED_IDENTITY:
        draft.identityLoading = false;
        draft.error = action.err;
        break;
      case FAILED_SIMILARITY:
        draft.similarityLoading = false;
        draft.error = action.err;
        break;
      case FAILED_SMILES_SUBSTRUCTURES:
        draft.substructureLoading = false;
        draft.error = action.err;
        break;
      case FAILED_SMARTS_SUBSTRUCTURES:
        draft.substructureLoading = false;
        draft.error = action.err;
        break;
      case FAILED_SMALLMOLECULE_META:
        draft.metadataLoading = false;
        draft.error = action.err;
        break;
      case FAILED_TARGET_SMALLMOLECULE:
        draft.targetLoading = false;
        draft.error = action.err;
        break;
      case FAILED_SMALLMOLECULE_BY_CATEGORY:
        draft.categorySmallmoleculeLoading = false;
        draft.error = action.err;
        break;
      case FAILED_SMALLMOLECULE_BY_NAME:
        draft.nameSmallmoleculeLoading = false;
        draft.error = action.err;
        break;
    }
  });

export default smallMoleculeReducer;
