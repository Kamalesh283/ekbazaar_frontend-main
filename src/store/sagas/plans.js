import _ from "lodash";
import { put, takeLatest, call, select } from "redux-saga/effects";
import { actionTypes } from "../../utils/constants";
import { setAlert } from "../actions/app";
import {
    activateTrialPlanError,
    activateTrialPlanSuccess,
    activateTrialPlanPending,
    createOrderIdError,
    createOrderIdPending,
    createOrderIdSuccess,
    createPaymentIdSuccess,
    createPaymentIdPending,
    createPaymentIdError,
    captureRazorPayOrderError,
    captureRazorPayOrderPending,
    captureRazorPayOrderSuccess,
    captureRazorPaySubscriptionError,
    captureRazorPaySubscriptionPending,
    captureRazorPaySubscriptionSuccess,
    captureRazorPaySubscription,
    getAllOrdersError,
    getAllOrdersPending,
    getAllOrdersSuccess,
    cancelSubscriptionPending,
    cancelSubscriptionError,
    cancelSubscriptionSuccess,
} from '../actions/plans'

import {
    getUserProfile
} from '../actions/common'

import {
    acticateTrialPlan,
    createOrderIdApi,
    createPaymentIdApi,
    captureRazorPayOrderApi,
    captureRazorPaySubscriptionApi,
    getOrdersApi,
    cancleSubscriptionApi
} from '../../utils/api/plans'
const { seller } = actionTypes;

/**
 * check user exist
 */
function* acticateTrialPlanSaga(action) {
    try {
        yield put(activateTrialPlanPending(true));
        const response = yield call(acticateTrialPlan, action.payload);
        if (response.success) {
            yield put(activateTrialPlanSuccess(response));
            yield put(setAlert("success", response.message));
            yield put(getUserProfile());
        } else {
            yield put(activateTrialPlanError(response));
            yield put(setAlert("danger", response.message));
        }
    } catch (error) {
        yield put(activateTrialPlanError(error));
        yield put(setAlert("danger", error.message));
    }
}

function* createOrderIdSaga(action) {
    const { payload } = action
    const { id, displayRazorPay } = payload
    try {
        yield put(createOrderIdPending(true));
        const response = yield call(createOrderIdApi, id);
        if (response.success) {
            yield put(createOrderIdSuccess(response.data));
            displayRazorPay()
            // yield put(setAlert("success", response.message));
            // yield put(getUserProfile());
        } else {
            yield put(createOrderIdError(response));
            yield put(setAlert("danger", response.message));
        }
    } catch (error) {
        yield put(createOrderIdError(error));
        yield put(setAlert("danger", error.message));
    }
}

function* createPaymentIdSaga(action) {
    const { payload } = action;
    const { id, showLinkSend} = payload;
    try {
        yield put(createPaymentIdPending(true));
        const response = yield call(createPaymentIdApi,id);
        if(response.success) {
            yield put(createPaymentIdSuccess(response.data));
            showLinkSend()
        } else {
            yield put(createPaymentIdError(response));
            yield put(setAlert("danger", response.message));
        }
    } catch (error) {
        yield put(createPaymentIdError(error));
        yield put(setAlert("danger", error.message));
    }

}

// Capture orders
function* captureRazorPayOrderSaga(action) {
    const { payload } = action
    const { data, paymentAction } = payload
    try {
        yield put(captureRazorPayOrderPending(true));
        const response = yield call(captureRazorPayOrderApi, data);
        if (response.success) {
            yield put(captureRazorPayOrderSuccess(response.data));
            if (response.data.payment === true) {
                yield put(getUserProfile());
                // yield put(setAlert("success", response.message));
            } else {
                yield put(setAlert("danger", response.message));
            }
            paymentAction(response.data.payment)
            // yield put(setAlert("success", response.message));
            // yield put(getUserProfile());
        } else {
            yield put(captureRazorPayOrderError(response));
            yield put(setAlert("danger", response.message));
        }
    } catch (error) {
        yield put(captureRazorPayOrderError(error));
        yield put(setAlert("danger", error.message));
    }
}

// Capture Subscriptions
function* captureRazorPaySubscriptionSaga(action) {
    const { payload } = action
    const { data, paymentAction } = payload
    try {
        yield put(captureRazorPaySubscriptionPending(true))
        const response = yield call(captureRazorPaySubscriptionApi,data)
        if (response.success) {
            yield put(captureRazorPaySubscriptionSuccess(response.data));
            if (response.data.payment === true) {
                yield put(getUserProfile());
                // yield put(setAlert("success", response.message));
                paymentAction(response.data.payment)
            }else if (response.data.recall === true && response.data.payment === false){
                yield put(getUserProfile());
                paymentAction('pending')
            }  else {
                yield put(setAlert("danger", response.message));
                paymentAction(response.data.payment)
            }
            // yield put(setAlert("success", response.message));
            // yield put(getUserProfile());
        } else {
            yield put(captureRazorPayOrderError(response));
            yield put(setAlert("danger", response.message));
        }
    } catch (error) {
        yield put(captureRazorPayOrderError(error));
        yield put(setAlert("danger", error.message));
    }
}

function* getAllOrdersSaga(action) {
    const {
        payload
    } = action

    try {
        yield put(getAllOrdersPending(true));
        const response = yield call(getOrdersApi, payload);
        if (response.success) {
            yield put(getAllOrdersSuccess(response.data));
        } else {
            yield put(getAllOrdersError(response));
            yield put(setAlert("danger", response.message));
        }
    } catch (error) {
        yield put(getAllOrdersError(error));
        yield put(setAlert("danger", error.message));
    }
}

function* cancelSubscriptionSaga(action) {
    const { payload } = action
    try {
        yield put(cancelSubscriptionPending(true));
        const response = yield call(cancleSubscriptionApi, payload);
        if (response.success) {
            yield put(cancelSubscriptionSuccess(response.data));
            yield put(setAlert("success", response.message));
        } else {
            yield put(cancelSubscriptionError(response));
        }
    } catch (error) {
        yield put(cancelSubscriptionError(error));
    }
}

export function* acticateTrialPlanWatcher() {
    yield takeLatest(seller.ACTIVATE_TRIAL_PLAN, acticateTrialPlanSaga);
}

export function* createOrderIdWatcher() {
    yield takeLatest(seller.CREATE_ORDERS_ID, createOrderIdSaga);
}

export function* createPaymentIdWatcher() {
    yield takeLatest(seller.CREATE_PAYMENT_ID, createPaymentIdSaga);
}
export function* captureRazorPayOrderWatcher() {
    yield takeLatest(seller.CAPTURE_ORDER, captureRazorPayOrderSaga);
}

export function* captureRazorPaySubscriptionWatcher(){
    yield takeLatest(seller.CAPTURE_SUBSCRIPTION, captureRazorPaySubscriptionSaga)
}
export function* getAllOrdersWatcher() {
    yield takeLatest(seller.GET_ORDERS, getAllOrdersSaga);
}

export function* cancelSubscriptionWatcher() {
    yield takeLatest(seller.CANCEL_SUBSCRIPTION, cancelSubscriptionSaga);
}