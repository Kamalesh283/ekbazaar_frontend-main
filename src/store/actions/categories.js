import { actionTypes } from '../../utils/constants'
const { categories } = actionTypes

export const getSpecificCategories = () => {
  return {
    type: categories.GET_SPECIFIC,
    // payload: ""
  }
}

export const getSpecificCategoriesPending = (bool) => {

  return {
    type: categories.GET_SPECIFIC_PENDING,
    payload: bool
  }

}

export const getSpecificCategoriesSuccess = (data) => {

  return {
    type: categories.GET_SPECIFIC_SUCCESS,
    payload: data
  }

}

export const getSpecificCategoriesError = (data) => {

  return {
    type: categories.GET_SPECIFIC_ERROR,
    payload: data
  }

}

export const getAllCategories = (data) => {

  return {
    type: categories.GET_ALL_CATEGORIES,
    payload: data
  }

}

export const getAllCategoriesPending = (bool) => {

  return {
    type: categories.GET_ALL_CATEGORIES_PENDING,
    payload: bool
  }

}

export const getAllCategoriesSuccess = (data) => {

  return {
    type: categories.GET_ALL_CATEGORIES_SUCCESS,
    payload: data
  }

}

export const getAllCategoriesError = (data) => {

  return {
    type: categories.GET_ALL_CATEGORIES_ERROR,
    payload: data
  }

}

// GET sPECIGIC pARENT cATEGORY
export const getCategory = (data) => {

  return {
    type: categories.GET_CATEGORY,
    payload: data
  }

}

export const getCategoryPending = (bool) => {

  return {
    type: categories.GET_CATEGORY_PENDING,
    payload: bool
  }

}

export const getCategorySuccess = (data) => {

  return {
    type: categories.GET_CATEGORY_SUCCESS,
    payload: data
  }

}

export const getCategoryError = (data) => {

  return {
    type: categories.GET_CATEGORY_ERROR,
    payload: data
  }

}

/**
 * get seller types
 */
export const getSellerTypes = (data) => {

  return {
    type: categories.GET_SELLER_TYPES,
    payload: data
  }

}

export const getSellerTypesPending = (bool) => {

  return {
    type: categories.GET_SELLER_TYPES_PENDING,
    payload: bool
  }

}

export const getSellerTypesSuccess = (data) => {

  return {
    type: categories.GET_SELLER_TYPES_SUCCESS,
    payload: data
  }

}

export const getSellerTypesError = (data) => {

  return {
    type: categories.GET_SELLER_TYPES_ERROR,
    payload: data
  }

}

export const getAllProducts = (data) => {

  return {
    type: categories.GET_ALL_PRODUCTS,
    payload: data
  }

}
export const getAllProductsPending = (bool) => {

  return {
    type: categories.GET_ALL_PRODUCTS_PENDING,
    payload: bool
  }

}

export const getAllProductsSuccess = (data) => {

  return {
    type: categories.GET_ALL_PRODUCTS_SUCCESS,
    payload: data
  }

}
export const getAllProductsError = (data) => {

  return {
    type: categories.GET_ALL_PRODUCTS_ERROR,
    payload: data
  }

}

export const setSearchKeyword = (data) => {
  return {
    type: categories.SET_SEARCH_KEYWORD,
    payload: data
  }
}

/**
 * secondary categorius
 */
export const getSecondaryCategories = (data) => {

  return {
    type: categories.GET_SECONDARY_CATEGORIES,
    payload: data
  }

}

export const getSecondaryCategoriesPending = (bool) => {

  return {
    type: categories.GET_SECONDARY_CATEGORIES_PENDING,
    payload: bool
  }

}

export const getSecondaryCategoriesSuccess = (data) => {

  return {
    type: categories.GET_SECONDARY_CATEGORIES_SUCCESS,
    payload: data
  }

}

export const getSecondaryCategoriesError = (data) => {

  return {
    type: categories.GET_SECONDARY_CATEGORIES_ERROR,
    payload: data
  }

}

/**
 * products
 */
export const getProducts = (data) => {

  return {
    type: categories.GET_PRODUCTS,
    payload: data
  }

}

export const getProductsPending = (bool) => {

  return {
    type: categories.GET_PRODUCTS_PENDING,
    payload: bool
  }

}

export const getProductsSuccess = (data) => {

  return {
    type: categories.GET_PRODUCTS_SUCCESS,
    payload: data
  }

}

export const getProductsError = (data) => {

  return {
    type: categories.GET_PRODUCTS_ERROR,
    payload: data
  }

}

export const setL2 = (data) => {
  return {
    type: categories.SELECTED_L2,
    payload: data
  }
}

/**
 * primary category
 */
export const getPrimaryCategory = (data) => {
  return {
    type: categories.GET_PRIMARY_CATEGORY,
    payload: data
  }
}

export const getPrimaryCategoryPending = (bool) => {

  return {
    type: categories.GET_PRIMARY_CATEGORY_PENDING,
    payload: bool
  }

}

export const getPrimaryCategorySuccess = (data) => {

  return {
    type: categories.GET_PRIMARY_CATEGORY_SUCCESS,
    payload: data
  }

}

export const getPrimaryCategoryError = (data) => {

  return {
    type: categories.GET_PRIMARY_CATEGORY_ERROR,
    payload: data
  }

}

// Level 5 

export const getLevelFiveProducts = (data) => {

  return {
    type: categories.GET_ALL_LEVEL5_PRODUCTS,
    payload: data
  }

}
export const getLevelFiveProductsPending = (bool) => {

  return {
    type: categories.GET_ALL_LEVEL5_PRODUCTS_PENDING,
    payload: bool
  }

}

export const getLevelFiveProductsSuccess = (data) => {

  return {
    type: categories.GET_ALL_LEVEL5_PRODUCTS_SUCCESS,
    payload: data
  }

}
export const getLevelFiveProductsError = (data) => {

  return {
    type: categories.GET_ALL_LEVEL5_PRODUCTS_ERROR,
    payload: data
  }

}

