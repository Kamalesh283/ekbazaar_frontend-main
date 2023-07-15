import { actionTypes } from '../../utils/constants'
const { seller, buyer } = actionTypes

const initialState = {
    offers: {
        offersCount: [],
        pending: false,
        success: false,
        error: false
    },
    sellerOffers: {
        sellerOffers: [],
        pending: false,
        success: false,
        error: false
    },
    sellerOfferContact: {
        sellerOfferContact: {},
        pending: false,
        success: false,
        error: false
    },
    buyerRequest: {
        buyerRequest: [],
        pending: false,
        success: false,
        error: false
    },
    buyerOfferRequest: {
        buyerOfferRequest: {},
        pending: false,
        success: false,
        error: false
    },
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case seller.GET_ALL_OFFERS_PENDING: {
            return {
                ...state,
                offers: {
                    ...state.offers,
                    pending: true
                }
            }
        }
        case seller.GET_ALL_OFFERS_SUCCESS: {
            return {
                ...state,
                offers: {
                    offersCount: payload.offersCount,
                    pending: false,
                    success: true
                }
            }
        }
        case seller.GET_ALL_OFFERS_ERROR: {
            return {
                ...state,
                offers: {
                    offersCount: [],
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }
        case seller.GET_SELLER_OFFERS_PENDING: {
            return {
                ...state,
                sellerOffers: {
                    sellerOffers: [],
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case seller.GET_SELLER_OFFERS_SUCCESS: {
            return {
                ...state,
                sellerOffers: {
                    sellerOffers: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case seller.GET_SELLER_OFFERS_ERROR: {
            return {
                ...state,
                sellerOffers: {
                    sellerOffers: [],
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        case seller.POST_SELLER_CONTACT_OFFERS_PENDING: {
            return {
                ...state,
                sellerOfferContact: {
                    sellerOfferContact: {},
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case seller.POST_SELLER_CONTACT_OFFERS_SUCCESS: {
            return {
                ...state,
                sellerOfferContact: {
                    sellerOfferContact: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case seller.POST_SELLER_CONTACT_OFFERS: {
            return {
                ...state,
                sellerOfferContact: {
                    sellerOfferContact: {},
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        // case buyer.DELETE_BUYER_REQUEST_PENDING:
        case buyer.GET_BUYER_REQUEST_PENDING: {
            return {
                ...state,
                buyerRequest: {
                    ...state.buyerRequest,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        // case buyer.DELETE_BUYER_REQUEST_SUCCESS:
        case buyer.GET_BUYER_REQUEST_SUCCESS: {
            return {
                ...state,
                buyerRequest: {
                    buyerRequest: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }

        // case buyer.DELETE_BUYER_REQUEST_ERROR:
        case buyer.GET_BUYER_REQUEST_ERROR: {
            return {
                ...state,
                buyerRequest: {
                    ...state.buyerRequest,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        case buyer.POST_BUYER_REQUEST_PENDING: {
            return {
                ...state,
                buyerOfferRequest: {
                    buyerOfferRequest: {},
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case buyer.POST_BUYER_REQUEST_SUCCESS: {
            return {
                ...state,
                buyerOfferRequest: {
                    buyerOfferRequest: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case buyer.POST_BUYER_REQUEST_ERROR: {
            return {
                ...state,
                buyerOfferRequest: {
                    buyerOfferRequest: {},
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        default:
            return state;
    }
}