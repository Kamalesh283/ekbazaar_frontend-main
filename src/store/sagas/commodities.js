import {
  put,
  takeLatest,
  call,
  select,
  fork,
  all
} from 'redux-saga/effects'
import {
  setAlert
} from "../actions/app";

import {
  actionTypes
} from '../../utils/constants'

import {
getCommoditiesApi,
getNewsApi
} from '../../utils/api/commodities'

import {
addContactus,
getCommoditiesPending,
getCommoditiesSuccess,
getCommoditiesError,
getNewsPending,
getNewsSuccess,
getNewsError
} from '../actions/commodities'

const {
  commodities
} = actionTypes

/**
 *  get commodities
 */
function* getCommoditiesSaga(action) {
  try {
    yield put(getCommoditiesPending(true));
    const res = yield call(getCommoditiesApi, action.payload);
    if (res.success) {
      yield put(getCommoditiesSuccess(res));
        // yield put(setAlert('success', res.message))
    } else {
      yield put(getCommoditiesError(res));
      // yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(getCommoditiesError(err));
    // yield put(setAlert('danger', err))
  }
}
/**
 *  get news
 */
function* getNewsSaga(action) {
  try {
    yield put(getNewsPending(true));
    const res = yield call(getNewsApi, action.payload);
    if (res.success) {
      yield put(getNewsSuccess(res));
        // yield put(setAlert('success', res.message))
    } else {
      yield put(getNewsError(res));
      // yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(getNewsError(err));
    // yield put(setAlert('danger', err))
  }
}

 /*
  
  ACTION WATCHERS
  
  */

 export function* getCommiditiesWatcher() {
   yield takeLatest(commodities.GET_COMMODITIES, getCommoditiesSaga);
 }
 export function* getNewsWatcher() {
   yield takeLatest(commodities.GET_NEWS, getNewsSaga);
 }