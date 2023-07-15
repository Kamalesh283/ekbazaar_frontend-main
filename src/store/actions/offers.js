import { actionTypes } from '../../utils/constants'

const { buyer, seller } = actionTypes

/**
 * GET ALL OFFERS
 */
 export const getAllOffers = (data) => {
  return {
    type: seller.GET_ALL_OFFERS,
    payload: data
  }
}

export const getAllOffersPending = (data) => {
  return {
    type: seller.GET_ALL_OFFERS_PENDING,
    payload: data
  }
}

export const getAllOffersSuccess = (data) => {
  return {
    type: seller.GET_ALL_OFFERS_SUCCESS,
    payload: data
  }
}

export const getAllOffersError = (data) => {
  return {
    type: seller.GET_ALL_OFFERS_ERROR,
    payload: data
  }
}

/**
 * Get Seller Offers
 */
export const getSellerOffers = (data) => {
    return {
        type: seller.GET_SELLER_OFFERS,
        payload: data
    }
}

export const getSellerOffersPending = (data) => {
    return {
        type: seller.GET_SELLER_OFFERS_PENDING,
        payload: data
    }
}

export const getSellerOffersSuccess = (data) => {
    return {
        type: seller.GET_SELLER_OFFERS_SUCCESS,
        payload: data
    }
}

export const getSellerOffersError = (data) => {
    return {
        type: seller.GET_SELLER_OFFERS_ERROR,
        payload: data
    }
}

/**
* Get Buyer request
*/
export const getBuyerRequest = (data) => {
    return {
        type: buyer.GET_BUYER_REQUEST,
        payload: data
    }
}

export const getBuyerRequestPending = (data) => {
    return {
        type: buyer.GET_BUYER_REQUEST_PENDING,
        payload: data
    }
}

export const getBuyerRequestSuccess = (data) => {
    return {
        type: buyer.GET_BUYER_REQUEST_SUCCESS,
        payload: data
    }
}

export const getBuyerRequestError = (data) => {
    return {
        type: buyer.GET_BUYER_REQUEST_ERROR,
        payload: data
    }
}

/**
* Post Buyer request
*/
export const postBuyerRequest = (data) => {
    return {
        type: buyer.POST_BUYER_REQUEST,
        payload: data
    }
}

export const postBuyerRequestPending = (data) => {
    return {
        type: buyer.POST_BUYER_REQUEST_PENDING,
        payload: data
    }
}

export const postBuyerRequestSuccess = (data) => {
    return {
        type: buyer.POST_BUYER_REQUEST_SUCCESS,
        payload: data
    }
}

export const postBuyerRequestError = (data) => {
    return {
        type: buyer.POST_BUYER_REQUEST_ERROR,
        payload: data
    }
}

/**
* Get Seller Offers
*/
export const postSellerOfferContact = (data) => {
    return {
        type: seller.POST_SELLER_CONTACT_OFFERS,
        payload: data
    }
}

export const postSellerOfferContactPending = (data) => {
    return {
        type: seller.POST_SELLER_CONTACT_OFFERS_PENDING,
        payload: data
    }
}

export const postSellerOfferContactSuccess = (data) => {
    return {
        type: seller.POST_SELLER_CONTACT_OFFERS_SUCCESS,
        payload: data
    }
}

export const postSellerOfferContactError = (data) => {
    return {
        type: seller.POST_SELLER_CONTACT_OFFERS_ERROR,
        payload: data
    }
}


/**
* Delete Buyer Requesr
*/
export const deleteBuyerRequest = (data) => {
    return {
        type: buyer.DELETE_BUYER_REQUEST,
        payload: data
    }
}

export const deleteBuyerRequestPending = (data) => {
    return {
        type: buyer.DELETE_BUYER_REQUEST_PENDING,
        payload: data
    }
}

export const deleteBuyerRequestSuccess = (data) => {
    return {
        type: buyer.DELETE_BUYER_REQUEST_SUCCESS,
        payload: data
    }
}

export const deleteBuyerRequestError = (data) => {
    return {
        type: buyer.DELETE_BUYER_REQUEST_ERROR,
        payload: data
    }
}