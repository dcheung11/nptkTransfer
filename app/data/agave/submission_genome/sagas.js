import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { DEPOSIT_GENOME } from './constants';
import { failedDepositGenome, successDepositGenome } from './actions';

export function* depositGenome(data) {
  try {
    const fmData = new FormData();
    fmData.append('file', data.genomeData.genome, data.genomeData.genome.name);
    const response = yield call(() =>
      request(`http://127.0.0.1:8000/api/submission_genome`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data.genomeData.bearerToken}`,
        },
        body: data.genomeData.genome,
      }),
    );
    yield put(successDepositGenome(response));
  } catch (err) {
    console.log(err);
    yield put(failedDepositGenome(err));
  }
}

export default function* genomeSaga() {
  yield all([takeLatest(DEPOSIT_GENOME, depositGenome)]);
}
