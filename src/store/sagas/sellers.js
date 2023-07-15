/* eslint-disable no-undef */
import _ from 'lodash'
import {
  getSellerProfilePending,
  getSellerProfileSuccess,
  getSellerProfileError,
  updateSellerProfilePending,
  updateSellerProfileSuccess,
  updateSellerProfileError,

  updateSellerNotificationsPending,
  updateSellerNotificationsSuccess,
  updateSellerNotificationsError,

  getSellerNotificationsPending,
  getSellerNotificationsSuccess,
  getSellerNotificationsError,

  verifySellerEmailPending,
  verifySellerEmailSuccess,
  verifySellerEmailError,
  sellerEmailVerifiedPending,
  sellerEmailVerifiedSuccess,
  sellerEmailVerifiedError,

  deleteSellerProductPending,
  deleteSellerProductSuccess,
  deleteSellerProductError,

  getSellerProfile,
  addSelectedProductSuccess,
  addSelectedProductError,
  addSelectedProductPending,

  updateSellerProductSuccess,
  updateSellerProductPending,
  updateSellerProductError,

  getSellerProductSuccess,
  getSellerProductPending,
  getSellerProductError,

  getFilteredCitiesSuccess,
  getFilteredCitiesPending,
  getFilteredCitiesError,

  getBuyerEnquiriesPending,
  getBuyerEnquiriesSuccess,
  getBuyerEnquiriesError,

  deleteSellerDocumentPending,
  deleteSellerDocumentSuccess,
  deleteSellerDocumentError
} from '../actions/sellers'

import {
  getUserProfile
} from "../actions/common"
import {
  put,
  takeLatest,
  call,
  select,
  fork,
  all
} from 'redux-saga/effects'

import {
  actionTypes
} from '../../utils/constants'
import {
  getSellerProfileApi,
  updateSellerProfileApi,
  updateSellerNotificationsApi,
  getSellerNotificationsApi,
  verifySellerEmailApi,
  sellerEmailVerifiedApi,
  delteteSellerProductApi,
  addSelectedProductApi,
  updateSellerProductApi,
  getSellerProductAPI,
  getFilteredCitiesAPI,
  getBuyerEnquiryAPI,
  deleteSellerDocApi,
} from '../../utils/api/sellers'

import { myproduct } from '../../Routes/path'
import { setChatCategory } from '../../store/actions/chat'


// import history from '../../Routes/history'
import {
  setAlert,
  setAuthToken,
  clearAuthToken
} from '../actions/app'
import { bp } from '../../Routes/path'

// const locationRedirect = (state) => state.app.redirectUrl
const {
  seller
} = actionTypes



/**
 * SAGA FUNCTIONS
 */

/**
 * get seller profile
 */
function* getSellerProfileSaga(action) {
  try {
    yield put(getSellerProfilePending(true))
    const res = yield call(getSellerProfileApi, action.payload)
    if (res.success) {
      localStorage.setItem('userId', res.data._id)
      yield put(getSellerProfileSuccess(res.data.data || res.data))
    } else {
      yield put(getSellerProfileError(res))
    }
  } catch (err) {
    yield put(getSellerProfileError(err));
  }
}

/**
 * update seller profile
 */
