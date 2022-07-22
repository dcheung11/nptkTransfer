import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExtractDomain = state => state.extract || initialState;

const makeSelectMetadataLoading = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.metadataLoading,
  );

const makeSelectUniquePeaksLoading = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.uniquePeaksLoading,
  );

const makeSelectSmallMoleculesLoading = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.smallMoleculesLoading,
  );

const makeSelectActivityLoading = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.activityLoading,
  );

const makeSelectChemotypeLoading = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.chemotypeLoading,
  );

const makeSelectUniquePeaks = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.uniquePeaks,
  );

const makeSelectExtractUniquePeaks = extractId =>
  createSelector(
    selectExtractDomain,
    substate => substate.uniquePeaks[extractId],
  );

const makeSelectSmallMolecules = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.smallMolecules,
  );

const makeSelectExtractSmallMolecules = extractId =>
  createSelector(
    selectExtractDomain,
    substate => substate.smallMolecules[extractId],
  );

const makeSelectActivity = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.activities,
  );

const makeSelectMetadata = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.metadata,
  );

const makeSelectExtractMetadata = extractId =>
  createSelector(
    selectExtractDomain,
    substate => substate.metadata[extractId],
  );

const makeSelectChemotypes = () =>
  createSelector(
    selectExtractDomain,
    substate => substate.chemotypes,
  );

const makeSelectExtractChemotypes = extractId =>
  createSelector(
    selectExtractDomain,
    substate => substate.chemotypes[extractId],
  );

const makeSelectExtractMalariaAssay = extractId =>
  createSelector(
    selectExtractDomain,
    substate => substate.malariaData,
  );

const makeSelectExtractTbAssay = extractId =>
  createSelector(
    selectExtractDomain,
    substate => substate.tbData,
  );

export default selectExtractDomain;

export {
  makeSelectActivity,
  makeSelectActivityLoading,
  makeSelectMetadata,
  makeSelectMetadataLoading,
  makeSelectSmallMolecules,
  makeSelectSmallMoleculesLoading,
  makeSelectUniquePeaks,
  makeSelectUniquePeaksLoading,
  makeSelectChemotypes,
  makeSelectChemotypeLoading,
  makeSelectExtractUniquePeaks,
  makeSelectExtractSmallMolecules,
  makeSelectExtractChemotypes,
  makeSelectExtractMetadata,
  makeSelectExtractMalariaAssay,
  makeSelectExtractTbAssay,
};
