import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { FETCH_PLATE } from './constants';
import {
  successFetchPlate,
  failedFetchPlate,
  successFetchAllPlateInfo,
  failedFetchAllPlateInfo,
} from './actions';

export function* fetchPlate(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/plate/id/${
          data.queryData.plateId
          // }/query?select=plate_id,microwell(taxonomy_id,extract_id,x,y,microwell_metadata,extract(extract_confident_activity(activities)))`,
        }/activities`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.queryData.bearerToken}`,
          },
        },
      ),
    );
    const plateData = {};
    plateData[data.queryData.plateId] = response;
    yield put(successFetchPlate(plateData));
  } catch (err) {
    console.log(err);
    yield put(failedFetchPlate(err));
  }
}

export function* fetchAllPlatesInfo(data) {
  try {
    const response = yield call(() =>
      request(
        `https://cactus.magarveylab.ca/api/plate/query?select=plate_id,plate_name,plate_notes,organization(name)`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.queryData.bearerToken}`,
          },
        },
      ),
    );
    yield put(successFetchAllPlateInfo(response));
  } catch (err) {
    console.log(err);
    yield put(failedFetchAllPlateInfo(err));
  }
}

export default function* plateSaga() {
  yield all([takeLatest(FETCH_PLATE, fetchPlate)]);
}
