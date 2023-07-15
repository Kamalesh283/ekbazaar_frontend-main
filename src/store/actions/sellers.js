import { actionTypes } from '../../utils/constants'
const { seller } = actionTypes

/**
 * get seller profile
 */
export const getSellerProfile = (data) => {
  return {
    type: seller.GET_SELLER_PROFILE,
    payload: data,
  }
}

export const getSellerProfilePending = (bool) => {
  return {
    type: seller.GET_SELLER_PROFILE_PENDING,
    payload: bool,
  }
}

export const getSellerProfileSuccess = (data) => {
  return {
    type: seller.GET_SELLER_PROFILE_SUCCESS,
    payload: data,
  }
}

export const getSellerProfileError = (data) => {
  return {
    type: seller.GET_SELLER_PROFILE_ERROR,
    payload: data,
  }
}

/**
 * update seller profile
 */
export const updateSellerProfile = (data) => {
  return {
    type: seller.UPDATE_SELLER_PROFILE,
    payload: data,
  }
}

export const updateSellerProfilePending = (bool) => {
  return {
    type: seller.UPDATE_SELLER_PROFILE_PENDING,
    payload: bool,
  }
}

export const updateSellerProfileSuccess = (data) => {
  return {
    type: seller.UPDATE_SELLER_PROFILE_SUCCESS,
    payload: data,
  }
}

export const updateSellerProfileError = (data) => {
  return {
    type: seller.UPDATE_SELLER_PROFILE_ERROR,
    payload: data,
  }
}

/**
 * update seller notifications
 */
export const updateSellerNotifications = (data) => {
  return {
    type: seller.UPDATE_SELLER_NOTIFICATION,
    payload: data,
  }
}

export const updateSellerNotificationsPending = (bool) => {
  return {
    type: seller.UPDATE_SELLER_NOTIFICATION_PENDING,
    payload: bool,
  }
}

export const updateSellerNotificationsSuccess = (data) => {
  return {
    type: seller.UPDATE_SELLER_NOTIFICATION_SUCCESS,
    payload: data,
  }
}

export const updateSellerNotificationsError = (data) => {
  return {
    type: seller.UPDATE_SELLER_NOTIFICATION_ERROR,
    payload: data,
  }
}

/**
 * get seller notifications
 */
export const getSellerNotifications = (data) => {
  return {
    type: seller.GET_SELLER_NOTIFICATION,
    payload: data,
  }
}

export const getSellerNotificationsPending = (bool) => {
  return {
    type: seller.GET_SELLER_NOTIFICATION_PENDING,
    payload: bool,
  }
}

export const getSellerNotificationsSuccess = (data) => {
  return {
    type: seller.GET_SELLER_NOTIFICATION_SUCCESS,
    payload: data,
  }
}

export const getSellerNotificationsError = (data) => {
  return {
    type: seller.GET_SELLER_NOTIFICATION_ERROR,
    payload: data,
  }
}

/**
 * verify seller email
 */
export const verifySellerEmail = (data) => {
  return {
    type: seller.VERIFY_SELLER_EMAIL,
    payload: data,
  }
}

export const verifySellerEmailPending = (data) => {
  return {
    type: seller.VERIFY_SELLER_EMAIL_PENDING,
    payload: data,
  }
}

export const verifySellerEmailSuccess = (data) => {
  return {
    type: seller.VERIFY_SELLER_EMAIL_SUCCESS,
    payload: data,
  }
}

export const verifySellerEmailError = (data) => {
  return {
    type: seller.VERIFY_SELLER_EMAIL_ERROR,
    payload: data,
  }
}

/**
 * seller email verified
 */
export const sellerEmailVerified = (data) => {
  return {
    type: seller.SELLER_EMAIL_VERIFIED,
    payload: data,
  }
}

export const sellerEmailVerifiedPending = (bool) => {
  return {
    type: seller.SELLER_EMAIL_VERIFIED_PENDING,
    payload: bool,
  }
}

export const sellerEmailVerifiedSuccess = (data) => {
  return {
    type: seller.SELLER_EMAIL_VERIFIED_SUCCESS,
    payload: data,
  }
}

export const sellerEmailVerifiedError = (data) => {
  return {
    type: seller.SELLER_EMAIL_VERIFIED_ERROR,
    payload: data,
  }
}

/**
 * edit seller's product info
 */
export const editProductInfo = (data) => {
  return {
    type: seller.EDIT_PRODUCT_INFO,
    payload: data,
  }
}

/**
 * delete product
 */
export const deleteSellerProduct = (data) => {
  return {
    type: seller.DELETE_SELLER_PRODUCT,
    payload: data,
  }
}

