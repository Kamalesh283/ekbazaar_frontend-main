import request from '../request'

/**
 * swgger_document Done
 */
export const acticateTrialPlan = (data) => {
    const url = "acticateTrialPlan"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const createOrderIdApi = (data) => {
    const url = "createRazorPayOrder"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const createPaymentIdApi = (data) => {
    const url = 'createRazorPayPaymentLink'
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const captureRazorPayOrderApi = (data) => {
    const { paymentId } = data
    const url = `captureRazorPayPayment/${paymentId}`
    return request({
        url,
        data,
        method: 'post'
    })
}
/**
 * swgger_document Done
 */
export const captureRazorPaySubscriptionApi = (data) => {
    const url = `fetchSubscriptionPayment`
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * Not in Use
 */
export const checkPaymentStatusApi = (data) => {
    const { paymentId } = data;
    const url = `checkPaymentStatus/${paymentId}`
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const getOrdersApi = (data) => {
    let url = "getSellerOrders";
    return request({
        url,
        params: data,
        method: "get",
    });
};

/**
 * swgger_document Done
 */
export const cancleSubscriptionApi = (data) => {
    let url = "cancleSubscription";
    return request({
        url,
        data,
        method: 'post'
    })
}