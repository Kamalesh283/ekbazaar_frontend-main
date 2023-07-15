import { put, takeLatest, call, delay, select, fork, all } from "redux-saga/effects";
import { actionTypes } from "../../utils/constants";
import {
    getBuyerRequestError,
    getBuyerRequestPending,
    getBuyerRequestSuccess,
    getBuyerRequest,

    getSellerOffersPending,
    getSellerOffersError,
    getSellerOffersSuccess,
    
    getAllOffersPending,
    getAllOffersSuccess,
    getAllOffersError,

    postBuyerRequestError,
    postBuyerRequestPending,
    postBuyerRequestSuccess,

    postSellerOfferContactError,
    postSellerOfferContactPending,
    postSellerOfferContactSuccess,

    deleteBuyerRequestError,
    deleteBuyerRequestPending,
    deleteBuyerRequestSuccess
} from '../actions/offers'

import {
    getSellerOffersApi,
    getBuyerRequestApi,
    getAllOffersApi,
    postSelletOffersContactApi,
    postBuyerRequestApi,
    getBuyerAllRequestApi,
    deleteBuyerRequestApi
} from '../../utils/api/offers'
// import history from "../../Routes/history";
import { setAlert } from "../actions/app";
const { buyer, seller } = actionTypes;



/**
 * GET ALL OFFERS
 */
function* getAllOffersSaga(action) {
    try {
        yield put(getAllOffersPending(true))
        const response = yield call(getAllOffersApi, action.payload)
        if(response.success) {
            yield put(getAllOffersSuccess(response.data))
        } else {
            yield put(getAllOffersError(response))
        }
    } catch (error) {
        yield put(getAllOffersError(error))
    }
}

/**
 * Get Seller Offers
 */
function* getSellerOffersSaga(action) {
    try {
        yield put(getSellerOffersPending(true));
        const res = yield call(getSellerOffersApi, action.payload);
        if (res.success) {
            yield put(getSellerOffersSuccess(res.data));

        } else {
            yield put(getSellerOffersError(res));
        }
    } catch (err) {
        yield put(getSellerOffersError(err));
    }
}

/**
 * Post Seller Offers
 */
function* postSellerOfferContactSaga(action) {
    try {
        const { closeModel } = action.payload
        yield put(postSellerOfferContactPending(true));
        const res = yield call(postSelletOffersContactApi, action.payload);
        if (res.success) {
            yield put(postSellerOfferContactSuccess(res.data));
            yield put(setAlert("success", res.message));
            closeModel && closeModel()

        } else {
            yield put(postSellerOfferContactError(res));
        }
    } catch (err) {
        yield put(postSellerOfferContactError(err));
    }
}

/**
 * Get buyer request
 */
function* getBuyerRequestSaga(action) {
    try {
        yield put(getBuyerRequestPending(true));
        const res = yield call(getBuyerAllRequestApi, action.payload);
        if (res.success) {
            yield put(getBuyerRequestSuccess(res.data));

        } else {
            yield put(getBuyerRequestError(res));
        }
    } catch (err) {
        yield put(getBuyerRequestError(err));
    }
}

/**
 * POst buyer request
 */
function* postBuyerRequestSaga(action) {
    try {
        const { closeModel } = action.payload
        yield put(postBuyerRequestPending(true));
        const res = yield call(postBuyerRequestApi, action.payload);
        if (res.success) {
            closeModel && closeModel()
            yield put(postBuyerRequestSuccess(res));
            yield put(setAlert("success", res.message));

        } else {
            yield put(postBuyerRequestError(res));
        }
    } catch (err) {
        yield put(postBuyerRequestError(err));
    }
}

/**
 * Delte buyer request
 */
 function* deleteBuyerRequestSaga(action) {
    try {
        const { closeModel, id, query } = action.payload
        // yield put(deleteBuyerRequestPending(true));
        const res = yield call(deleteBuyerRequestApi, id);
        if (res.success) {
            closeModel && closeModel()
            yield put(getBuyerRequest(query))
            yield put(setAlert("success", res.message));
            // yield put(deleteBuyerRequestSuccess(res));

        } else {
            // yield put(deleteBuyerRequestError(res));
        }
    } catch (err) {
        // yield put(deleteBuyerRequestError(err));
    }
}

/*
  
  ACTION WATCHERS
  
*/

export function* getAllOffersWatcher() {
    yield takeLatest(seller.GET_ALL_OFFERS, getAllOffersSaga)
}

export function* getSellerOffersWatcher() {
    yield takeLatest(seller.GET_SELLER_OFFERS, getSellerOffersSaga);
}
export function* postSellerOfferContactsWatcher() {
    yield takeLatest(seller.POST_SELLER_CONTACT_OFFERS, postSellerOfferContactSaga);
}
export function* getBuyerRequestWatcher() {
    yield takeLatest(buyer.GET_BUYER_REQUEST, getBuyerRequestSaga);
}
export function* postBuyerRequestWatcher() {
    yield takeLatest(buyer.POST_BUYER_REQUEST, postBuyerRequestSaga);
}
export function* deleteBuyerRequestWatcher() {
    yield takeLatest(buyer.DELETE_BUYER_REQUEST, deleteBuyerRequestSaga);
}