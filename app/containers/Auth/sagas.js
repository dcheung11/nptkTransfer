import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import {
  deleteOrganizationId,
  deleteToken,
  setOrganizationId,
  setToken,
} from 'utils/auth';
import { GET_USER_METADATA, LOGIN, LOGOUT } from './constants';
import {
  getUserMetadata,
  getUserMetadataSuccess,
  getUserMetadataFailed,
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
} from './actions';

export function* login(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/auth/token`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password',
          username: data.userData.username,
          password: data.userData.password,
        }),
      }),
    );
    setToken(response.access_token);
    yield put(loginSuccess());
    yield put(getUserMetadata(response.access_token));
    yield put(push('/apps'));
  } catch (err) {
    yield put(loginFailed('Username or password is not valid!'));
    yield put(push('/'));
  }
}

export function* fetchUserMetadata({ bearerToken }) {
  try {
    const r = `https://cactus.magarveylab.ca/api/user_details/translate?token=${bearerToken}`;
    const response = yield call(() =>
      request(r, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    );
    setOrganizationId(response.organization_id);
    yield put(getUserMetadataSuccess(response));
  } catch (err) {
    yield put(getUserMetadataFailed('Bad Bearer Token in LocalStorage!'));
    yield put(push('/'));
  }
}

export function* logout() {
  try {
    deleteToken();
    deleteOrganizationId();
    yield put(logoutSuccess());
    yield put(push('/'));
  } catch (err) {
    yield put(logoutFailed(err));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(LOGIN, login),
    takeLatest(LOGOUT, logout),
    takeLatest(GET_USER_METADATA, fetchUserMetadata),
  ]);
}
