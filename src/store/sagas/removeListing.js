import {
  put,
  takeLatest,
  call
} from 'redux-saga/effects'
import {
  setAlert
} from "../actions/app";

import {
  actionTypes
} from '../../utils/constants'

import {
  postremoveListingApi
} from '../../utils/api/removeListing'

import {
addRemoveListingPending,
addRemoveListingSuccess,
addRemoveListingError
} from '../actions/removeListing'

const {
  removeListing
} = actionTypes

/**
 * post contact us form
 */
function* postRemoveListingSaga(action) {
  try {
    yield put(addRemoveListingPending(true));
    const res = yield call(postremoveListingApi, action.payload);
    if (res.success) {
      yield put(addRemoveListingSuccess(res));
      yield put(setAlert('success', res.message))
    } else {
      yield put(addRemoveListingError(res));
      yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(addRemoveListingError(err));
    yield put(setAlert('danger', err))
  }
}

/*
 
 ACTION WATCHERS
 
 */

export function* postRemoveListingWatcher() {
  yield takeLatest(removeListing.POST_REMOVELISTING, postRemoveListingSaga);
}