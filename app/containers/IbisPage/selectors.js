/**
 * Ibis selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectIbis = state => state.ibis || initialState;

const makeSelectResponse = () =>
  createSelector(
    selectIbis,
    ibisState => ibisState.currentResponse,
  );

const makeSelectInputSequence = () =>
  createSelector(
    selectIbis,
    ibisState => ibisState.inputSeqeunce,
  );

const makeSelectLoadingResults = () =>
  createSelector(
    selectIbis,
    ibisState => ibisState.loading,
  );

export {
  selectIbis,
  makeSelectResponse,
  makeSelectInputSequence,
  makeSelectLoadingResults,
};
