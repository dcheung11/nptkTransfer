import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectTaxonomyLeaderboards = state =>
  state.taxonomyLeaderboards || initialState;

const makeSelectActivityCountsLoading = () =>
  createSelector(
    selectTaxonomyLeaderboards,
    substate => substate.activityCountsLoading,
  );

const makeSelectActivityCounts = () =>
  createSelector(
    selectTaxonomyLeaderboards,
    substate => substate.activityCounts,
  );

const makeSelectExtractCounts = () =>
  createSelector(
    selectTaxonomyLeaderboards,
    substrate => substrate.extractCounts,
  );

const makeSelectExtractCountsLoading = () =>
  createSelector(
    selectTaxonomyLeaderboards,
    substrate => substrate.extractCountsLoading,
  );

export default selectTaxonomyLeaderboards;
export {
  makeSelectActivityCounts,
  makeSelectActivityCountsLoading,
  makeSelectExtractCounts,
  makeSelectExtractCountsLoading,
};
