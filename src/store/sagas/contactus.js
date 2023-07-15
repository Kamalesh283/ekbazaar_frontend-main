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
postcontactUsApi
} from '../../utils/api/contactus'

import {
addContactus,
addContactusPending,
addContactusSuccess,
addContactusError
} from '../actions/contactus'

const {
  contactUs
} = actionTypes

/**
 * post contact us form
 */
function* postContactUsSaga(action) {
  try {
    yield put(addContactusPending(true));
    const res = yield call(postcontactUsApi, action.payload);
    if (res.success) {
      yield put(addContactusSuccess(res));
        yield put(setAlert('success', res.message))
    } else {
      yield put(addContactusError(res));
      yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(addContactusError(err));
    yield put(setAlert('danger', err))
  }
}

 /*
  
  ACTION WATCHERS
  
  */

 export function* postContactUsWatcher() {
   yield takeLatest(contactUs.POST_CONTACTUS, postContactUsSaga);
 }