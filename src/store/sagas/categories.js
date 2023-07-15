import {
  put, takeLatest, call, select, fork, all
} from 'redux-saga/effects'

import { actionTypes } from '../../utils/constants'

//   import * as api from '../../utils/api'
import { getSpecificCategoriesApi, getAllCategoriesApi, getCategoryApi, getSellerTypesApi, getAllProductsAPI, getSecondaryCategoriesApi, getProductsApi, getPrimaryCategoryApi, getLevelFiveProductsApi } from '../../utils/api/categories'

// import * as actions from '../actions'
import {
  getSpecificCategoriesPending,
  getSpecificCategoriesSuccess,
  getSpecificCategoriesError,
  getAllCategoriesError,
  getAllCategoriesPending,
  getAllCategoriesSuccess,
  getCategoryError,
  getCategoryPending,
  getCategorySuccess,
  getSellerTypesPending,
  getSellerTypesSuccess,
  getSellerTypesError,
  getAllProductsError,
  getAllProductsPending,
  getAllProductsSuccess,
  getSecondaryCategoriesError,
  getSecondaryCategoriesPending,
  getSecondaryCategoriesSuccess,
  getProductsError,
  getProductsPending,
  getProductsSuccess,
  getPrimaryCategoryPending,
  getPrimaryCategorySuccess,
  getPrimaryCategoryError,
  getLevelFiveProductsError,
  getLevelFiveProductsPending,
  getLevelFiveProductsSuccess
} from '../actions/categories'

const { categories } = actionTypes

// GET SPECIFIC CATEGORIES
function* getSpecificCategoriesSaga(action) {

  try {

    yield put(getSpecificCategoriesPending(true))
    const res = yield call(getSpecificCategoriesApi)
    if (res.success) {

      yield put(getSpecificCategoriesSuccess(res.data))

    } else {

      yield put(getSpecificCategoriesError(res))

    }

  } catch (err) {

    yield put(getSpecificCategoriesError(err))

  }

}

// Get All Categories
function* getAllCategoriesSaga(action) {

  try {

    yield put(getAllCategoriesPending(true))
    const res = yield call(getAllCategoriesApi, action.payload)
    if (res.success) {

      yield put(getAllCategoriesSuccess(res.data))

    } else {

      yield put(getAllCategoriesError(res))

    }

  } catch (err) {

    yield put(getAllCategoriesError(err))

  }

}

// Get Specific Categories
function* getCategorySaga(action) {

  try {

    if(action.payload) {
    yield put(getCategoryPending(true))

      const res = yield call(getCategoryApi, action.payload)
      if (res.success) {
  
        yield put(getCategorySuccess(res.data))
  
      } else {
  
        yield put(getCategoryError(res))
  
      }
    }

  } catch (err) {

    yield put(getCategoryError(err))

  }

}

/**
 * get seller types
 */
function* getSellerTypesSaga(action) {

  try {

    yield put(getSellerTypesPending(true))
    const res = yield call(getSellerTypesApi, action.payload)
    if (res.success) {

      yield put(getSellerTypesSuccess(res.data))

    } else {

      yield put(getSellerTypesError(res))
    }
  } catch (err) {

    yield put(getSellerTypesError(err))
  }
}
// Get All Products
function* getAllProductsSaga(action) {

  try {

    yield put(getAllProductsPending(true))
    const res = yield call(getAllProductsAPI, action.payload)
    if (res.success) {

      yield put(getAllProductsSuccess(res.data))

    } else {

      yield put(getAllProductsError(res))

    }

  } catch (err) {

    yield put(getAllProductsError(err))

  }

}

/**
 * secondary categories
 */
function* getSecondaryCategoriessSaga(action) {

  try {

    yield put(getSecondaryCategoriesPending(true))
    const res = yield call(getSecondaryCategoriesApi, action.payload)
    if (res.success) {

      yield put(getSecondaryCategoriesSuccess(res.data))

    } else {

      yield put(getSecondaryCategoriesError(res))

    }

  } catch (err) {

    yield put(getSecondaryCategoriesError(err))

  }

}

/**
 * products
 */
function* getProductsSaga(action) {

  try {

    yield put(getProductsPending(true))
    const res = yield call(getProductsApi, action.payload)
    if (res.success) {

      yield put(getProductsSuccess(res.data))

    } else {

      yield put(getProductsError(res))

    }

  } catch (err) {

    yield put(getProductsError(err))

  }

}

/**
 * primary category
 */
function* getPrimaryCategorySaga(action) {

  try {

    yield put(getPrimaryCategoryPending(true))
    const res = yield call(getPrimaryCategoryApi, action.payload)
    if (res.success) {

      yield put(getPrimaryCategorySuccess(res.data))

    } else {

      yield put(getPrimaryCategoryError(res))

    }

  } catch (err) {

    yield put(getPrimaryCategoryError(err))

  }

}



/**
 * Level 5 products
 */
function* getLevelFiveProductsSaga(action) {

  try {

    yield put(getLevelFiveProductsPending(true))
    const res = yield call(getLevelFiveProductsApi, action.payload)
    if (res.success) {

      yield put(getLevelFiveProductsSuccess(res.data))

    } else {

      yield put(getLevelFiveProductsError(res))

    }

  } catch (err) {

    yield put(getLevelFiveProductsError(err))

  }

}

/* 
    WATCHER 
*/

// getSpecificCategoriesSaga
export function* getSpecificCategoriesWatcher() {
  yield takeLatest(categories.GET_SPECIFIC, getSpecificCategoriesSaga)
}

export function* getAllCategoriesWatcher() {
  yield takeLatest(categories.GET_ALL_CATEGORIES, getAllCategoriesSaga)
}

export function* getCategoryWatcher() {
  yield takeLatest(categories.GET_CATEGORY, getCategorySaga)
}

export function* getSellerTypesWatcher() {
  yield takeLatest(categories.GET_SELLER_TYPES, getSellerTypesSaga)
}

export function* getAllProductsWatcher() {
  yield takeLatest(categories.GET_ALL_PRODUCTS, getAllProductsSaga)

}

export function* getSecondaryCategoriesWatcher() {
  yield takeLatest(categories.GET_SECONDARY_CATEGORIES, getSecondaryCategoriessSaga)
}

export function* getProductsWatcher() {
  yield takeLatest(categories.GET_PRODUCTS, getProductsSaga)
}

export function* getPrimaryCategoryWatcher() {
  yield takeLatest(categories.GET_PRIMARY_CATEGORY, getPrimaryCategorySaga)
}

export function* getLevelFiveProductsWatcher() {
  yield takeLatest(categories.GET_ALL_LEVEL5_PRODUCTS, getLevelFiveProductsSaga)
}
