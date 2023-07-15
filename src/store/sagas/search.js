import {
  put, takeLatest, call
} from 'redux-saga/effects'
import { actionTypes } from '../../utils/constants'
import {
  searchQueryPending,
  searchQuerySuccess,
  searchQueryError,
  getAllSellersError,
  getAllSellersPending,
  getAllSellersSuccess,
} from '../actions/search'

import {
  searchApi,
  getAllSellersAPI
} from '../../utils/api/search'
const { search } = actionTypes

/**
 * search suggestion
 */
function* searchSaga(action) {

  try {

    yield put(searchQueryPending(true))
    const res = yield call(searchApi, action.payload)
    if (res.success) {

      yield put(searchQuerySuccess(res.data))

    } else {

      yield put(searchQueryError(res))

    }

  } catch (err) {
    yield put(searchQueryError(err))

  }

}

// Get All Sellers
function* getAllSellersSaga(action) {

  try {

    yield put(getAllSellersPending(true))
    const res = yield call(getAllSellersAPI, action.payload)
    if (res.success) {

      yield put(getAllSellersSuccess(res.data))

    } else {

      yield put(getAllSellersError(res))

    }

  } catch (err) {
    yield put(getAllSellersError(err))

  }

}


/* 
    WATCHER 
*/

export function* getAllSellersWatcher() {

  yield takeLatest(search.GET_ALL_SELLERS, getAllSellersSaga)

}

export function* searchWatcher() {

  yield takeLatest(search.SEARCH, searchSaga)

}