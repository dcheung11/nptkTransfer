import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { FETCH_ACTIVITY_COUNTS, FETCH_EXTRACT_COUNTS } from './constants';
import {
  successActivityCounts,
  failedActivityCounts,
  successExtractCounts,
  failedExtractCounts,
} from './actions';

export function* fetchActivityCounts(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/activitycleaned/query?select=activity,smallmolecule(taxonomy_has_smallmolecule(taxonomy(tax->>${
          data.query.rank
        },tax->>${data.query.rank}_id,tax->>kingdom))))&activity=ilike.${
          data.query.activity
        }&limit=null`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.query.bearerToken}`,
          },
        },
      ),
    );
    yield put(successActivityCounts(response));
  } catch (err) {
    console.log(err);
    yield put(failedActivityCounts(err));
  }
}

export function* fetchExtractCounts(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/extract/query?select=culture(taxonomy(tax->>${
          data.query.rank
        },tax->>${
          data.query.rank
        }_id,tax->>kingdom)),malaria_assay(dd2_inhibition),tb_assay(*)&limit=null`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.query.bearerToken}`,
          },
        },
      ),
    );
    yield put(successExtractCounts(response));
  } catch (err) {
    console.log(err);
    yield put(failedExtractCounts(err));
  }
}

export default function* activitySaga() {
  yield all([
    takeLatest(FETCH_ACTIVITY_COUNTS, fetchActivityCounts),
    takeLatest(FETCH_EXTRACT_COUNTS, fetchExtractCounts),
  ]);
}
