import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { failedInhouse, successInhouse } from './actions';
import { FETCH_INHOUSE_REQUESTED } from './constants';

const url = `https://cactus.magarveylab.ca/api/taxonomy/taxonomy_inhouse_plot`;

export function* fetchAllInhouse(data) {
  try {
    const response = yield call(() =>
      request(url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Auth0 ${data.inhouseData.bearerToken}`,
        },
      }),
    );
    yield put(successInhouse(response));
  } catch (err) {
    yield put(failedInhouse(err));
  }
}

// import { all } from 'redux-saga/effects';
// import watcherSaga from './handlers';

export default function* rootSaga() {
  yield all([takeLatest(FETCH_INHOUSE_REQUESTED, fetchAllInhouse)]);
}
