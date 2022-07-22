import {
  FAILED_PLATE,
  FETCH_PLATE,
  SUCCESS_PLATE,
  FAILED_FETCH_ALL_PLATES_INFO,
  FETCH_ALL_PLATES_INFO,
  SUCCESS_FETCH_ALL_PLATES_INFO,
} from './constants';

export function fetchPlate(queryData) {
  return {
    type: FETCH_PLATE,
    queryData,
  };
}

export function failedFetchPlate(err) {
  return {
    type: FAILED_PLATE,
    err,
  };
}

export function successFetchPlate(plateData) {
  return {
    type: SUCCESS_PLATE,
    plateData,
  };
}

export function fetchAllPlateInfo(queryData) {
  return {
    type: FETCH_ALL_PLATES_INFO,
    queryData,
  };
}

export function successFetchAllPlateInfo(allPlateData) {
  return {
    type: SUCCESS_FETCH_ALL_PLATES_INFO,
    allPlateData,
  };
}

export function failedFetchAllPlateInfo(err) {
  return {
    type: FAILED_FETCH_ALL_PLATES_INFO,
    err,
  };
}
