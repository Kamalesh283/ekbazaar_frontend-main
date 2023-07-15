import request from '../request'
import { generateTendersQueryString } from './apiHelper'

/**
 * get seller profile
 * swgger_document Done
 */
export const getSellerProfileApi = (data) => {
  let url = 'seller?'
  if (data.sellerId) {
    // url += 'id=' + data.sellerId
  }
  return request({
    url,
    // data,
    params: {
      id: data.sellerId,
      elastic: data.elastic
    },
    method: 'get',
  })
}

/**
 * update seller profile
 * swgger_document Done
 */
export const updateSellerProfileApi = (data,flag) => {
  const url = 'seller'
  return request({
    url,
    data,
    method: 'put',
    // headers:{
    //   'content-type':'multipart/form-data'
    // }
    headers:{
      'content-type': flag ? 'multipart/form-data' : 'application/json'
    }
  })
}

/**
 * update seller Notifications
 * not in Use
 */
export const updateSellerNotificationsApi = (data) => {
  const url = 'seller/user-notification'
  return request({
    url,
    data,
    method: 'post',
  })
}

/**
 * get seller notifications
 * not in use
 */
export const getSellerNotificationsApi = () => {
  const url = 'seller/user-notification'
  return request({
    url,
    method: 'get',
  })
}

/**
 * verify seller email
 * not in Use
 */
export const verifySellerEmailApi = (data) => {
  const url = 'seller/email-verification'
  return request({
    url,
    data,
    method: 'post',
  })
}

/**
 * seller email vberified
 * not in use
 */
export const sellerEmailVerifiedApi = (data) => {
  const url = 'seller/email-verified'
  return request({
    url,
    data,
    method: 'post',
  })
}

/**
 *  not is use 
 */
export const userRegistrationApi = (data) => {
  const url = 'v1/user/register'
  return request({
    url,
    data,
    method: 'POST',
  })
}

/**
 *  not is use 
 */
export const getEmailAlertsApi = data => {

  const url = 'v1/user/emailAlerts'
  return request({
    url,
    method: 'get',
  })
}

/**
 *  not is use 
 */
export const setSavedSearchAlertApi = data => {
  const url = 'v1/user/emailAlerts'
  return request({
    url,
    data,
    method: 'POST',
  })
}

/**
 *  not is use 
 */
export const updateEmailAlertApi = (data) => {
  const url = 'v1/user/emailAlerts'
  return request({
    url,
    data,
    method: 'put',
  })
}

/**
 * delete product
 * swgger_document Done
 */
export const delteteSellerProductApi = (data) => {
  const url = 'sellerproduct/delete'
  return request({
    url,
    data,
    method: 'post',
  })
}
/**
 * Add Selected Product
 * swgger_document Done
 */
export const addSelectedProductApi = (data) => {
  const url = 'sellerproduct/add'
  return request({
    url,
    data,
    method: 'post',
  })
}
/**
 * Update Seller Product
 * swgger_document Done
 */
export const updateSellerProductApi = (data) => {
  const url = '/sellerproduct/update'
  return request({
    url,
    data,
    method: 'put',
    headers: {'content-type': 'multipart/form-data' }
  })
}
/**
 * Get Seller Product
 * swgger_document Done
 */
export const getSellerProductAPI = async (data) => {

  // const baseURL = '/sellerproduct/getProduct'

  // const url = generateTendersQueryString(baseURL,query)
  const url = '/getsellerproduct'

  return request({
      url,
      data,
      method: 'post'
  })
}
/**
 * Get Filtered Cities
 * not in Use
 */
export const getFilteredCitiesAPI = async (data) => {
  const url = '/getfilteredcities'

  return request({
      url,
      data,
      method: 'post'
  })
}
/**
 * Get Buyer Enquiry
 * swgger_document Done
 */
export const getBuyerEnquiryAPI = async (data) => {
  const {
    skip,
    limit,
    SellerId
  } = data;
  const url = `/buyer/rfp/${SellerId}/${skip}/${limit}`

  return request({
    url,
    data,
    method: 'get'
  })
}

/**
 * delete seller Document
 * swgger_document Done
 */
export const deleteSellerDocApi = (data, flag) => {
  const url = 'digital_space/delete'
  return request({
    url,
    data,
    method: 'delete',
  })
}