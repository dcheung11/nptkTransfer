import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import {
  FETCH_PRISM_REPORT,
  FETCH_METADATA,
  FETCH_CLUSTERS,
  FETCH_ORFS,
} from './constants';
import {
  failedFetchPrismReport,
  successFetchPrismReport,
  failedFetchMetadata,
  successFetchMetadata,
  failedFetchClusters,
  successFetchClusters,
  failedFetchOrfs,
  successFetchOrfs,
} from './actions';

export function* fetchPrismReport(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/submission/id/${
          data.submissionData.submissionId
        }/prism_result`,
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
    yield put(successFetchPrismReport(response));
  } catch (err) {
    yield put(failedFetchPrismReport(err));
  }
}

export function* fetchMetadata(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/submission/id/${
          data.submissionData.submissionId
        }/summary`,
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
    yield put(successFetchMetadata(response));
  } catch (err) {
    console.log(err);
    yield put(failedFetchMetadata(err));
  }
}

export function* fetchOrfs(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/submission/id/${
          data.submissionData.submissionId
        }/orfs`,
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
    yield put(successFetchOrfs(response));
  } catch (err) {
    console.log(err);
    yield put(failedFetchOrfs(err));
  }
}

export function* fetchClusters(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/submission/id/${
          data.submissionData.submissionId
        }/clusters`,
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
    yield put(successFetchClusters(response));
  } catch (err) {
    console.log(err);
    yield put(failedFetchClusters(err));
  }
}

export default function* submissionSaga() {
  yield all([
    takeLatest(FETCH_PRISM_REPORT, fetchPrismReport),
    takeLatest(FETCH_METADATA, fetchMetadata),
    takeLatest(FETCH_CLUSTERS, fetchClusters),
    takeLatest(FETCH_ORFS, fetchOrfs),
  ]);
}
