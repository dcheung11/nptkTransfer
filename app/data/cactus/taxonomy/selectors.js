import { createSelector } from 'reselect';
import { initialState } from './reducers';
import { taxToTree } from './transformers';
/**
 * Direct selector to the taxonomy state domain
 */

const selectTaxonomyDomain = state => state.taxonomy || initialState;

/**
 * Other specific selectors
 */

const makeSelectTaxonomyLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyLoading,
  );

const makeSelectAjaxLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.ajaxLoading,
  );

const makeSelectChildLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.childLoading,
  );

const makeSelectParentLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.parentLoading,
  );

const makeSelectTaxonomyId = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyData.taxonomy_id,
  );

const makeSelectQueryId = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.queryId,
  );

const makeSelectError = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.error,
  );

const makeSelectName = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyData.name,
  );

const makeSelectNcbiId = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyData.ncbi_id,
  );

const makeSelectPath = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyData.path,
  );

const makeSelectRank = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyData.rank,
  );

const makeSelectTax = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.taxonomyData.tax,
  );

const makeSelectNames = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.names,
  );

const makeSelectTaxTree = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => taxToTree(substate.taxonomyData.tax),
  );

const makeSelectChildNodes = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.childNodes,
  );

const makeSelectParentNodes = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.parentNodes,
  );

const makeSelectTaxMolecules = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.smallMolecules,
  );

const makeSelectMolLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.molLoading,
  );

const makeSelectCultureLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substrate => substrate.cultureLoading,
  );

const makeSelectCultureExtracts = () =>
  createSelector(
    selectTaxonomyDomain,
    substrate => substrate.cultures,
  );

const makeSelectGenomeLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.genomeLoading,
  );

const makeSelectGenomeStats = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.genomeStats,
  );

const makeSelectMetabologenomicLoading = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.metabologenomicData.metabologenomicLoading,
  );

const makeSelectMetabologenomicHits = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate.metabologenomicData.metabologenomicHits,
  );

/*
 * Default selector used by Taxonomy
 */

const makeSelectTaxonomyDomain = () =>
  createSelector(
    selectTaxonomyDomain,
    substate => substate,
  );

export default makeSelectTaxonomyDomain;
export {
  selectTaxonomyDomain,
  makeSelectAjaxLoading,
  makeSelectTaxonomyLoading,
  makeSelectChildLoading,
  makeSelectParentLoading,
  makeSelectTaxonomyId,
  makeSelectQueryId,
  makeSelectError,
  makeSelectName,
  makeSelectNcbiId,
  makeSelectPath,
  makeSelectRank,
  makeSelectTax,
  makeSelectNames,
  makeSelectTaxTree,
  makeSelectChildNodes,
  makeSelectParentNodes,
  makeSelectTaxMolecules,
  makeSelectMolLoading,
  makeSelectCultureLoading,
  makeSelectCultureExtracts,
  makeSelectGenomeLoading,
  makeSelectGenomeStats,
  makeSelectMetabologenomicLoading,
  makeSelectMetabologenomicHits,
};
