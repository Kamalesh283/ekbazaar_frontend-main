import { actionTypes } from '../../utils/constants'

const { buyer } = actionTypes

/**
 * post RFP
 */
export const postRFP = (data) => {
  return {
    type: buyer.POST_RFP,
    payload: data
  }
}

export const postRFPPending = (data) => {
  return {
    type: buyer.POST_RFP_PENDING,
    payload: data
  }
}

export const postRFPSuccess = (data) => {
  return {
    type: buyer.POST_RFP_SUCCESS,
    payload: data
  }
}

export const postRFPError = (data) => {
  return {
    type: buyer.POST_RFP_ERROR,
    payload: data
  }
}

/**
 * get buyer profile
 */
export const getBuyerProfile = (data) => {

  return {
    type: buyer.GET_BUYER_PROFILE,
    payload: data
  }

}

export const getBuyerProfilePending = (bool) => {

  return {
    type: buyer.GET_BUYER_PROFILE_PENDING,
    payload: bool
  }

}

export const getBuyerProfileSuccess = (data) => {

  return {
    type: buyer.GET_BUYER_PROFILE_SUCCESS,
    payload: data
  }

}

export const getBuyerProfileError = (data) => {

  return {
    type: buyer.GET_BUYER_PROFILE_ERROR,
    payload: data
  }

}

/**
 * update buyer profile
 */
export const updateBuyerProfile = (data) => {

  return {
    type: buyer.UPDATE_BUYER_PROFILE,
    payload: data
  }

}

export const updateBuyerProfilePending = (bool) => {

  return {
    type: buyer.UPDATE_BUYER_PROFILE_PENDING,
    payload: bool
  }

}

export const updateBuyerProfileSuccess = (data) => {

  return {
    type: buyer.UPDATE_BUYER_PROFILE_SUCCESS,
    payload: data
  }

}

export const updateBuyerProfileError = (data) => {

  return {
    type: buyer.UPDATE_BUYER_PROFILE_ERROR,
    payload: data
  }

}

/**
 * update buyer notifications
 */
export const updateBuyerNotifications = (data) => {

  return {
    type: buyer.UPDATE_BUYER_NOTIFICATION,
    payload: data
  }

}

export const updateBuyerNotificationsPending = (bool) => {

  return {
    type: buyer.UPDATE_BUYER_NOTIFICATION_PENDING,
    payload: bool
  }

}

export const updateBuyerNotificationsSuccess = (data) => {

  return {
    type: buyer.UPDATE_BUYER_NOTIFICATION_SUCCESS,
    payload: data
  }

}

export const updateBuyerNotificationsError = (data) => {

  return {
    type: buyer.UPDATE_BUYER_NOTIFICATION_ERROR,
    payload: data
  }

}

/**
 * get buyer notifications
 */
export const getBuyerNotifications = (data) => {

  return {
    type: buyer.GET_BUYER_NOTIFICATION,
    payload: data
  }

}

export const getBuyerNotificationsPending = (bool) => {

  return {
    type: buyer.GET_BUYER_NOTIFICATION_PENDING,
    payload: bool
  }

}

export const getBuyerNotificationsSuccess = (data) => {

  return {
    type: buyer.GET_BUYER_NOTIFICATION_SUCCESS,
    payload: data
  }

}

export const getBuyerNotificationsError = (data) => {

  return {
    type: buyer.GET_BUYER_NOTIFICATION_ERROR,
    payload: data
  }

}

/**
 * verify buyer email 
 */
export const verifyBuyerEmail = data => {

  return {
    type: buyer.VERIFY_BUYER_EMAIL,
    payload: data
  }

}

export const verifyBuyerEmailPending = data => {

  return {
    type: buyer.VERIFY_BUYER_EMAIL_PENDING,
    payload: data
  }

}

export const verifyBuyerEmailSuccess = data => {

  return {
    type: buyer.VERIFY_BUYER_EMAIL_SUCCESS,
    payload: data
  }

}

export const verifyBuyerEmailError = data => {

  return {
    type: buyer.VERIFY_BUYER_EMAIL_ERROR,
    payload: data
  }

}

/**
 * buyer email verified 
 */
export const buyerEmailVerified = (data) => {

  return {
    type: buyer.BUYER_EMAIL_VERIFIED,
    payload: data
  }

}

export const buyerEmailVerifiedPending = (bool) => {

  return {
    type: buyer.BUYER_EMAIL_VERIFIED_PENDING,
    payload: bool
  }

}

export const buyerEmailVerifiedSuccess = (data) => {

  return {
    type: buyer.BUYER_EMAIL_VERIFIED_SUCCESS,
    payload: data
  }

}

export const buyerEmailVerifiedError = (data) => {

  return {
    type: buyer.BUYER_EMAIL_VERIFIED_ERROR,
    payload: data
  }

}

/**
 * 
 * set seller mobile
 */
// export const setSellerMobile = data => {

//   return {
//     type: seller.SET_SELLER_MOBILE,
//     payload: data
//   }

// }
