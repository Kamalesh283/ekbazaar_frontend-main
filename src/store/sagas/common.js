/* eslint-disable no-restricted-globals */
import _ from "lodash";
import { put, takeLatest, call, select, delay, fork } from "redux-saga/effects";
import Cookies from 'js-cookie'
// import history from "../../Routes/history";
import { setAlert, setAuthToken, clearAuthToken } from "../actions/app";
import { actionTypes } from "../../utils/constants";
import { signin, seller } from '../../Routes/path'
import { chatLogin } from '../actions/chat'
import { useNavigate } from "react-router-dom";
// let navigate= useNavigate()

import {
  getAccessTokenPending,
  getAccessTokenSuccess,
  getAccessTokenError,
  checkUserExistPending,
  checkUserExistSuccess,
  checkUserExistError,
  sendOtpPending,
  sendOtpSuccess,
  sendOtpError,
  verifyMobilePending,
  verifyMobileSuccess,
  verifyMobileError,
  addUserPending,
  addUserSuccess,
  addUserError,
  loginPending,
  loginSuccess,
  loginError,
  getUserProfilePending,
  getUserProfileSuccess,
  getUserProfileError,
  updateUserProfilePending,
  updateUserProfileSuccess,
  updateUserProfileError,
  logoutPending,
  logoutSuccess,
  logoutError,
  forgetPasswordPending,
  forgetPasswordSuccess,
  forgetPasswordError,
  updatePasswordPending,
  updatePasswordSuccess,
  updatePasswordError,
  updateNewPasswordPending,
  updateNewPasswordSuccess,
  updateNewPasswordError,
  getUserProfile,
  getSubscriptionPlanPending,
  getSubscriptionPlanSuccess,
  getSubscriptionPlanError,
  verifyEmailPending,
  verifyEmailSuccess,
  verifyEmailError,
  logout,
  updateLanguagePending,
  updateLanguageSuccess,
  updateLanguageError,
  checkForLoggedUserPending,
  checkForLoggedUserSuccess,
  checkForLoggedUserError,

  deleteAccountError,
  deleteAccountPending,
  deleteAccountSuccess,

  searchActiveSellerNumbers,

  verifyUserEmailError,
  verifyUserEmailPending,
  verifyUserEmailSuccess,

  otpVerified,

  getReferralCodeSuccess,
  getReferralCodePending,
  getReferralCodeError
} from "../actions/common";

import {
  getAccessTokenApi,
  checkUserExistApi,
  sendOtpApi,
  verifyMobileApi,
  addUserApi,
  loginApi,
  getUserProfileApi,
  updateUserProfileApi,
  logoutApi,
  forgetPasswordApi,
  updatePasswordApi,
  updateNewPasswordApi,
  getSubscriptionPlanApi,
  verifyEmailApi,
  updateLanguageApi,
  checkForLoggedUserApi,
  deleteAccountApi,
  userVerifyEmailApi,
  getReferralCodeApi,
} from "../../utils/api/common";

import { chatLogout } from '../actions/chat'

import {
  websocketSagas,
  websocketWatcher,
  socketLogin,
  /* subscribeNotification  */
} from './chat'
import {
  convertQSobjToObj,
  parseQS,
  getSeachQueryStructure,
  convertObjToQSobj,
  stringyfyQS
} from '../../utils/helpers'
const { common, sso } = actionTypes;


/**
 * SSO CHECK
 */
function* checkForLoggedUserSaga(action) {
  try {
    yield put(checkForLoggedUserPending(true));
    const response = yield call(checkForLoggedUserApi, action.payload);
    if (response.success) {
      yield put(setAuthToken(response.data.token, 15));
      // yield put(loginSuccess(response.data));
      yield delay(2000)
      yield put(getUserProfile());
      yield put(checkForLoggedUserSuccess(response.data));
      if (response.data.token) {
        yield put(setAuthToken(response.data.token, 1));
      }
    } else {
      yield put(clearAuthToken())
      yield put(checkForLoggedUserError(response));
    }
  } catch (error) {
    yield put(checkForLoggedUserError(error));
  }
}

/**
 * access token
 */
