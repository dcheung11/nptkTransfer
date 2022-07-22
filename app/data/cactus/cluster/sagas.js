import request from 'utils/request';
import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
} from '@redux-saga/core/effects';
import {
  FETCH_CLUSTER_INTERPRO,
  FETCH_QUINCE_KNOWN,
  FETCH_MINHASH_RELATIVES,
  FETCH_PRISM_REPORT,
  FETCH_CLUSTER_METADATA,
} from './constants';
import {
  failedClusterInterpro,
  failedMinhashRelatives,
  failedFetchPrismCluster,
  failedFetchQuinceKnown,
  failedClusterMetadata,
  successClusterInterpro,
  successMinhashRelatives,
  successFetchPrismCluster,
  successFetchQuinceKnown,
  successClusterMetadata,
} from './actions';

export function* fetchClusterInterpro(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/cluster/id/${
          data.submissionData.submissionId
        }/get_interpro_domains`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.submissionData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successClusterInterpro(response));
  } catch (err) {
    yield put(failedClusterInterpro(err));
  }
}

export function* fetchMinhashRelatives(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/cluster/id/${
          data.submissionData.submissionId
        }/quince_global?limit=${data.submissionData.limit}&offset=${
          data.submissionData.offset
        }`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.submissionData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successMinhashRelatives(response));
  } catch (err) {
    yield put(failedMinhashRelatives(err));
  }
}

export function* fetchPrismCluster(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/cluster/id/${
          data.submissionData.submissionId
        }/prism_report`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.submissionData.bearerToken}`,
          },
        },
      ),
    );
    yield put(
      successFetchPrismCluster({ response }, data.submissionData.submissionId),
    );
  } catch (err) {
    console.log(err);
    yield put(failedFetchPrismCluster(err, data.submissionData.submissionId));
  }
}

export function* fetchQuinceKnown(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/cluster/id/${
          data.submissionData.submissionId
        }/quince_local?cutoff=${data.submissionData.similarityCutoff}&limit=${
          data.submissionData.limit
        }&offset=${data.submissionData.offset}`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.submissionData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successFetchQuinceKnown(response));
  } catch (err) {
    yield put(failedFetchQuinceKnown(err));
  }
}

export function* fetchClusterMetadata(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/cluster/id/${
          data.submissionData.submissionId
        }/metadata`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.submissionData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successClusterMetadata(response));
  } catch (err) {
    yield put(failedClusterMetadata(err));
  }
}

export default function* clusterSaga() {
  yield all([
    takeEvery(FETCH_PRISM_REPORT, fetchPrismCluster),
    takeLatest(FETCH_QUINCE_KNOWN, fetchQuinceKnown),
    takeLatest(FETCH_MINHASH_RELATIVES, fetchMinhashRelatives),
    takeLatest(FETCH_CLUSTER_INTERPRO, fetchClusterInterpro),
    takeLatest(FETCH_CLUSTER_METADATA, fetchClusterMetadata),
  ]);
}
