import { actionTypes } from '../../utils/constants'
const { seller } = actionTypes
const initialState = {
    trialPlan: {
        trialPlan: {},
        pending: false,
        success: false,
        error: false
    },
    subscriptionId: {},
    orderId: {
        orderId: {},
        pending: false,
        error: false,
        success: false
    },
    paymentId: {
        paymentId: {},
        pending: false,
        success: false,
        error: false
    },
    orderPlaced: {
        orderPlaced: {},
        pending: false,
        error: false,
        success: false
    },
    subscriptionPlaced: {
        subscriptionPlaced: {},
        pending:false,
        success:false,
        error:false
    },
    orders: {
        orders:[],
        pending: false,
        error: false,
        success: false
    },
    cancelSubscription:{
        cancelResponse:{},
        pending: false,
        success: false,
        error: false
    }
}
export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case seller.ACTIVATE_TRIAL_PLAN_PENDING:
            return {
                ...state,
                trialPlan: {
                    // ...state.trialPlan,
                    pending: true,
                    success: false,
                    error: false,
                },
            };
        case seller.ACTIVATE_TRIAL_PLAN_SUCCESS:
            return {
                ...state,
                trialPlan: {
                    trialPlan: payload,
                    pending: false,
                    success: true,
                    error: false,
                },
            };
        case seller.ACTIVATE_TRIAL_PLAN_ERROR:
            return {
                ...state,
                trialPlan: {
                    // trialPlan: {},
                    pending: false,
                    success: false,
                    error: true,
                },
            };

        // CREATE ORDER ID
        case seller.CREATE_ORDERS_ID_PENDING:
            return {
                ...state,
                orderId: {
                    // ...state.trialPlan,
                    pending: true,
                    success: false,
                    error: false,
                },
            };
        case seller.CREATE_ORDERS_ID_SUCCESS:
            return {
                ...state,
                orderId: {
                    orderId: payload,
                    pending: false,
                    success: true,
                    error: false,
                },
            };
        case seller.CREATE_ORDERS_ID_ERROR:
            return {
                ...state,
                orderId: {
                    // trialPlan: {},
                    pending: false,
                    success: false,
                    error: true,
                },
            };

        case seller.CREATE_PAYMENT_ID_PENDING:
            return {
                ...state,
                paymentId: {
                    pending: true,
                    success: false,
                    error: false
                }
            }    
        
        case seller.CREATE_PAYMENT_ID_SUCCESS:
            return {
                ...state,
                paymentId: {
                    paymentId: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }

        case seller.CREATE_PAYMENT_ID_ERROR:
            return {
                ...state,
                paymentId: {
                    pending: false,
                    success: false,
                    error: true
                }
            }    
        // Capture payment
        case seller.CAPTURE_ORDER_PENDING:
            return {
                ...state,
                orderPlaced: {
                    // ...state.trialPlan,
                    pending: true,
                    success: false,
                    error: false,
                },
            };
        case seller.CAPTURE_ORDER_SUCCESS:
            return {
                ...state,
                orderPlaced: {
                    orderPlaced: payload,
                    pending: false,
                    success: true,
                    error: false,
                },
            };
        case seller.CAPTURE_ORDER_ERROR:
            return {
                ...state,
                orderPlaced: {
                    // trialPlan: {},
                    pending: false,
                    success: false,
                    error: true,
                },
            };

        // Capture Subscription payment
        case seller.CAPTURE_SUBSCRIPTION_PENDING:
            return {
                ...state,

                subscriptionPlaced: {
                    // ...state.trialPlan,
                    pending: true,
                    success: false,
                    error: false,
                },
            };
        case seller.CAPTURE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                subscriptionPlaced: {
                    subscriptionPlaced: payload,
                    pending: false,
                    success: true,
                    error: false,
                },
            };
        case seller.CAPTURE_SUBSCRIPTION_ERROR:
            return {
                ...state,
                subscriptionPlaced: {
                    // trialPlan: {},
                    pending: false,
                    success: false,
                    error: true,
                },
            };    

        case seller.SET_SUBSCRIPTION_ID:
            return {
                ...state,
                subscriptionId: payload
            };
        case seller.CLEAR_SUBSCRIPTION_ID:
            return {
                ...state,
                subscriptionId: {}
            };

        // get seller orders
        case seller.GET_ORDERS_PENDING:
            return {
                ...state,
                orders: {
                    // ...state.trialPlan,
                    pending: true,
                    success: false,
                    error: false,
                },
            };
        case seller.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: {
                    orders: payload,
                    pending: false,
                    success: true,
                    error: false,
                },
            };
        case seller.GET_ORDERS_ERROR:
            return {
                ...state,
                orders: {
                    // trialPlan: {},
                    pending: false,
                    success: false,
                    error: true,
                },
            };
        case seller.CANCEL_SUBSCRIPTION_PENDING:
            return {
                ...state,
                cancelSubscription: {
                    pending: true,
                    success: false,
                    error: false,
                }
            }
        case seller.CANCEL_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                cancelSubscription: {
                    cancelResponse: payload,
                    pending: false,
                    success: true,
                    error: false,
                }
            }
        case seller.CANCEL_SUBSCRIPTION_ERROR:
            return {
                ...state,
                cancelSubscription: {
                    pending: false,
                    success: false,
                    error: true,
                }
            }
        default:
            return state;
    }
}