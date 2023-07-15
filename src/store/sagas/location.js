import { put, takeLatest, call, select } from "redux-saga/effects";

import { actionTypes } from "../../utils/constants";

import * as api from "../../utils/api";
import * as actions from "../actions";

const { states, cities, countries } = actionTypes;

function* getAllCitiesSaga(action) {
  try {

    yield put(actions.location.getAllCitiesPending(true));
    const res = yield call(api.location.getAllCitiesApi, action.payload);
    if (res.success) {
      yield put(actions.location.getAllCitiesSuccess(res.data));
    } else {
      yield put(actions.location.getAllCitiesError(res));
    }
    
  } catch (err) {
    yield put(actions.location.getAllCitiesError(err));
  }
}

function* getSellingCitiesSaga(action) {
  try {
    yield put(actions.location.getSellingCitiesPending(true));
    const res = yield call(api.location.getSellingCitiesApi, action.payload);
    if (res.success) {
      yield put(actions.location.getSellingCitiesSuccess(res.data));
    } else {
      yield put(actions.location.getSellingCitiesError(res));
    }
    
  } catch (err) {
    yield put(actions.location.getSellingCitiesError(err));
  }
}

function* getAllStatesSaga(action) {
  try {
    yield put(actions.location.getAllStatesPending(true));
    const res = yield call(api.location.getAllStatesApi, action.payload);
    if (res.success) {
      yield put(actions.location.getAllStatesSuccess(res.data));
    } else {
      yield put(actions.location.getAllStatesError(res));
    }
  } catch (err) {
    yield put(actions.location.getAllStatesError(err));
  }
}

function* getSellingStatesSaga(action) {
  try {
    yield put(actions.location.getSellingStatesPending(true));
    const res = yield call(api.location.getAllStatesApi, action.payload);
    if (res.success) {
      yield put(actions.location.getSellingStatesSuccess(res.data));
    } else {
      yield put(actions.location.getSellingStatesError(res));
    }
  } catch (err) {
    yield put(actions.location.getSellingStatesError(err));
  }
}

function* getAllCountriesSaga(action) {
  try {
    yield put(actions.location.getAllCountriesPending(true));
    const res = yield call(api.location.getAllCountriesApi, action.payload);
    if (res.success) {
      yield put(actions.location.getAllCountriesSuccess(res.data));
    } else {
      yield put(actions.location.getAllCountriesError(res));
    }
  } catch (err) {
    yield put(actions.location.getAllCountriesError(err));
  }
}

export function* getAllCitiesWatcher() {
  yield takeLatest(cities.GET_ALL_CITIES, getAllCitiesSaga);
}

export function* getSellingCitiesWatcher() {
  yield takeLatest(cities.GET_SELLING_CITIES, getSellingCitiesSaga);
}

export function* getAllStatesWatcher() {
  yield takeLatest(states.GET_ALL_STATES, getAllStatesSaga);
}

export function* getSellingStatesWatcher() {
  yield takeLatest(states.GET_SELLING_STATES, getSellingStatesSaga);
}

export function* getAllCountriesWatcher() {
  yield takeLatest(countries.GET_ALL_COUNTRIES, getAllCountriesSaga);
}
