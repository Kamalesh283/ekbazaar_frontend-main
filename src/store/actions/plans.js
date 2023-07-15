import { data } from "autoprefixer";
import { actionTypes } from "../../utils/constants";
const { seller } = actionTypes;

/**
 * Acticate trail plan
 */
export const activateTrialPlan = (data) => {
    return {
        type: seller.ACTIVATE_TRIAL_PLAN,
        payload: data,
    };
};

export const activateTrialPlanPending = (data) => {
    return {
        type: seller.ACTIVATE_TRIAL_PLAN_PENDING,
        payload: data,
    };
};

export const activateTrialPlanSuccess = (data) => {
    return {
        type: seller.ACTIVATE_TRIAL_PLAN_SUCCESS,
        payload: data,
    };
};

export const activateTrialPlanError = (data) => {
    return {
        type: seller.ACTIVATE_TRIAL_PLAN_ERROR,
        payload: data,
    };
};

// cREATE ORDERSID
export const createOrderId = (data) => {
    return {
        type: seller.CREATE_ORDERS_ID,
        payload: data,
    };
};

export const createOrderIdPending = (data) => {
    return {
        type: seller.CREATE_ORDERS_ID_PENDING,
        payload: data,
    };
};

export const createOrderIdSuccess = (data) => {
    return {
        type: seller.CREATE_ORDERS_ID_SUCCESS,
        payload: data,
    };
};

export const createOrderIdError = (data) => {
    return {
        type: seller.CREATE_ORDERS_ID_ERROR,
        payload: data,
    };
};

export const createPaymentId = (data) => {
    return{
        type: seller.CREATE_PAYMENT_ID,
        payload: data,
    };
};

export const createPaymentIdPending = (data) => {
    return{
        type: seller.CREATE_PAYMENT_ID_PENDING,
        payload: data
    };
}

export const createPaymentIdSuccess = (data) => {
    return {
        type: seller.CREATE_PAYMENT_ID_SUCCESS,
        payload: data
    };
}

export const createPaymentIdError = (data) => {
    return {
        type: seller.CREATE_PAYMENT_ID_ERROR,
        payload: data
    };
}

// Capture razorapay order
export const captureRazorPayOrder = (data, action) => {
    return {
        type: seller.CAPTURE_ORDER,
        payload: data,
    };
};

export const captureRazorPayOrderPending = (data) => {
    return {
        type: seller.CAPTURE_ORDER_PENDING,
        payload: data,
    };
};

export const captureRazorPayOrderSuccess = (data) => {
    return {
        type: seller.CAPTURE_ORDER_SUCCESS,
        payload: data,
    };
};

export const captureRazorPayOrderError = (data) => {
    return {
        type: seller.CAPTURE_ORDER_ERROR,
        payload: data,
    };
};

// Capture razorapay Subscription
export const captureRazorPaySubscription = (data, action) => {
    console.log(data,"11111111111111111111111")
    return {
        type: seller.CAPTURE_SUBSCRIPTION,
        payload: data,
    };
};

export const captureRazorPaySubscriptionPending = (data) => {
    return {
        type: seller.CAPTURE_SUBSCRIPTION_PENDING,
        payload: data,
    };
};

export const captureRazorPaySubscriptionSuccess = (data) => {
    return {
        type: seller.CAPTURE_SUBSCRIPTION_SUCCESS,
        payload: data,
    };
};

export const captureRazorPaySubscriptionError = (data) => {
    return {
        type: seller.CAPTURE_SUBSCRIPTION_ERROR,
        payload: data,
    };
};

// Set Subscription id
export const setSubscriptionId = (data) => {
    return {
        type: seller.SET_SUBSCRIPTION_ID,
        payload: data,
    };
};
export const clearSubscriptionId = () => {

    return {
        type: seller.CLEAR_SUBSCRIPTION_ID,
        payload: '',
    };
};

/**
 * orders
 */
export const getAllOrders = (data) => {

    return {
        type: seller.GET_ORDERS,
        payload: data
    }

}

export const getAllOrdersPending = (bool) => {

    return {
        type: seller.GET_ORDERS_PENDING,
        payload: bool
    }

}

export const getAllOrdersSuccess = (data) => {

    return {
        type: seller.GET_ORDERS_SUCCESS,
        payload: data
    }

}

export const getAllOrdersError = (data) => {

    return {
        type: seller.GET_ORDERS_ERROR,
        payload: data
    }

}

export const cancelSubscription = (data) => {
    return {
        type: seller.CANCEL_SUBSCRIPTION,
        payload: data
    }

}

export const cancelSubscriptionPending = (data) => {

    return {
        type: seller.CANCEL_SUBSCRIPTION_PENDING,
        payload: data
    }

}

export const cancelSubscriptionSuccess = (data) => {

    return {
        type: seller.CANCEL_SUBSCRIPTION_SUCCESS,
        payload: data
    }

}

export const cancelSubscriptionError = (data) => {

    return {
        type: seller.CANCEL_SUBSCRIPTION_ERROR,
        payload: data
    }

}