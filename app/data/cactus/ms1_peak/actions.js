import { FETCH_MS2_IONS, FAILED_MS2_IONS, SUCCESS_MS2_IONS } from './constants';

export function fetchMs2Ions(queryData) {
  return {
    type: FETCH_MS2_IONS,
    queryData,
  };
}

export function successMs2Ions(ms2Data) {
  return {
    type: SUCCESS_MS2_IONS,
    ms2Data,
  };
}

export function failedMs2Ions(err) {
  return {
    type: FAILED_MS2_IONS,
    err,
  };
}
