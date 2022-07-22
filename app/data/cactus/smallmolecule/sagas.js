import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import request from '../../../utils/request';
import {
  successIdentity,
  successSimilarity,
  successSmartsSubstructures,
  successSmilesSubstructures,
  failedIdentity,
  failedSimilarity,
  failedSmartsSubstructures,
  failedSmilesSubstructures,
  successSmallmoleculeMeta,
  failedSmallmoleculeMeta,
  successTargetSmallMolecule,
  failedTargetSmallMolecule,
  successTargetNames,
  failedTargetNames,
  successSmallmoleculeByCategory,
  failedSmallmoleculeByCategory,
  successSmallmoleculeByName,
  failedSmallmoleculeByName,
  successSmallmoleculeVerbose,
  failedSmallmoleculeVerbose,
} from './actions';
import {
  FETCH_IDENTITY,
  FETCH_SIMILARITY,
  FETCH_SMALLMOLECULE_BY_CATEGORY,
  FETCH_SMALLMOLECULE_BY_NAME,
  FETCH_SMALLMOLECULE_META,
  FETCH_SMALLMOLECULE_VERBOSE,
  FETCH_SMARTS_SUBSTRUCTURES,
  FETCH_SMILES_SUBSTRUCTURES,
  FETCH_TARGET_NAMES,
  FETCH_TARGET_SMALLMOLECULE,
} from './constants';

export function* fetchIdentity(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/get_ecfp6_identity?smiles=${
          data.smilesData.smiles
        }&num_limit=${data.smilesData.numLimit}&num_offset=${
          data.smilesData.numOffset
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.smilesData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successIdentity(response));
  } catch (err) {
    yield put(failedIdentity(err));
  }
}

export function* fetchSimilarity(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/get_fcfp6_similarity?smiles=${
          data.smilesData.smiles
        }&num_limit=${data.smilesData.numLimit}&num_offset=${
          data.smilesData.numOffset
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.smilesData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSimilarity(response));
  } catch (err) {
    yield put(failedSimilarity(err));
  }
}

export function* fetchSmilesSubstructures(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/get_smiles_substructures?smiles=${
          data.smilesData.smiles
        }&num_limit=${data.smilesData.numLimit}&num_offset=${
          data.smilesData.numOffset
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.smilesData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSmilesSubstructures(response));
  } catch (err) {
    yield put(failedSmilesSubstructures(err));
  }
}

export function* fetchSmartsSubstructures(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/get_smarts_substructures?smiles=${
          data.smartsData.smiles
        }&num_limit=${data.smartsData.numLimit}&num_offset=${
          data.smartsData.numOffset
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.smartsData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSmartsSubstructures(response));
  } catch (err) {
    yield put(failedSmartsSubstructures(err));
  }
}

export function* fetchSmallmoleculeMeta(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/id/${
          data.smData.smIds
        }/metadata`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.smData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSmallmoleculeMeta(response));
  } catch (err) {
    yield put(failedSmallmoleculeMeta(err));
  }
}

export function* fetchTargetSmallMolecule(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/target/query?name=in.(${
          data.targetData.targetNames
        })&select=activity(smallmolecule(smallmolecule_id))`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.targetData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successTargetSmallMolecule(response));
  } catch (err) {
    console.log(err);
    yield put(failedTargetSmallMolecule(err));
  }
}

export function* fetchTargetNames(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/target/query?name=ilike.*${
          data.queryData.queryStr
        }*&select=name,target_id`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.queryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successTargetNames(response));
  } catch (err) {
    console.log(err);
    yield put(failedTargetNames(err));
  }
}

export function* fetchSmallmoleculesByCategory(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/activity/query?category=ilike.*${
          data.categoryData.categoryStr
        }*&select=smallmolecule_id&limit=null`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.categoryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSmallmoleculeByCategory(response));
  } catch (err) {
    console.log(err);
    yield put(failedSmallmoleculeByCategory(err));
  }
}

export function* fetchSmallmoleculesByName(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/name_search?search_term=${
          data.namesData.queryStr
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.namesData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSmallmoleculeByName(response));
  } catch (err) {
    console.log(err);
    yield put(failedSmallmoleculeByName(err));
  }
}

export function* fetchSmallmoleculeVerbose(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule/id/${
          data.queryData.smIds
        }/query?select=*,activity(*,%20target(*)),taxonomy_has_smallmolecule(taxonomy(*)),activitycleaned(activity)`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.queryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successSmallmoleculeVerbose(response));
  } catch (err) {
    console.log(err);
    yield put(failedSmallmoleculeVerbose(err));
  }
}

export default function* smallMoleculeSaga() {
  yield all([
    takeEvery(FETCH_SMALLMOLECULE_META, fetchSmallmoleculeMeta),
    takeLatest(FETCH_IDENTITY, fetchIdentity),
    takeLatest(FETCH_SIMILARITY, fetchSimilarity),
    takeLatest(FETCH_SMILES_SUBSTRUCTURES, fetchSmilesSubstructures),
    takeLatest(FETCH_SMARTS_SUBSTRUCTURES, fetchSmartsSubstructures),
    takeEvery(FETCH_TARGET_SMALLMOLECULE, fetchTargetSmallMolecule),
    takeLatest(FETCH_TARGET_NAMES, fetchTargetNames),
    takeLatest(FETCH_SMALLMOLECULE_BY_CATEGORY, fetchSmallmoleculesByCategory),
    takeLatest(FETCH_SMALLMOLECULE_BY_NAME, fetchSmallmoleculesByName),
    takeLatest(FETCH_SMALLMOLECULE_VERBOSE, fetchSmallmoleculeVerbose),
  ]);
}
