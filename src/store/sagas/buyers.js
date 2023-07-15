/* eslint-disable no-undef */
import _ from "lodash";
import {
  postRFPPending,
  postRFPSuccess,
  postRFPError,
  getBuyerProfilePending,
  getBuyerProfileSuccess,
  getBuyerProfileError,
  updateBuyerProfilePending,
  updateBuyerProfileSuccess,
  updateBuyerProfileError,
  updateBuyerNotificationsPending,
  updateBuyerNotificationsSuccess,
  updateBuyerNotificationsError,
  getBuyerNotificationsPending,
  getBuyerNotificationsSuccess,
  getBuyerNotificationsError,
  verifyBuyerEmailPending,
  verifyBuyerEmailSuccess,
  verifyBuyerEmailError,
  buyerEmailVerifiedPending,
  buyerEmailVerifiedSuccess,
  buyerEmailVerifiedError,
  getSellerProfile,
} from "../actions/buyers";

import {
  postRFPApi,
  getBuyerProfileApi,
  updateBuyerProfileApi,
  getBuyerNotificationsApi,
  updateBuyerNotificationsApi,
  verifyBuyerEmailApi,
  buyerEmailVerifiedApi,
} from "../../utils/api/buyers";

import { getUserProfile } from '../actions/common'

import { put, takeLatest, call,  delay, select, fork, all } from "redux-saga/effects";

import { actionTypes } from "../../utils/constants";

// import history from "../../Routes/history";
import { setAlert, setAuthToken, clearAuthToken } from "../actions/app";

// const locationRedirect = (state) => state.app.redirectUrl
const { buyer } = actionTypes;




/**
 * post rfp
 */
function* postRFPSaga(action) {
  try {
    yield put(postRFPPending(true));
    const res = yield call(postRFPApi, action.payload);
    if (res.success) {
      yield put(postRFPSuccess(res));

      if(res.data && res.data.token){
        yield put(setAuthToken(res.data.token, 1));
        yield put(setAlert('success', res.message))
        yield delay(3000)
        yield put(getUserProfile());
      }
    } else {
      yield put(postRFPError(res));
      // yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(postRFPError(err));
    // yield put(setAlert('danger', err))
  }
}

/**
 * get buyer profile
 */
function* getBuyerProfileSaga(action) {
    try {
      yield put(getBuyerProfilePending(true));
      const res = yield call(getBuyerProfileApi, action.payload);
      if (res.success) {
        localStorage.setItem("userId", res.data._id);
        yield put(getBuyerProfileSuccess(res.data));
      } else {
        yield put(getBuyerProfileError(res));
      }
    } catch (err) {
      yield put(getBuyerProfileError(err));
    }
  }
  
  /**
   * update buyer profile
   */
  function* updateBuyerProfileSaga(action) {
    try {
      yield put(updateBuyerProfilePending(true));
      const res = yield call(updateBuyerProfileApi, action.payload);
      if (res.success) {
        yield put(updateBuyerProfileSuccess(res));
        yield put(getUserProfile());
        yield put(setAlert('success', res.message))
      } else {
        yield put(updateBuyerProfileError(res));
        //   yield put(setAlert('danger', res.message))
      }
    } catch (err) {
      yield put(updateBuyerProfileError(err));
    }
  }
  
  /**
   * update buyer notifications
   */
  function* updateBuyerNotificationsSaga(action) {
    try {
      yield put(updateBuyerNotificationsPending(true));
      const res = yield call(updateBuyerNotificationsApi, action.payload);
  
      if (res.success) {
        yield put(updateBuyerNotificationsSuccess(res.data));
        //   yield put(setAlert('success', res.message))
      } else {
        yield put(updateBuyerNotificationsError(res));
        //   yield put(setAlert('danger', res.message))
      }
    } catch (err) {
      yield put(updateBuyerNotificationsError(err));
    }
  }
  
  /**
   * get buyer notifications
   */
  function* getBuyerNotificationsSaga(action) {
    try {
      yield put(getBuyerNotificationsPending(true));
      const res = yield call(getBuyerNotificationsApi, action.payload);
  
      if (res.success) {
        yield put(getBuyerNotificationsSuccess(res.data));
      } else {
        yield put(getBuyerNotificationsError(res));
      }
    } catch (err) {
      yield put(getBuyerNotificationsError(err));
    }
  }
  
  /**
   * verify buyer email
   */
  function* verifyBuyerEmailSaga(action) {
    try {
      yield put(verifyBuyerEmailPending(true));
      const res = yield call(verifyBuyerEmailApi, action.payload);
      if (res.success) {
        yield put(verifyBuyerEmailSuccess(res.data));
      } else {
        yield put(verifyBuyerEmailError(res));
      }
    } catch (error) {
      yield put(verifyBuyerEmailError(true));
    }
  }
  
  /**
   * buyer email verified
   */
  function* buyerEmailVerifiedSaga(action) {
    try {
      yield put(buyerEmailVerifiedPending(true));
      const res = yield call(buyerEmailVerifiedApi, action.payload);
      if (res.success) {
        yield put(buyerEmailVerifiedSuccess(res));
      } else {
        yield put(buyerEmailVerifiedError(res));
      }
    } catch (error) {
      yield put(buyerEmailVerifiedError(error));
    }
  }
  
  /*
  
  ACTION WATCHERS
  
  */

 export function* postRFPWatcher() {
    yield takeLatest(buyer.POST_RFP, postRFPSaga);
  }
  
  export function* getBuyerProfileWatcher() {
    yield takeLatest(buyer.GET_BUYER_PROFILE, getBuyerProfileSaga);
  }
  
  export function* updateBuyerProfileWatcher() {
    yield takeLatest(buyer.UPDATE_BUYER_PROFILE, updateBuyerProfileSaga);
  }
  
  export function* updateBuyerNotificationsWatcher() {
    yield takeLatest(
      buyer.UPDATE_BUYER_NOTIFICATION,
      updateBuyerNotificationsSaga
    );
  }
  
  export function* getBuyerNotificationsWatcher() {
    yield takeLatest(buyer.GET_BUYER_NOTIFICATION, getBuyerNotificationsSaga);
  }
  
  export function* verifyBuyerEmailWatcher() {
    yield takeLatest(buyer.VERIFY_BUYER_EMAIL, verifyBuyerEmailSaga);
  }
  
  export function* buyerEmailVerifiedWatcher() {
    yield takeLatest(buyer.BUYER_EMAIL_VERIFIED, buyerEmailVerifiedSaga);
  }
