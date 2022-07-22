/* eslint-disable prettier/prettier */
import {
  FETCH_INHOUSE_REQUESTED,
  SUCCESS_INHOUSE,
  FAILED_INHOUSE
} from './constants';

/* Used by React App via Dispatch to trigger Saga */

export function fetchInhouseRequested(inhouseData) {
  return {
    type: FETCH_INHOUSE_REQUESTED,
    inhouseData,
  };
}

export function successInhouse(inhouseData) {
  return {
    type: SUCCESS_INHOUSE,
    inhouseData,
  };
}

export function failedInhouse(err) {
  return {
    type: FAILED_INHOUSE,
    err,
  };
}