export const deleteSellerProductPending = (bool) => {
  return {
    type: seller.DELETE_SELLER_PRODUCT_PENDING,
    payload: bool,
  }
}

export const deleteSellerProductSuccess = (data) => {
  return {
    type: seller.DELETE_SELLER_PRODUCT_SUCCESS,
    payload: data,
  }
}

export const deleteSellerProductError = (data) => {
  return {
    type: seller.DELETE_SELLER_PRODUCT_ERROR,
    payload: data,
  }
}
/**
 * add selected product
 */
export const addSelectedProduct = (data) => {
  return {
    type: seller.ADD_SELECTED_PRODUCTS,
    payload: data,
  }
}
export const addSelectedProductPending = (bool) => {
  return {
    type: seller.ADD_SELECTED_PRODUCTS_PENDING,
    payload: bool,
  }
}

export const addSelectedProductSuccess = (data) => {
  return {
    type: seller.ADD_SELECTED_PRODUCTS_SUCCESS,
    payload: data,
  }
}

export const addSelectedProductError = (data) => {
  return {
    type: seller.ADD_SELECTED_PRODUCTS_ERROR,
    payload: data,
  }
}
/**
 * update seller product
 */
export const updateSellerProduct = (data) => {
  return {
    type: seller.UPDATE_SELLER_PRODUCT,
    payload: data,
  }
}
export const updateSellerProductPending = (bool) => {
  return {
    type: seller.UPDATE_SELLER_PRODUCT_PENDING,
    payload: bool,
  }
}

export const updateSellerProductSuccess = (data) => {
  return {
    type: seller.UPDATE_SELLER_PRODUCT_SUCCESS,
    payload: data,
  }
}

export const updateSellerProductError = (data) => {
  return {
    type: seller.UPDATE_SELLER_PRODUCT_ERROR,
    payload: data,
  }
}

export const productSelection = (data) => {
  return {
    type: seller.PRODUCT_SELECTION,
    payload: data,
  }
}
/**
 * get seller product
 */
export const getSellerProduct = (data) => {
  return {
    type: seller.GET_SELLER_PRODUCT,
    payload: data,
  }
}
export const getSellerProductPending = (bool) => {
  return {
    type: seller.GET_SELLER_PRODUCT_PENDING,
    payload: bool,
  }
}

export const getSellerProductSuccess = (data) => {
  return {
    type: seller.GET_SELLER_PRODUCT_SUCCESS,
    payload: data,
  }
}

export const getSellerProductError = (data) => {
  return {
    type: seller.GET_SELLER_PRODUCT_ERROR,
    payload: data,
  }
}
/**
 * get filtered cities
 */
export const getFilteredCities = (data) => {
  return {
    type: seller.GET_FILTERED_CITIES,
    payload: data,
  }
}
export const getFilteredCitiesPending = (bool) => {
  return {
    type: seller.GET_FILTERED_CITIES_PENDING,
    payload: bool,
  }
}

export const getFilteredCitiesSuccess = (data) => {
  return {
    type: seller.GET_FILTERED_CITIES_SUCCESS,
    payload: data,
  }
}

export const getFilteredCitiesError = (data) => {
  return {
    type: seller.GET_FILTERED_CITIES_ERROR,
    payload: data,
  }
}

export const updateStatus = () => {
  return {
    type: seller.UPDATE_STATUS,
    payload: {success : false},
  }
}

/**
 * get buyer enquires
 */
export const getBuyerEnquiries = (data) => {
  return {
    type: seller.GET_BUYER_ENQUIRIES,
    payload: data,
  }
}

export const getBuyerEnquiriesPending = (bool) => {
  return {
    type: seller.GET_BUYER_ENQUIRIES_PENDING,
    payload: bool,
  }
}

export const getBuyerEnquiriesSuccess = (data) => {
  return {
    type: seller.GET_BUYER_ENQUIRIES_SUCCESS,
    payload: data,
  }
}

export const getBuyerEnquiriesError = (data) => {
  return {
    type: seller.GET_BUYER_ENQUIRIES_ERROR,
    payload: data,
  }
}

/**
 * delete seller doc
 */
export const deleteSellerDocument = (data) => {
  return {
    type: seller.DELETE_SELLER_DOC,
    payload: data,
  }
}

export const deleteSellerDocumentPending = (bool) => {
  return {
    type: seller.DELETE_SELLER_DOC_PENDING,
    payload: bool,
  }
}

export const deleteSellerDocumentSuccess = (data) => {
  return {
    type: seller.DELETE_SELLER_DOC_SUCCESS,
    payload: data,
  }
}

export const deleteSellerDocumentError = (data) => {
  return {
    type: seller.DELETE_SELLER_DOC_ERROR,
    payload: data,
  }
}
