import request from "../request";
import { generateTendersQueryString } from './apiHelper'


/**
 * 
 * Swagger Document Completed
 */
export const getSpecificCategoriesApi = () => {
  const url = "getCategories";
  return request({
    url,
    method: "get",
  });
}

/**
 * 
 * Swagger Document Completed
 */
export const getAllCategoriesApi = () => {
  const url = "getAllCategories";
  return request({
    url,
    method: "get",
  });
};

/**
 * 
 * Swagger Document Completed
 */
export const getCategoryApi = (id) => {
  const url = `getParentCategory/${id}`;
  return request({
    url,
    // data,
    method: "get",
  });
};

/**
 * 
 * Swagger Document Completed
 * 
 */
export const getSellerTypesApi = (data) => {
  const url = "sellerTypes";
  return request({
    url,
    params: data,
    method: "get",
  });
};

/**
 * 
 * Swagger Document Completed
 * 
 */
export const getAllProductsAPI = (data) => {

  const { search, limit } = data

  let url = 'getAllProducts?'

  if (search) {

    url += `search=${search}&`

  }
  if (limit) {

    url += `limit=${limit}`

  }

  return request({
    url,
    method: 'get'
  })

}

/**
 * 
 * Swagger Document Completed
 * 
 */
export const getSecondaryCategoriesApi = () => {
  const url = "secondary-categories";
  return request({
    url,
    // data,
    method: "get",
  });
}

/**
 * 
 * Swagger Document Completed
 * 
 */
export const getProductsApi = (data) => {
  const url = "products";
  return request({
    url,
    params: data,
    method: "get",
  });
}

/**
 * 
 * Swagger Document Completed
 * 
 */
export const getPrimaryCategoryApi = (query) => {
  const baseURL = "primary-category?"
  const url = generateTendersQueryString(baseURL, query)
  return request({
    url,
    method: "get",
  });
}

/**
 * 
 * Swagger Document Completed
 * 
 */
export const getLevelFiveProductsApi = (id) => {
  const url = `getLevelFive/${id}`;
  return request({
    url,
    // params: data,
    method: "get",
  });
}
