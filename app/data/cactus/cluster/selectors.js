import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the submission state domain
 */

const selectClusterDomain = state => state.cluster || initialState;

/**
 * Other specific selectors
 */

const makeSelectPrismLoading = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.prismLoading,
  );

const makeSelectInterproLoading = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.interproLoading,
  );

const makeSelectMetadataLoading = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.metadataLoading,
  );

const makeSelectMinHashLoading = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.minhashLoading,
  );

const makeSelectQuinceKnownLoading = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.quinceKnownLoading,
  );

const makeSelectClusterOrfs = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.clusterOrfs,
  );

const makeSelectMetadata = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.metadata,
  );

const makeSelectRelatives = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.relatives,
  );

const makeSelectKnownData = () =>
  createSelector(
    selectClusterDomain,
    substate => substate.knownData,
  );

const makeSelectClusterPrismLoading = clusterId =>
  createSelector(
    selectClusterDomain,
    substate =>
      substate.report &&
      substate.report[clusterId] &&
      substate.report[clusterId].prismLoading,
  );

const makeSelectClusterPrismOrfs = clusterId =>
  createSelector(
    selectClusterDomain,
    substate =>
      substate.report &&
      substate.report[clusterId] &&
      substate.report[clusterId].orfs,
  );

export default selectClusterDomain;
export {
  selectClusterDomain,
  makeSelectPrismLoading,
  makeSelectInterproLoading,
  makeSelectMinHashLoading,
  makeSelectQuinceKnownLoading,
  makeSelectClusterOrfs,
  makeSelectRelatives,
  makeSelectClusterPrismLoading,
  makeSelectClusterPrismOrfs,
  makeSelectKnownData,
  makeSelectMetadataLoading,
  makeSelectMetadata,
};
