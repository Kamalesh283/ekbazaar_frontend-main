import request from '../request'
import ssoRequest from "../sso-request"


/**
 * swgger_document Done
 */
export const postRFPApi = (data) => {
  // const url = "buyer/rfp"
  // return request({
  //   url,
  //   data,
  //   method: 'post'
  // })
  const url = "user/rfp"
  return ssoRequest({
    url,
    data,
    method: 'post'
  })
}

/**
 * get seller profile
 * swgger_document Done
 */
export const getBuyerProfileApi = (data) => {

  const url = 'buyer'
  return request({
    url,
    data,
    method: 'get'
  })

}

/**
 * update buyer profile
 * swgger_document Done
 */
export const updateBuyerProfileApi = (data) => {

  const url = 'buyer'

  return request({
    url,
    data,
    method: 'put'
  })

}

/**
 * update buyer Notifications
 * not in use
 */
export const updateBuyerNotificationsApi = (data) => {

  const url = 'buyer/user-notification'
  return request({
    url,
    data,
    method: 'post'
  })

}

/**
 * get buyer notifications
 * not in use
 */
export const getBuyerNotificationsApi = () => {

  const url = 'buyer/user-notification'
  return request({
    url,
    method: 'get'
  })

}

/**
 * verify buyer email
 * not in use
 */
export const verifyBuyerEmailApi = data => {

  const url = 'buyer/email-verification'
  return request({
    url,
    data,
    method: 'post'
  })

}

/**
 * buyer email verified
 * not in use
 */
export const buyerEmailVerifiedApi = data => {

  const url = 'buyer/email-verified'
  return request({
    url,
    data,
    method: 'post'
  })

}

/** 
 * not in use
 */

export const userRegistrationApi = data => {

  const url = 'v1/user/register'
  return request({
    url,
    data,
    method: 'POST'
  })

}

/** 
 * not in use
 */
export const getEmailAlertsApi = data => {

  const url = 'v1/user/emailAlerts'
  return request({
    url,
    method: 'get'
  })

}

/** 
 * not in use
 */
export const setSavedSearchAlertApi = data => {

  const url = 'v1/user/emailAlerts'
  return request({
    url,
    data,
    method: 'POST'
  })

}

/** 
 * not in use
 */
export const updateEmailAlertApi = data => {

  const url = 'v1/user/emailAlerts'
  return request({
    url,
    data,
    method: 'put'
  })

}
