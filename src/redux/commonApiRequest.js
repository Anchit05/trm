import { call, put } from 'redux-saga/effects';

/**
 * This function can be used in multiple sagas, wherever someone wants to call the api
 * @param {payload, type, function}
 */
export function* apiRequest({ payload, type, apiFunction }) {
  try {
    yield put({
      type: `${type}_REQUEST`,
    });

    const response = yield call(apiFunction, payload);

    yield put({
      type: `${type}_SUCCESS`,
      payload,
      response: response?.data,
    });
  } catch (e) {
    yield put({
      type: `${type}_ERROR`,
    });
  }
}
