import { actionTypes } from '../../utils/constants'
const { search } = actionTypes

const initialState = {
    sellers: {
        seller: [],
        pending: false,
        success: false,
        error: false
    },
    products: {
        product: [],
        pending: false,
        success: false,
        error: false
    }
}

export default function (state = initialState, action) {

    const { type, payload } = action
    switch (type) {

        case search.GET_ALL_SELLERS_PENDING: {
            return {
                ...state,
                sellers: {
                    ...state.sellers,
                    pending: payload
                }
            }

        }

        case search.GET_ALL_SELLERS_SUCCESS: {
            return {
                ...state,
                sellers: {
                    seller: payload,
                    pending: false,
                    succuss: true,
                    error: false
                }
            }

        }

        case search.GET_ALL_SELLERS_ERROR: {
            return {
                ...state,
                sellers: {
                    ...state.sellers,
                    error: true,
                    pending: false
                }
            }

        }

        case search.ALL_CITY: {
            return {
                ...state,
                sellers: {
                    ...state.sellers,
                    seller: {
                        ...state.sellers.seller,
                        city: ""
                    }

                }
            }
        }

        case search.SEARCH_PENDING: {
            return {
                ...state,
                products: {
                    product: [],
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }

        case search.SEARCH_SUCCESS: {
            return {
                ...state,
                products: {
                    product: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }

        case search.SEARCH_PENDING: {
            return {
                ...state,
                products: {
                    product: [],
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        default:
            return state

    }
}