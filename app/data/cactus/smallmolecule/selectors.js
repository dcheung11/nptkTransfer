import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the smallmolecule state domain
 */

const selectSmallmoleculeDomain = state => state.smallmolecule || initialState;

const makeSelectIdentityLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.identityLoading,
  );

const makeSelectSimilarityLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.similarityLoading,
  );

const makeSelectSubstructureLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.substructureLoading,
  );

const makeSelectMetadataLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.metadataLoading,
  );

const makeSelectMetadata = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.metadata,
  );

const makeSelectSmidMetadata = smId =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.metadata[smId],
  );

const makeSelectIdentity = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.identity,
  );

const makeSelectSimilarity = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.similarity,
  );

const makeSelectSubstructures = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.substructures,
  );

const makeSelectError = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.error,
  );

const makeSelectTargetNames = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.targetNames,
  );

const makeSelectTargetNamesLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.targetNamesLoading,
  );

const makeSelectTargetSmallMolecule = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.targetHits,
  );

const makeSelectTargetSmallMoleculeLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.targetLoading,
  );

const makeSelectNameSmallmoleculeLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.nameSmallmoleculeLoading,
  );

const makeSelectNameSmallmolecule = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.nameHits,
  );

const makeSelectCategorySmallmoleculeLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.categorySmallmoleculeLoading,
  );

const makeSelectCategorySmallmolecule = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.categoryHits,
  );

const makeSelectVerboseLoading = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.verboseLoading,
  );

const makeSelectVerbose = () =>
  createSelector(
    selectSmallmoleculeDomain,
    substate => substate.verbose,
  );

export default selectSmallmoleculeDomain;
export {
  selectSmallmoleculeDomain,
  makeSelectMetadata,
  makeSelectMetadataLoading,
  makeSelectError,
  makeSelectIdentity,
  makeSelectIdentityLoading,
  makeSelectSimilarity,
  makeSelectSimilarityLoading,
  makeSelectSubstructureLoading,
  makeSelectSubstructures,
  makeSelectTargetNames,
  makeSelectTargetNamesLoading,
  makeSelectTargetSmallMolecule,
  makeSelectTargetSmallMoleculeLoading,
  makeSelectCategorySmallmolecule,
  makeSelectCategorySmallmoleculeLoading,
  makeSelectNameSmallmolecule,
  makeSelectNameSmallmoleculeLoading,
  makeSelectSmidMetadata,
  makeSelectVerboseLoading,
  makeSelectVerbose,
};
