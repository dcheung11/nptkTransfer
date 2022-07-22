/* eslint-disable no-console */
import request from 'utils/request';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { CREATE_TAXONOMY_NODE } from './constants';
import { successCreateTaxonomyNode, failedCreateTaxonomyNode } from './actions';

export function* postTaxonomyNode(data) {
  const bodyData = JSON.stringify({
    parent_taxonomy_id: data.taxonomyData.parent_taxonomy_id,
    rank: data.taxonomyData.rank,
    name: data.taxonomyData.name,
  });
  console.log(bodyData);
  console.log(data);
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/taxonomy`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `api_key f02fca33e67d0531257249ec05708bbe`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: bodyData,
      }),
    );
    yield put(successCreateTaxonomyNode(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateTaxonomyNode(err));
  }
}

export default function* taxonomySaga() {
  yield all([takeLatest(CREATE_TAXONOMY_NODE, postTaxonomyNode)]);
}
