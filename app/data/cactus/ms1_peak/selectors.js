import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMs1PeakDomain = state => state.ms1peak || initialState;

const makeSelectMs2Loading = () =>
  createSelector(
    selectMs1PeakDomain,
    substate => substate.ms2Loading,
  );

const makeSelectMs2Ions = () =>
  createSelector(
    selectMs1PeakDomain,
    substate => substate.ms2IonData,
  );

export { makeSelectMs2Loading, makeSelectMs2Ions };
