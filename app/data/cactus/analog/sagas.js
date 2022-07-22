import request from 'utils/request';
import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
} from '@redux-saga/core/effects';
import { FETCH_EXTRACTS_AND_METADATA } from './constants';
import { successExtractAndMetadata, failedExtractAndMetadata } from './actions';

export function* fetchExtractAndMetadata(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/smallmolecule_analog_families/id/${
          data.analogId
        }/get_metabolites`,
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
    yield put(successExtractAndMetadata(response));
  } catch (err) {
    console.log(err);
    yield put(failedExtractAndMetadata(err));
  }
}

export default function* analogSaga() {
  yield all([takeLatest(FETCH_EXTRACTS_AND_METADATA, fetchExtractAndMetadata)]);
}
