import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectAnalogDoamin = state => state.analog || initialState;

const makeSelectSmallMoleculeLoading = () =>
  createSelector(
    selectAnalogDoamin,
    substate => substate.smallMoleculesLoading,
  );

const makeSelectExtractAndMetaDataLoading = () =>
  createSelector(
    selectAnalogDoamin,
    substate => substate.extractAndMetaDataLookupLoading,
  );

const makeSelectSmallMoleculeLookup = () =>
  createSelector(
    selectAnalogDoamin,
    substate => substate.smallMoleculeLookup,
  );

const makeSelectExtractAndMetaDataLoookup = () =>
  createSelector(
    selectAnalogDoamin,
    substate => substate.extractAndMetaDataLookup,
  );

const makeSelectError = () =>
  createSelector(
    selectAnalogDoamin,
    substate => substate.error,
  );

export default selectAnalogDoamin;
export {
  selectAnalogDoamin,
  makeSelectError,
  makeSelectExtractAndMetaDataLoading,
  makeSelectExtractAndMetaDataLoookup,
  makeSelectSmallMoleculeLoading,
  makeSelectSmallMoleculeLookup,
};
