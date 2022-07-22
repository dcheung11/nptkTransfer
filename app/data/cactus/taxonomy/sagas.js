/* eslint-disable no-console */
import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import {
  AJAX_NAME_SEARCH,
  FETCH_CHILDREN_STATS,
  FETCH_TAXONOMY,
  FETCH_TAX_MOLECULES,
  FETCH_PARENT_STATS,
  FETCH_CULTURE_EXTRACTS,
  FETCH_GENOME_STATS,
  FETCH_METABOLOGENOMIC,
  FETCH_INHOUSE,
} from './constants';
import {
  failedFetchTaxonomy,
  failedNameSearch,
  successFetchTaxonomy,
  successNameSearch,
  failedChildren,
  successChildren,
  successTaxMolecules,
  failedTaxMolecules,
  successParentStats,
  failedParentStats,
  successCultureExtracts,
  failedCultureExtracts,
  failedGenomeStats,
  successGenomeStats,
  failedMetabologenomic,
  successMetabologenomic,
  successCreateTaxonomyNode,
  failedCreateTaxonomyNode,
  successInhouse,
  failedInhouse,
} from './actions';

export function* fetchTaxonomyNames(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/query?name=ilike.${
          data.nameSearch.nameStr
        }*&select=path,taxonomy_id,rank`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.nameSearch.bearerToken}`,
          },
        },
      ),
    );
    yield put(successNameSearch(response));
  } catch (err) {
    yield put(failedNameSearch(err.toString()));
  }
}

export function* fetchTaxonomy(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/id/${
          data.taxonomyData.taxonomyId
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successFetchTaxonomy(response));
  } catch (err) {
    console.log(`Fetching Taxonomy Error: ${err}`);
    yield put(failedFetchTaxonomy(err));
  }
}

export function* fetchTaxonomyChildren(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/id/${
          data.taxonomyData.taxonomyId
        }/children`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successChildren(response));
  } catch (err) {
    console.log(`Fetching Taxonomy Children Error: ${err}`);
    yield put(failedChildren(err.toString()));
  }
}

export function* fetchTaxonomyParents(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/id/${
          data.taxonomyData.taxonomyId
        }/parents`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successParentStats(response));
  } catch (err) {
    console.log(`Fetching Taxonomy Parents Error: ${err}`);
    yield put(failedParentStats(err.toString()));
  }
}

export function* fetchTaxonomyMolecules(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/id/${
          data.taxonomyData.taxonomyId
        }/smallmolecule`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successTaxMolecules(response));
  } catch (err) {
    console.log(`Fetching Taxonomy Small Molecules Error: ${err}`);
    yield put(failedTaxMolecules(err.toString()));
  }
}

export function* fetchTaxonomyCultureExtracts(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/query?select=culture(*,user_details(first_name,%20initials),culture_medium(name),experiment_class(name),extract(*,user_details(first_name,initials),%20extract_extraction_method(name),extract_extraction_solvent(name)))&taxonomy_id=eq.${
          data.taxonomyData.taxonomyId
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successCultureExtracts(response));
  } catch (err) {
    console.log(`Fetching Taxonomy Culture and Extracts Error: ${err}`);
    yield put(failedCultureExtracts(err.toString()));
  }
}
export function* fetchTaxonomyGenomes(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/id/${
          data.taxonomyData.taxonomyId
        }/genomes`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successGenomeStats(response));
  } catch (err) {
    console.log(`Fetching Taxonomy Genomes and threw error ${err}`);
    yield put(failedGenomeStats(err.toString()));
  }
}

export function* fetchMetabologenomicHits(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule_analog_families/query?taxonomy_id=eq.${
          data.taxonomyData.taxonomyId
        }&select=*,smallmolecule(*),novel_analogs(*,maple_peaks_table(self_peaks_table(extract_id,ms1_peak(mz,monoisotopic_mass,rt,intensity_raw)))),smallmolecule_analog_members(*,smallmolecule(*)),smallmolecule_analog_metabolomic(*,maple_peaks_table(self_peaks_table(*))),smallmolecule_analog_genomic(*)`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successMetabologenomic(response));
  } catch (err) {
    console.log(`Fetching Metabologenomic data and threw error ${err}`);
    yield put(failedMetabologenomic(err.toString()));
  }
}

export function* createTaxonomyNode(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/taxonomy`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          parent_taxonomy_id: data.parent_taxonomyId,
          rank: data.rank,
          name: data.name,
        }),
      }),
    );
    yield put(successCreateTaxonomyNode(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateTaxonomyNode(err));
  }
}

export function* fetchInhouseData(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/taxonomy/taxonomy_inhouse_plot`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.taxonomyData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successInhouse(response));
  } catch (err) {
    console.log(`Fetching inhouse data and threw error ${err}`);
    yield put(failedInhouse(err.toString()));
  }
}

export default function* taxonomySaga() {
  yield all([
    takeLatest(FETCH_TAXONOMY, fetchTaxonomy),
    takeLatest(AJAX_NAME_SEARCH, fetchTaxonomyNames),
    takeLatest(FETCH_CHILDREN_STATS, fetchTaxonomyChildren),
    takeLatest(FETCH_TAX_MOLECULES, fetchTaxonomyMolecules),
    takeLatest(FETCH_PARENT_STATS, fetchTaxonomyParents),
    takeLatest(FETCH_CULTURE_EXTRACTS, fetchTaxonomyCultureExtracts),
    takeLatest(FETCH_GENOME_STATS, fetchTaxonomyGenomes),
    takeLatest(FETCH_METABOLOGENOMIC, fetchMetabologenomicHits),
    takeLatest(FETCH_INHOUSE, fetchInhouseData),
  ]);
}
