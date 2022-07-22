import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/request';
import {
  successCropDetails,
  successCropDisease,
  failedCropDetails,
  failedCropDisease,
  successCropMetagenomic,
  failedCropMetagenomic,
} from './actions';
import {
  FETCH_CROP_DETAILS,
  FETCH_CROP_DISEASE,
  FETCH_CROP_METAGENOMIC_SAMPLES,
} from './constants';

export function* fetchCropDetails(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/crop/id/${
          data.cropQueryData.cropId
        }/query`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.cropQueryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successCropDetails(response));
  } catch (err) {
    console.log(err);
    yield put(failedCropDetails(err));
  }
}

export function* fetchCropDisease(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/crop/id/${
          data.cropDiseaseQueryData.cropId
        }/diseases`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.cropDiseaseQueryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successCropDisease(response));
  } catch (err) {
    console.log(err);
    yield put(failedCropDisease(err));
  }
}

export function* fetchCropMetagenomic(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/crop/id/${
          data.cropMetagenomicQueryData.cropId
        }/metagenomic_samples`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.cropMetagenomicQueryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successCropMetagenomic(response));
  } catch (err) {
    console.log(err);
    yield put(failedCropMetagenomic(err));
  }
}

export default function* cropSaga() {
  yield all([
    takeLatest(FETCH_CROP_DETAILS, fetchCropDetails),
    takeLatest(FETCH_CROP_DISEASE, fetchCropDisease),
    takeLatest(FETCH_CROP_METAGENOMIC_SAMPLES, fetchCropMetagenomic),
  ]);
}
