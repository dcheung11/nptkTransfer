/**
 * Gets the Ibis Model Response
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { respLoaded, respLoadingError } from './actions';
import { LOAD_IBIS_RESPONSE } from './constants';

/**
 * Get Ibis Reponse from ORF
 */
export function* getResponse(data) {
  // Select username from store
  const orf = data.inputSequence;
  const requestURL = `http://magarveylab-gpu.mcmaster.ca/fastapi/api/ibis_onnx/${orf}`;
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(respLoaded(response));
  } catch (err) {
    yield put(respLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ibisData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_IBIS_RESPONSE, getResponse);
}