function* updateSellerProfileSaga(action) {
  try {

    yield put(updateSellerProfilePending(true));
    const {
      document,
      redirect
    } = action.payload
    if (document) {
      let abc = new FormData()
      abc.append('file', document)
      action.payload.document = abc
    }

    const res = yield call(updateSellerProfileApi, action.payload);

    if (res.success) {
      yield put(updateSellerProfileSuccess(res));
      yield put(getUserProfile());
      yield put(setAlert('success', res.message))
      // redirect &&  history.push(myproduct)
    } else {
      yield put(updateSellerProfileError(res))
      //   yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(updateSellerProfileError(err));
  }
}

/**
 * update seller notifications
 */
function* updateSellerNotificationsSaga(action) {
  try {
    yield put(updateSellerNotificationsPending(true))
    const res = yield call(updateSellerNotificationsApi, action.payload)

    if (res.success) {
      yield put(updateSellerNotificationsSuccess(res.data))
      //   yield put(setAlert('success', res.message))
    } else {
      yield put(updateSellerNotificationsError(res))
      //   yield put(setAlert('danger', res.message))
    }
  } catch (err) {
    yield put(updateSellerNotificationsError(err));
  }
}

/**
 * get seller notifications
 */
function* getSellerNotificationsSaga(action) {
  try {
    yield put(getSellerNotificationsPending(true))
    const res = yield call(getSellerNotificationsApi, action.payload)

    if (res.success) {
      yield put(getSellerNotificationsSuccess(res.data))
    } else {
      yield put(getSellerNotificationsError(res))
    }
  } catch (err) {
    yield put(getSellerNotificationsError(err));
  }
}

/**
 * verify seller email
 */
function* verifySellerEmailSaga(action) {
  try {
    yield put(verifySellerEmailPending(true))
    const res = yield call(verifySellerEmailApi, action.payload)
    if (res.success) {
      yield put(verifySellerEmailSuccess(res.data))
    } else {
      yield put(verifySellerEmailError(res))
    }
  } catch (error) {
    yield put(verifySellerEmailError(true))
  }
}

/**
 * seller email verified
 */
function* sellerEmailVerifiedSaga(action) {
  try {
    yield put(sellerEmailVerifiedPending(true))
    const res = yield call(sellerEmailVerifiedApi, action.payload)
    if (res.success) {
      yield put(sellerEmailVerifiedSuccess(res))
    } else {
      yield put(sellerEmailVerifiedError(res))
    }
  } catch (error) {
    yield put(sellerEmailVerifiedError(error))
  }
}

/**
 * Delete Seller Product
 */
function* deleteSellerProductSaga(action) {
  try {
    yield put(deleteSellerProductPending(true))
    const res = yield call(delteteSellerProductApi, action.payload)
    if (res.success) {
      yield put(deleteSellerProductSuccess(res.data))
      yield put(setAlert('success', res.message))
    } else {
      yield put(deleteSellerProductError(res))
      yield put(setAlert('danger', res.message))
    }
  } catch (error) {
    yield put(deleteSellerProductError(error))
  }
}

/**
 * Add Selected Product
 */
function* addSelectedProductSaga(action) {
  try {
    yield put(addSelectedProductPending(true))
    const res = yield call(addSelectedProductApi, action.payload)
    if (res.success) {
      yield put(addSelectedProductSuccess(res.data))
      yield put(setAlert('success', res.message))
      // history.push(myproduct)
    } else {
      yield put(addSelectedProductError(res))
      yield put(setAlert('danger', res.message))
    }
  } catch (error) {
    yield put(addSelectedProductError(error))
  }
}
/**
 * Update Seller Product
 */
function* updateSellerProductSaga(action) {
  try {
    yield put(updateSellerProductPending(true))
    const {
      formData,
      redirectTab,
      handleToggle
    } = action.payload
    let res;
    if (formData) res = yield call(updateSellerProductApi, formData)
    else res = yield call(updateSellerProductApi, action.payload)
    if (res.success) {
      yield put(updateSellerProductSuccess(res.data))
      yield put(setAlert('success', res.message))
      if (handleToggle) {
        handleToggle(null)
      }
      if (redirectTab) {
        // history.push(`${bp}/?limit=10&skip=0&tab=${redirectTab}&redirect=true`)
        yield put(setAlert('danger', "Complete business profile"))
        // handleToggle && 
      }
      // history.push(myproduct)
    } else {
      yield put(updateSellerProductError(res))
      yield put(setAlert('danger', res.message))
    }
  } catch (error) {
    yield put(updateSellerProductError(error))
  }
}
/**
 * Get Seller Product
 */
function* getSellerProductSaga(action) {
  try {
    yield put(getSellerProductPending(true))
    const res = yield call(getSellerProductAPI, action.payload)
    if (res.success) {
      yield put(getSellerProductSuccess(res.data.sellerProduct))
      yield put(setAlert('success', res.message))
      if (res.success && res.data && res.data.chatTemplat && res.data.chatTemplat._id) {
        const { name, questions, _id } = res.data.chatTemplat
        yield put(setChatCategory(
          {
            catName: name,
            language: localStorage.getItem('chatLanguage') || "en",
            questions: questions && questions[localStorage.getItem('chatLanguage') || "en"],
            selected: _id
          }
        ))
      }
    } else {
      yield put(getSellerProductError(res))
      yield put(setAlert('danger', res.message))
    }
  } catch (error) {
    yield put(getSellerProductError(error))
  }
}
/**
 * Get Filtered Cities
 */
function* getFilteredCitiesSaga(action) {
  try {
    yield put(getFilteredCitiesPending(true))
    const res = yield call(getFilteredCitiesAPI, action.payload)
    if (res.success) {
      yield put(getFilteredCitiesSuccess(res.data))
    } else {
      yield put(getFilteredCitiesError(res))
      yield put(setAlert('danger', res.message))
    }
  } catch (error) {
    yield put(getFilteredCitiesError(error))
  }
}

/**
 * Get Buyer Enquiries
 */
function* getBuyerEnquiriesSaga(action) {
  try {
    yield put(getBuyerEnquiriesPending(true))
    const res = yield call(getBuyerEnquiryAPI, action.payload)
    if (res.success) {
      yield put(getBuyerEnquiriesSuccess(res.data))
    } else {
      yield put(getBuyerEnquiriesError(res))
      // yield put(setAlert('danger', res.message))
    }
  } catch (error) {
    yield put(getBuyerEnquiriesError(error))
  }
}

/**
 * delete seller doc api
 */
function* deleteDocSaga(action) {
  try {
    yield put(deleteSellerDocumentPending(true))
    const res = yield call(deleteSellerDocApi, action.payload)
    if (res.success) {
      localStorage.setItem('userId', res.data._id)
      yield put(deleteSellerDocumentSuccess(res.data.data || res.data))
    } else {
      yield put(deleteSellerDocumentError(res))
    }
  } catch (err) {
    yield put(deleteSellerDocumentError(err));
  }
}
// export function* getEmailAlertsSaga(action) {
//   try {
//     yield put(getEmailAlertsPending(true));
//     const res = yield call(getEmailAlertsApi, action.payload);
//     if (res.success) {
//       yield put(getEmailAlertsSuccess(res.data));
//     } else {
//       yield put(getEmailAlertsError(res));
//     }
//   } catch (error) {
//     yield put(getEmailAlertsError(error));
//   }
// }

// export function* setSavedSearchAlertSaga(action) {
//   try {
//     yield put(setSavedSearchAlertPending(true));
//     const res = yield call(setSavedSearchAlertApi, action.payload);
//     if (res.success) {
//       yield put(setSavedSearchAlertSuccess(res.data));
//       //   yield put(setAlert('success', res.message))
//     } else {
//       yield put(setSavedSearchAlertError(res));
//       //   yield put(setAlert('danger', res.message))
//     }
//   } catch (error) {
//     yield put(setSavedSearchAlertError(error));
//   }
// }

// export function* updateEmailAlertSaga(action) {
//   try {
//     yield put(updateEmailAlertPending(true));
//     const res = yield call(updateEmailAlertApi, action.payload);
//     if (res.success) {
//       yield put(updateEmailAlertSuccess(res.data));
//       //   yield put(setAlert('success', res.message))
//     } else {
//       yield put(updateEmailAlertError(res));
//       //   yield put(setAlert('danger', res.message))
//     }
//   } catch (error) {
//     yield put(updateEmailAlertError(error));
//     // yield put(setAlert('danger', error.message))
//   }
// }

/*

ACTION WATCHERS

*/

export function* getSellerProfileWatcher() {
  yield takeLatest(seller.GET_SELLER_PROFILE, getSellerProfileSaga)
}

export function* updateSellerProfileWatcher() {
  yield takeLatest(seller.UPDATE_SELLER_PROFILE, updateSellerProfileSaga)
}

export function* updateSellerNotificationsWatcher() {
  yield takeLatest(
    seller.UPDATE_SELLER_NOTIFICATION,
    updateSellerNotificationsSaga,
  )
}

export function* getSellerNotificationsWatcher() {
  yield takeLatest(seller.GET_SELLER_NOTIFICATION, getSellerNotificationsSaga)
}

export function* verifySellerEmailWatcher() {
  yield takeLatest(seller.VERIFY_SELLER_EMAIL, verifySellerEmailSaga)
}

export function* sellerEmailVerifiedWatcher() {
  yield takeLatest(seller.SELLER_EMAIL_VERIFIED, sellerEmailVerifiedSaga)
}
export function* deleteSellerProductWatcher() {
  yield takeLatest(seller.DELETE_SELLER_PRODUCT, deleteSellerProductSaga)
}
export function* addSelectedProductWatcher() {
  yield takeLatest(seller.ADD_SELECTED_PRODUCTS, addSelectedProductSaga)
}
export function* updateSellerProductWatcher() {
  yield takeLatest(seller.UPDATE_SELLER_PRODUCT, updateSellerProductSaga)
}
export function* getSellerProductWatcher() {
  yield takeLatest(seller.GET_SELLER_PRODUCT, getSellerProductSaga)
}
export function* getFilteredCitiesWatcher() {
  yield takeLatest(seller.GET_FILTERED_CITIES, getFilteredCitiesSaga)
}
export function* getBuyerEnquiriesWatcher() {
  yield takeLatest(seller.GET_BUYER_ENQUIRIES, getBuyerEnquiriesSaga)
}
export function* deleteDocumentWatcher() {
  yield takeLatest(seller.DELETE_SELLER_DOC, deleteDocSaga)
}
// export function* getEmailAlertsWatcher() {

//   yield takeLatest(seller.GET_EMAIL_ALERTS, getEmailAlertsSaga)

// }

// export function* setSavedSearchAlertWatcher() {

//   yield takeLatest(seller.SET_SAVED_SEARCH_ALERT, setSavedSearchAlertSaga)

// }

// export function* updateEmailAlertWatcher() {

//   yield takeLatest(seller.UPDATE_EMAIL_ALERT, updateEmailAlertSaga)

// }