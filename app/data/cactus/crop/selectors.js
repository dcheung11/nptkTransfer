import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectCropDomain = state => state.crop || initialState;

const makeSelectCropDetailLoading = () =>
  createSelector(
    selectCropDomain,
    substate => substate.cropDetailLoading,
  );

const makeSelectCropDiseaseLoading = () =>
  createSelector(
    selectCropDomain,
    substate => substate.cropDiseaseLoading,
  );

const makeSelectCropMetagenomicLoading = () =>
  createSelector(
    selectCropDomain,
    substate => substate.cropMetagenomicLoading,
  );

const makeSelectError = () =>
  createSelector(
    selectCropDomain,
    substate => substate.error,
  );

const makeSelectCropDetails = () =>
  createSelector(
    selectCropDomain,
    substate => substate.cropDetails,
  );

const makeSelectDiseaseMetadata = () =>
  createSelector(
    selectCropDomain,
    substate => substate.diseaseMetadata,
  );

const makeSelectCropMetagenomic = () =>
  createSelector(
    selectCropDomain,
    substate => substate.metagenomicDetails,
  );

export default selectCropDomain;
export {
  selectCropDomain,
  makeSelectError,
  makeSelectCropDetailLoading,
  makeSelectCropDetails,
  makeSelectCropDiseaseLoading,
  makeSelectDiseaseMetadata,
  makeSelectCropMetagenomicLoading,
  makeSelectCropMetagenomic,
};
