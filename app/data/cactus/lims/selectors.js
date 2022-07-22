import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectLimsDomain = state => state.lims || initialState;

const makeSelectExperimentalClassLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.experimentalClassLoading,
  );

const makeSelectExperimentalClass = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.experimentalClass,
  );

const makeSelectCultureMediumLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.mediumLoading,
  );

const makeSelectCultureMedium = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.medium,
  );

const makeSelectOrganizationIds = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.organizationIds,
  );

const makeSelectOrganizationIdsLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.organizationIdsLoading,
  );

const makeSelectExtractionMethods = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.extractionMethods,
  );

const makeSelectExtractionMethodLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.extractionMethodLoading,
  );

const makeSelectSolvents = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.solvents,
  );

const makeSelectSolventLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.solventLoading,
  );

const makeSelectMe = () =>
  createSelector(
    selectLimsDomain,
    substrate => substrate.me,
  );

const makeSelectFetchMeLoading = () =>
  createSelector(
    selectLimsDomain,
    substrate => substrate.fetchMeLoading,
  );

const makeSelectCreateExtractLoading = () =>
  createSelector(
    selectLimsDomain,
    substrate => substrate.createExtractLoading,
  );

const makeSelectCreatedExtract = () =>
  createSelector(
    selectLimsDomain,
    substrate => substrate.createdExtract,
  );

const makeSelectCreateExperimentalClassLoading = () =>
  createSelector(
    selectLimsDomain,
    substrate => substrate.createExperimentalClassLoading,
  );

const makeSelectCreatedExperimentalClass = () =>
  createSelector(
    selectLimsDomain,
    substrate => substrate.createdExperimentalClass,
  );

const makeSelectCreateMediaTypeLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createMediaTypeLoading,
  );

const makeSelectCreatedMediaType = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createdMediaType,
  );

const makeSelectCreateOrganizationLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createOrganizationLoading,
  );

const makeSelectCreatedOrganization = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createdOrganization,
  );

const makeSelectCreateExtractionSolventLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createExtractionSolventLoading,
  );

const makeSelectCreatedExtractionSolvent = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createdExtractionSolvent,
  );

const makeSelectCreateExtractionMethodLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createExtractionMethodLoading,
  );

const makeSelectCreatedExtractionMethod = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createdExtractionMethod,
  );

const makeSelectCreateCultureLoading = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createCultureLoading,
  );

const makeSelectCreatedCulture = () =>
  createSelector(
    selectLimsDomain,
    substate => substate.createdCulture,
  );

export default selectLimsDomain;
export {
  makeSelectCultureMedium,
  makeSelectCultureMediumLoading,
  makeSelectExperimentalClass,
  makeSelectExperimentalClassLoading,
  makeSelectOrganizationIds,
  makeSelectOrganizationIdsLoading,
  makeSelectExtractionMethodLoading,
  makeSelectExtractionMethods,
  makeSelectSolventLoading,
  makeSelectSolvents,
  makeSelectFetchMeLoading,
  makeSelectMe,
  makeSelectCreateExtractLoading,
  makeSelectCreatedExtract,
  makeSelectCreateExperimentalClassLoading,
  makeSelectCreatedExperimentalClass,
  makeSelectCreateMediaTypeLoading,
  makeSelectCreatedMediaType,
  makeSelectCreateOrganizationLoading,
  makeSelectCreatedOrganization,
  makeSelectCreateExtractionSolventLoading,
  makeSelectCreatedExtractionSolvent,
  makeSelectCreateExtractionMethodLoading,
  makeSelectCreatedExtractionMethod,
  makeSelectCreateCultureLoading,
  makeSelectCreatedCulture,
};
