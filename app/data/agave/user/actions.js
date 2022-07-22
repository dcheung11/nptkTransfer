import {
  FETCH_USERS,
  SUCCESS_FETCH_USERS,
  FAILED_FETCH_USERS,
} from './constants';

export function fetchUsers(userData) {
  return {
    type: FETCH_USERS,
    userData,
  };
}

export function successFetchUsers(userResponse) {
  return {
    type: SUCCESS_FETCH_USERS,
    userResponse,
  };
}

export function failedFetchUsers(err) {
  return {
    type: FAILED_FETCH_USERS,
    err,
  };
}
