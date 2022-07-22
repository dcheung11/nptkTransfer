/*
 *
 * Auth actions
 *
 */

import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DEFAULT_ACTION,
  LOGIN,
  LOGOUT,
  LOGOUT_FAILED,
  GET_USER_METADATA,
  GET_USER_METADATA_SUCCESS,
  GET_USER_METADATA_FAILED,
  FETCH_AUTH0_TOKEN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function login(userData) {
  return {
    type: LOGIN,
    userData,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutFailed(error) {
  return {
    type: LOGOUT_FAILED,
    error,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function getUserMetadata(bearerToken) {
  return {
    type: GET_USER_METADATA,
    bearerToken,
  };
}

export function getUserMetadataSuccess(userData) {
  return {
    type: GET_USER_METADATA_SUCCESS,
    user: userData,
  };
}

export function getUserMetadataFailed(error) {
  return {
    type: GET_USER_METADATA_FAILED,
    error,
  };
}

export function fetchAuth0Token(data) {
  return {
    type: FETCH_AUTH0_TOKEN,
    data,
  };
}
