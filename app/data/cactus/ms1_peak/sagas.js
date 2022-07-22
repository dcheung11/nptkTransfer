import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/request';
import { successMs2Ions, failedMs2Ions } from './actions';
import { FETCH_MS2_IONS } from './constants';

export function* fetchMs2Ions(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/ms1_peak/id/${
          data.queryData.ms1PeakId
        }/query?select=ms2_ion(*)`,
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
    yield put(successMs2Ions(response));
  } catch (err) {
    console.log(err);
    yield put(failedMs2Ions(err));
  }
}

export default function* ms1Saga() {
  yield all([takeLatest(FETCH_MS2_IONS, fetchMs2Ions)]);
}
