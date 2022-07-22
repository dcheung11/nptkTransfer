/* eslint-disable no-console */
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import request from '../../../utils/request';
import {
  failedCreateCulture,
  failedCreateExperimentalClass,
  failedCreateExtract,
  failedCreateExtractionMethod,
  failedCreateExtractionSolvent,
  failedCreateMediaType,
  failedCreateOrganization,
  failedCultureMedium,
  failedExperimentClasses,
  failedExtractionMethods,
  failedExtractionSolvents,
  failedFetchMe,
  failedOrganizationIds,
  successCreateCulture,
  successCreateExperimentalClass,
  successCreateExtract,
  successCreateExtractionMethod,
  successCreateExtractionSolvent,
  successCreateMediaType,
  successCreateOrganization,
  successCultureMedium,
  successExperimentClasses,
  successExtractionMethods,
  successExtractionSolvents,
  successFetchMe,
  successOrganizationIds,
} from './actions';
import {
  CREATE_CULTURE,
  CREATE_EXPERIMENTAL_CLASS,
  CREATE_EXTRACT,
  CREATE_EXTRACTION_METHOD,
  CREATE_EXTRACTION_SOLVENT,
  CREATE_MEDIA_TYPE,
  CREATE_ORGANIZATION,
  FETCH_CULTURE_MEDIUM,
  FETCH_EXPERIMENT_CLASSES,
  FETCH_EXTRACTION_METHODS,
  FETCH_EXTRACTION_SOLVENTS,
  FETCH_ME,
  FETCH_ORGANIZATION_IDS,
} from './constants';

export function* fetchCultureMedium(data) {
  if (
    !!data.queryData.permissions &&
    data.queryData.permissions.includes('read:cultureMedia')
  ) {
    try {
      const response = yield call(() =>
        request(
          `https://cactus.magarveylab.ca/api/culture_medium/query?limit=null`,
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
      yield put(successCultureMedium(response));
    } catch (err) {
      console.log(err);
      yield put(failedCultureMedium(err));
    }
  } else {
    yield put(failedCultureMedium('Restricted'));
  }
}

export function* fetchExperimentClasses(data) {
  if (
    !!data.queryData.permissions &&
    data.queryData.permissions.includes('read:ExperimentClasses')
  ) {
    try {
      const response = yield call(() =>
        request(
          `https://cactus.magarveylab.ca/api/experiment_class/query?limit=null`,
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
      yield put(successExperimentClasses(response));
    } catch (err) {
      console.log(err);
      yield put(failedExperimentClasses(err));
    }
  } else {
    yield put(failedExperimentClasses('Restricted'));
  }
}

export function* fetchOrganizationIds(data) {
  if (
    !!data.queryData.permissions &&
    data.queryData.permissions.includes('read:organizationId')
  ) {
    try {
      const response = yield call(() =>
        request(
          `https://cactus.magarveylab.ca/api/organization/query?limit=null`,
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
      yield put(successOrganizationIds(response));
    } catch (err) {
      console.log(err);
      yield put(failedOrganizationIds(err));
    }
  } else {
    yield put(failedOrganizationIds('Restricted'));
  }
}

export function* fetchExtractionSolvents(data) {
  if (
    !!data.queryData.permissions &&
    data.queryData.permissions.includes('read:extractionSolvents')
  ) {
    try {
      const response = yield call(() =>
        request(
          `https://cactus.magarveylab.ca/api/extract_extraction_solvent/query?limit=null`,
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
      yield put(successExtractionSolvents(response));
    } catch (err) {
      console.log(err);
      yield put(failedExtractionSolvents(err));
    }
  } else {
    yield put(failedExtractionSolvents('Restricted'));
  }
}

export function* fetchExtractionMethods(data) {
  if (
    !!data.queryData.permissions &&
    data.queryData.permissions.includes('read:extractionMethods')
  ) {
    try {
      const response = yield call(() =>
        request(
          `https://cactus.magarveylab.ca/api/extract_extraction_method/query?limit=null`,
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
      yield put(successExtractionMethods(response));
    } catch (err) {
      console.log(err);
      yield put(failedExtractionMethods(err));
    }
  } else {
    yield put(failedExtractionMethods('Restricted'));
  }
}

export function* createExtract(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/extract`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.extractForm.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data.extractForm.formData),
      }),
    );
    yield put(successCreateExtract(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateExtract(err));
  }
}

export function* createExperimentalClass(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/experiment_class`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.classData.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ name: data.classData.className }),
      }),
    );
    yield put(successCreateExperimentalClass(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateExperimentalClass(err));
  }
}

export function* createMediaType(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/culture_medium`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.mediaData.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ name: data.mediaData.mediaName }),
      }),
    );
    yield put(successCreateMediaType(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateMediaType(err));
  }
}

export function* createCulture(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/culture`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.cultureForm.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data.cultureForm.formData),
      }),
    );
    yield put(successCreateCulture(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateCulture(err));
  }
}

export function* createOrganization(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/organization`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.organizationData.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ name: data.organizationData.organizationName }),
      }),
    );
    yield put(successCreateOrganization(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateOrganization(err));
  }
}

export function* createExtractionSolvent(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/extract_extraction_solvent`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.solventData.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ name: data.solventData.solventName }),
      }),
    );
    yield put(successCreateExtractionSolvent(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateExtractionSolvent(err));
  }
}

export function* createExtractionMethod(data) {
  try {
    const response = yield call(() =>
      request(`https://cactus.magarveylab.ca/api/extract_extraction_method`, {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Auth0 ${data.methodData.bearerToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ name: data.methodData.methodName }),
      }),
    );
    yield put(successCreateExtractionMethod(response));
  } catch (err) {
    console.log(err);
    yield put(failedCreateExtractionMethod(err));
  }
}

export function* fetchMe(data) {
  if (
    !!data.queryData.permissions &&
    data.queryData.permissions.includes('read:me')
  ) {
    try {
      const response = yield call(() =>
        request(`https://cactus.magarveylab.ca/auth/me`, {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Auth0 ${data.queryData.bearerToken}`,
          },
        }),
      );
      yield put(successFetchMe(response));
    } catch (err) {
      console.log(err);
      yield put(failedFetchMe(err));
    }
  } else {
    yield put(failedFetchMe('Restricted'));
  }
}

export default function* extractSaga() {
  yield all([
    takeLatest(FETCH_CULTURE_MEDIUM, fetchCultureMedium),
    takeLatest(FETCH_EXPERIMENT_CLASSES, fetchExperimentClasses),
    takeLatest(FETCH_ORGANIZATION_IDS, fetchOrganizationIds),
    takeLatest(FETCH_EXTRACTION_SOLVENTS, fetchExtractionSolvents),
    takeLatest(FETCH_EXTRACTION_METHODS, fetchExtractionMethods),
    takeEvery(CREATE_EXTRACT, createExtract),
    takeEvery(CREATE_EXPERIMENTAL_CLASS, createExperimentalClass),
    takeEvery(CREATE_MEDIA_TYPE, createMediaType),
    takeEvery(CREATE_CULTURE, createCulture),
    takeEvery(CREATE_ORGANIZATION, createOrganization),
    takeEvery(CREATE_EXTRACTION_SOLVENT, createExtractionSolvent),
    takeEvery(CREATE_EXTRACTION_METHOD, createExtractionMethod),
    takeLatest(FETCH_ME, fetchMe),
  ]);
}
