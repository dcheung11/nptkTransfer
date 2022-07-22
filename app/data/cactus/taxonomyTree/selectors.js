import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Other specific selectors
 */

const selectInhouseDomain = state => state.inhouseData || initialState;

const makeSelectInhouseLoading = () =>
  createSelector(
    selectInhouseDomain,
    substate => substate.loading,
  );

const makeSelectInhouseHits = () =>
  createSelector(
    selectInhouseDomain,
    substate => substate.inhouseData,
  );

/*
 * Default selector used by Taxonomy
 */

export { makeSelectInhouseHits, makeSelectInhouseLoading };
