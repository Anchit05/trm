import { all, call, takeLatest } from 'redux-saga/effects';
import { ADDRESS_BALANCE, ADDRESS_TRANSACTIONS } from './actions';

import * as Api from './api';
import { apiRequest } from './commonApiRequest';

/**
 * function is reduced to a simple format, which if someone wants to replicate
 * and add api calls, can do that easily.
 * @param {payload, type}
 */
function* loadAddressBalance({ payload, type }) {
  yield call(apiRequest, {
    payload,
    type,
    apiFunction: Api.getAddressBalance,
  });
}

function* loadAddressTransactions({ payload, type }) {
  console.log("payload: ", payload);
  yield call(apiRequest, {
    payload,
    type,
    apiFunction: Api.getAddressTransactions,
  });
}

export default function* sagas() {
  yield all([
    takeLatest(ADDRESS_BALANCE, loadAddressBalance),
    takeLatest(ADDRESS_TRANSACTIONS, loadAddressTransactions),
  ]);
}
