import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { FETCH_USERS } from './constants';
import { failedFetchUsers, successFetchUsers } from './actions';

export function* fetchUsers(data) {
  try {
    const response = yield call(() =>
      request(
        `http://magarveylab-computational.mcmaster.ca:3435/api/user/?format=json`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.userData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successFetchUsers(response));
  } catch (err) {
    yield put(failedFetchUsers(err));
  }
}

export default function* userSaga() {
  yield all([takeLatest(FETCH_USERS, fetchUsers)]);
}
