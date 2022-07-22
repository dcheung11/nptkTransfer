import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import { isNumeric } from '../../../utils/texthelper';
import request from '../../../utils/request';
import {
  successExtractActivity,
  successExtractMetadata,
  successExtractSmallmolecules,
  successUniquePeaks,
  failedExtractActivity,
  failedExtractMetadata,
  failedExtractSmallmolecules,
  failedUniquePeaks,
  successExtractChemotypes,
  failedExtractChemotypes,
  successExtractMalariaAssay,
  failedExtractMalariaAssay,
  failedExtractTbAssay,
  successExtractTbAssay,
} from './actions';
import {
  FETCH_EXTRACT_METADATA,
  FETCH_EXTRACT_ACTIVITY,
  FETCH_UNIQUE_PEAKS,
  FETCH_EXTRACT_SMALLMOLECULES,
  FETCH_EXTRACT_CHEMOTYPES,
  FETCH_EXTRACT_MALARIA_ASSAY,
  FETCH_EXTRACT_TB_ASSAY,
} from './constants';

export function* fetchExtractMetadata(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/query?select=culture(culture_has_strain(*),extract(*,extract_extraction_method(*),extract_extraction_solvent(*)))`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    const metaData = {};
    metaData[queryId] = response;
    yield put(successExtractMetadata(metaData));
  } catch (err) {
    console.log(err);
    yield put(failedExtractMetadata(err));
  }
}

export function* fetchExtractActivity(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/activities`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    const activityData = {};
    activityData[queryId] = response;
    yield put(successExtractActivity(activityData));
  } catch (err) {
    console.log(err);
    yield put(failedExtractActivity(err));
  }
}

export function* fetchUniquePeaks(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/get_unique_maple_peaks`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    const peakData = {};
    peakData[queryId] = response;
    yield put(successUniquePeaks(peakData));
  } catch (err) {
    console.log(err);
    yield put(failedUniquePeaks(err));
  }
}

export function* fetchExtractSmallMolecules(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/extract_confident_smallmolecules`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    const smData = {};
    smData[queryId] = response;
    yield put(successExtractSmallmolecules(smData));
  } catch (err) {
    console.log(err);
    yield put(failedExtractSmallmolecules(err));
  }
}

export function* fetchExtractChemotypes(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/get_clean_plume_chemotype`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    yield put(successExtractChemotypes(response));
  } catch (err) {
    console.log(err);
    yield put(failedExtractChemotypes(err));
  }
}

export function* fetchMalariaAssayData(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/query?select=malaria_assay(*)`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    yield put(successExtractMalariaAssay(response));
  } catch (err) {
    console.log(err);
    yield put(failedExtractMalariaAssay(err));
  }
}

export function* fetchTbAssayData(data) {
  try {
    const queryId = data.extractQuery.extractId;
    if (!isNumeric(queryId)) {
      // eslint-disable-next-line no-throw-literal
      throw 'Parameter is not a number!';
    }
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/id/${queryId}/query?select=tb_assay(*)`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.extractQuery.bearerToken}`,
          },
        },
      ),
    );
    yield put(successExtractTbAssay(response));
  } catch (err) {
    console.log(err);
    yield put(failedExtractTbAssay(err));
  }
}

export default function* extractSaga() {
  yield all([
    takeEvery(FETCH_EXTRACT_METADATA, fetchExtractMetadata),
    takeEvery(FETCH_EXTRACT_ACTIVITY, fetchExtractActivity),
    takeEvery(FETCH_UNIQUE_PEAKS, fetchUniquePeaks),
    takeEvery(FETCH_EXTRACT_SMALLMOLECULES, fetchExtractSmallMolecules),
    takeEvery(FETCH_EXTRACT_CHEMOTYPES, fetchExtractChemotypes),
    takeEvery(FETCH_EXTRACT_MALARIA_ASSAY, fetchMalariaAssayData),
    takeEvery(FETCH_EXTRACT_TB_ASSAY, fetchTbAssayData),
  ]);
}
