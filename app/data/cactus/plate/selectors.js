import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectPlateDomain = state => state.plate || initialState;

const makeSelectPlateLoading = () =>
  createSelector(
    selectPlateDomain,
    substate => substate.plateLoading,
  );

const makeSelectPlate = () =>
  createSelector(
    selectPlateDomain,
    substate => substate.plate,
  );

const makeSelectAllPlateInfo = () =>
  createSelector(
    selectPlateDomain,
    substate => substate.allPlateInfo,
  );

const makeSelectAllPlateLoading = () =>
  createSelector(
    selectPlateDomain,
    substate => substate.allPlateLoading,
  );

export default selectPlateDomain;
export {
  makeSelectPlateLoading,
  makeSelectPlate,
  makeSelectAllPlateInfo,
  makeSelectAllPlateLoading,
};