function* getAccessTokenSaga(action) {
  try {
    yield put(getAccessTokenPending(true));
    const response = yield call(getAccessTokenApi, action.payload);
    if (response.success) {
      yield put(getAccessTokenSuccess(response.data));
      if (response.data.token) {
        yield put(setAuthToken(response.data.token, 1));
      }
    } else {
      yield put(getAccessTokenError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(getAccessTokenError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * check user exist
 */
function* checkUserExistSaga(action) {
  try {
    yield put(checkUserExistPending(true));
    const response = yield call(checkUserExistApi, action.payload);
    if (response.success) {
      yield put(checkUserExistSuccess(response));
    } else {
      yield put(checkUserExistError(response));
      if (!action.payload.rfp)
        yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(checkUserExistError(error));
    if (!action.payload.rfp)
      yield put(setAlert("danger", error.message));
  }
}

/**
 * send otp
 */
function* sendOtpSaga(action) {
  try {
    console.log(action.payload, "-----------ACTION")
    if (!action.payload.verify) {
      yield put(sendOtpPending(action.payload.mobile));
    }
    const response = yield call(sendOtpApi, action.payload);
    if (response.success) {
      if (action.payload.verify) {
        if (response.data && response.data.otpVerified) {
          yield put(otpVerified());
        } else {
          yield put(setAlert("danger", response.message))
        }

      } else {
        yield put(sendOtpSuccess(response.data));
        yield put(setAlert("success", response.message));
      }
    } else {
      yield put(sendOtpError(response.message));
      if (!action.payload.rfp) {

        yield put(setAlert("danger", response.message))
      } 
    }
  } catch (error) {
    yield put(sendOtpError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * verify mobile
 */
function* verifyMobileSaga(action) {
  try {
    yield put(verifyMobilePending(true));
    const response = yield call(verifyMobileApi, action.payload);
    if (response.success) {
      yield put(verifyMobileSuccess(response));
    } else {
      yield put(verifyMobileError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(verifyMobileError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * add user
 */
function* addUserSaga(action) {
  try {
    yield put(addUserPending(true));
    const response = yield call(addUserApi, action.payload);
    if (response.success) {
      console.log(response.data.activeChat, "-------chatLogin")
      yield put(addUserSuccess(response.data));
      yield put(setAuthToken(response.data.token, 1));
      yield put(getUserProfile());

      // yield fork(websocketSagas) // working
      // yield put(chatLogin(response.data.activeChat)) // working

    } else {
      yield put(addUserError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(addUserError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * user login
 */
function* loginSaga(action) {
  try {
    yield put(loginPending(true));
    const expireTime = action.payload.remember ? 15 : 1;
    const response = yield call(loginApi, action.payload);
    if (response.success) {
      /************* start of trade login functionalities ********************/
      yield put(loginSuccess(response.data));
      yield put(setAlert("success", response.message));
      if (action.payload.userType && action.payload.userType === 'seller') {
        // if (!response.data.sellerType)
        //   history.push('/signup')
        // else if (response.data.productCount === '1') {
        //   history.push('/my_product')
        // }
        // else if (!response.data.productCount)
        //   history.push('/seller/seller-central/product')
        // else
        //   history.push(seller)
      }
      else {
        if (localStorage.getItem('redirectPath')) {
          yield put(searchActiveSellerNumbers())

          // history.back()

          // const currentQuery = localStorage.getItem('redirectUrl');
          // const redirectPath = localStorage.getItem('redirectPath')
          // localStorage.removeItem('redirectUrl');
          // localStorage.removeItem('redirectPath');
          // if (redirectPath === '/listing') {
          //   const obj = parseQS(currentQuery);
          //   const queryObj = convertQSobjToObj(obj);
          //   let validQuery = getSeachQueryStructure(queryObj);
          //   validQuery = convertObjToQSobj(validQuery);
          //   const newUrlString = stringyfyQS(validQuery); String
          //   history.push({
          //     pathname: redirectPath,
          //     search: `?${newUrlString}`,
          //   });
          // } else {
          //   history.push({
          //     pathname: redirectPath,
          //     search: currentQuery,
          //   });
          // }
        } else {
          // history.push('/')
        }

      }

      yield put(setAuthToken(response.data.token, expireTime));
      yield delay(2000)
      const resp = yield call(getUserProfileApi, action.payload)
      if (resp.success)
        yield put(getUserProfileSuccess(resp.data))
      /******************* end of trade login functionalities ***********************/

      yield fork(websocketSagas) // working
      console.log(response.data.activeChat, "--chatLogin22222222222222222")
      yield put(chatLogin(response.data.activeChat)) // working
      yield delay(1000)
      // yield call(subscribeNotification, response.data.activeChat)
      // yield put(socketLogin);
      const userType = localStorage.getItem("userType")
      if (userType === "seller") {
        const resp = yield call(getUserProfileApi, action.payload)
        if (resp && resp.data && resp.data.user && resp.data.user.preferredLanguage && resp.data.user.preferredLanguage.langCode) {
          // Cookies.set("googtrans", `/en/${resp.data.user.preferredLanguage.langCode}`, { path: '/' })
          // Cookies.remove("googtrans")
          // Cookies.set("googtrans", `/en/${resp.data.user.preferredLanguage.langCode}`, { domain: '.ekbazaar.com' })
          // window.location.reload()

          Cookies.remove("googtrans")

          Cookies.set("googtrans", `/en/${resp.data.user.preferredLanguage.langCode}`, { path: '/' })
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      }
    } else {
      yield put(loginError(response.data));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(loginError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * RFP LOGIN
 */
function* rfpLoginSaga(action) {
  try {
    yield put(loginPending(true));
    const expireTime = action.payload.remember ? 15 : 1;
    const response = yield call(loginApi, action.payload);
    if (response.success) {
      yield put(setAuthToken(response.data.token, expireTime));
      yield put(loginSuccess(response.data));
      yield delay(2000)
      yield put(getUserProfile());
      yield put(setAlert("success", response.message));
      // if (localStorage.getItem("userType") === 'seller')
      //   history.push(seller)
      // else
      //   history.push('/')
    } else {
      yield put(loginError(response.message));
      // yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(loginError(error.message));
    // yield put(setAlert("danger", error.message));
  }
}


/**
 * get user
 */
function* getUserProfileSaga(action) {
  try {
    yield put(getUserProfilePending(true));
    const response = yield call(getUserProfileApi, action.payload);
    if (response.success) {
      localStorage.setItem("sellerGroup", response.data && response.data.seller && response.data.seller.sellerType && response.data.seller.sellerType.length && response.data.seller.sellerType[0].group || null)
      localStorage.setItem("userId", response.data && response.data.user && response.data.user._id)
      yield put(getUserProfileSuccess(response.data));
    } else {
      yield put(getUserProfileError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(getUserProfileError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * update user
 */
function* updateUserProfileSaga(action) {
  try {
    const { buyer } = action.payload
    const exit = buyer && buyer.exit || action.payload.exit || null
    yield put(updateUserProfilePending(true));
    const response = yield call(updateUserProfileApi, action.payload);
    if (response.success) {
      // if (!_.isEmpty(response.data.activeChat)) {

      const { buyer, seller } = response.data
      localStorage.setItem('chatUsername', buyer.mobile)
      yield fork(websocketSagas) // working

      yield put(chatLogin({
        username: buyer.mobile,
        userId: buyer.userId,
        buyerId: buyer._id,
        sellerId: seller._id,
        name: buyer.name,
        email: buyer.email
      })) // working
      console.log({
        username: buyer.mobile,
        userId: buyer.userId,
        buyerId: buyer._id,
        sellerId: seller._id,
        name: buyer.name,
        email: buyer.email
      }, '--------chatLogin')
      // if (exit && localStorage.getItem("userType") === 'seller' && response.data && !_.isEmpty(response.data.seller) && !response.data.seller.sellerProductId.length) {
      //   history.push('/seller/seller-central/product')
      //   if (response && response.data && response.data.user && response.data.user.preferredLanguage && response.data.user.preferredLanguage.langCode) {
      //     Cookies.set("googtrans", `/en/${response.data.user.preferredLanguage.langCode}`, { path: '/' })
      //     // Cookies.remove("googtrans")
      //     // Cookies.set("googtrans", `/en/${resp.data.user.preferredLanguage.langCode}`, { domain: '.ekbazaar.com' })
      //     // window.location.reload()
      //   } 
      // }
      // else if (exit && localStorage.getItem("userType") === 'seller' && response.data && !_.isEmpty(response.data.seller) && response.data.seller.sellerProductId.length)
      //   history.push('/seller/seller-central')
      // else if (localStorage.getItem("userType") !== 'seller') history.push('/')

      console.log(response.data, "------------------response.dataresponse.data")

      if (response && response.data && response.data.user && response.data.user.preferredLanguage && response.data.user.preferredLanguage.langCode) {
        // history.push({
        //   pathname: '/pricing',
        //   search: '?skip=true',
        //   state: { response, exit }
        // });
        // Cookies.set("googtrans", `/en/${response.data.user.preferredLanguage.langCode}`, { path: '/' })
        Cookies.remove("googtrans")

        Cookies.set("googtrans", `/en/${response.data.user.preferredLanguage.langCode}`, { path: '/' })
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }

      // history.push({
      //   pathname: '/pricing',
      //   search: '?skip=true',
      //   state: { response, exit }
      // });
      // }
      yield put(updateUserProfileSuccess(response.data));
      yield put(setAlert("success", response.message));
    } else {
      yield put(updateUserProfileError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(updateUserProfileError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * update user preferred language
 */
function* updateLanguageSaga(action) {
  try {
    yield put(updateLanguagePending(true));
    const response = yield call(updateLanguageApi, action.payload);
    if (response.success) {
      yield put(updateLanguageSuccess(response.data));
      // yield put(setAlert("success", response.message));
    } else {
      yield put(updateLanguageError(response));
      // yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(updateLanguageError(error));
    // yield put(setAlert("danger", error.message));
  }
}

/**
 * user logout
 */
function* logoutSaga(action) {
  try {
    yield put(logoutPending(true));
    const response = yield call(logoutApi, action.payload);
    if (response.success) {
      yield put(chatLogout({
        chatUserId: localStorage.getItem("chatUserId"),
        chatAuthToken: localStorage.getItem("chatAuthToken"),
        chatUsername: localStorage.getItem("chatUsername")
      }));
      yield put(logoutSuccess(response));
      yield put(clearAuthToken());
      yield put(setAlert("success", response.message));
      localStorage.removeItem("chatAuthToken");
      localStorage.removeItem("chatUserId");
      localStorage.removeItem("chatUsername");
      localStorage.removeItem("chatLanguage");
      localStorage.removeItem("roomID");
      localStorage.removeItem("userId");
      localStorage.removeItem("redirectUrl");
      localStorage.removeItem("redirectPath");

      // Cookies.remove("googtrans")
      // Cookies.remove("googtrans")
      // history.push(signin)
    } else {
      yield put(logoutError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(logoutError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * forget password
 */
function* forgetPasswordSaga(action) {
  try {
    yield put(forgetPasswordPending(true));
    const response = yield call(forgetPasswordApi, action.payload);
    if (response.success) {
      yield put(forgetPasswordSuccess(response.data));
    } else {
      yield put(forgetPasswordError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(forgetPasswordError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * update password
 */
function* updatePasswordSaga(action) {
  try {
    const { data, hideModel } = action.payload
    yield put(updatePasswordPending(true));
    const response = yield call(updatePasswordApi, data);
    if (response.success) {
      yield put(updatePasswordSuccess(response));
      yield put(logout());
      // history.push('/signin')
      yield put(setAlert("success", response.message));
    } else {
      yield put(updatePasswordError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(updatePasswordError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * update new password
 */
function* updateNewPasswordSaga(action) {
  try {
    yield put(updateNewPasswordPending(true));
    const response = yield call(updateNewPasswordApi, action.payload);
    if (response.success) {
      yield put(updateNewPasswordSuccess(response.data));
      yield put(setAlert("success", response.message));
    } else {
      yield put(updateNewPasswordError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(updateNewPasswordError(error));
    yield put(setAlert("danger", error.message));
  }
}

/**
 * get subscription plans
 */
function* getSubscriptionPlanSaga(action) {
  try {
    yield put(getSubscriptionPlanPending(true));
    const response = yield call(getSubscriptionPlanApi, action.payload);
    if (response.success) {
      yield put(getSubscriptionPlanSuccess(response));
    } else {
      yield put(getSubscriptionPlanError(response));
    }
  } catch (error) {
    yield put(getSubscriptionPlanError(error));
  }
}

/**
 * ReferalCodes 
 */

function* getReferralCodeSaga(action) {
  try {
    yield put(getReferralCodePending(true));
    const response = yield call(getReferralCodeApi, action.payload);
    console.log("🚀 ~ file: common.js:620 ~ function*getReferralCodeSaga ~ response:", response.data)
    if (response.success) {
      yield put(getReferralCodeSuccess(response.data));
    } else {
      yield put(getReferralCodeError(response));
    }
  } catch (error) {
    yield put(getReferralCodeError(error));
  }
}
/**
 * verify email
 */
function* verifyEmailSaga(action) {
  try {
    yield put(verifyEmailPending(action.payload.mobile));
    const response = yield call(verifyEmailApi, action.payload);
    if (response.success) {
      yield put(verifyEmailSuccess(response.data));
    } else {
      yield put(verifyEmailError(response));
      yield put(setAlert("danger", response.message));
    }
  } catch (error) {
    yield put(verifyEmailError(error));
    yield put(setAlert("danger", error.message));
  }
}


/**
 * Delete Account
 */
function* deleteAccountSaga(action) {
  try {
    yield put(deleteAccountPending(action.payload));
    const response = yield call(deleteAccountApi, action.payload);
    if (response.success) {
      yield put(setAlert("success", response.message));
      yield put(logout());
      // yield put(deleteAccountSuccess(response.data));
      // history.push(signin)
    } else {
      yield put(deleteAccountError(response.message));
    }
  } catch (error) {
    yield put(deleteAccountError(error));
    yield put(setAlert("danger", error.message));
  }
}

function* userVerifyEmailSaga(action) {
  try {
    yield put(verifyUserEmailPending(true))
    const res = yield call(userVerifyEmailApi, action.payload)
    if (res.success) {
      yield put(verifyUserEmailSuccess(res.data))
      yield put(getUserProfile());
    } else {
      yield put(verifyUserEmailError(res))
    }
  } catch (error) {
    yield put(verifyUserEmailError(true))
  }
}
export function* checkForLoggedUserWatcher() {
  yield takeLatest(sso.SSO_REDIRECT, checkForLoggedUserSaga);
}

export function* getAccessTokenWatcher() {
  yield takeLatest(common.GET_ACCESS_TOKEN, getAccessTokenSaga);
}

export function* checkUserExistWatcher() {
  yield takeLatest(common.CHECK_USER_EXIST, checkUserExistSaga);
}

export function* sendOtpWatcher() {
  yield takeLatest(common.SEND_OTP, sendOtpSaga);
}

export function* verifyMobileWatcher() {
  yield takeLatest(common.VERIFY_MOBILE, verifyMobileSaga);
}

export function* addUserWatcher() {
  yield takeLatest(common.ADD_USER, addUserSaga);
}

export function* loginWatcher() {
  yield takeLatest(common.LOGIN, loginSaga);
}

export function* rfpLoginWatcher() {
  yield takeLatest(common.RFP_LOGIN, rfpLoginSaga);
}

export function* getUserProfileWatcher() {
  yield takeLatest(common.GET_USER_PROFILE, getUserProfileSaga);
}

export function* updateUserProfileWatcher() {
  yield takeLatest(common.UPDATE_USER_PROFILE, updateUserProfileSaga);
}

export function* updateLanguageWatcher() {
  yield takeLatest(common.UPDATE_LANGUAGE, updateLanguageSaga);
}

export function* logoutWatcher() {
  yield takeLatest(common.LOGOUT, logoutSaga);
}

export function* forgetPasswordWatcher() {
  yield takeLatest(common.FORGET_PASSWORD, forgetPasswordSaga);
}

export function* updatePasswordWatcher() {
  yield takeLatest(common.UPDATE_PASSWORD, updatePasswordSaga);
}

export function* updateNewPasswordWatcher() {
  yield takeLatest(common.UPDATE_NEW_PASSWORD, updateNewPasswordSaga);
}
export function* getSubscriptionPlanWatcher() {
  yield takeLatest(common.GET_SUBSCRPTION_PLAN, getSubscriptionPlanSaga);
}
export function* verifyEmailWatcher() {
  yield takeLatest(common.VERIFY_EMAIL, verifyEmailSaga);
}
export function* deleteAccountWatcher() {
  yield takeLatest(common.DELETE_ACCOUNT, deleteAccountSaga);
}

export function* userVerifyEmailWatcher() {
  yield takeLatest(common.VERIFY_USER_EMAIL, userVerifyEmailSaga);
}

export function* getReferralCodeWatcher() {
  yield takeLatest(common.GET_REFERRAL_CODE, getReferralCodeSaga)
}