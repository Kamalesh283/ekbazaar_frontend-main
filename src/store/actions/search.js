import { actionTypes } from '../../utils/constants'

const { search } = actionTypes

export const searchQuery = (query) => {

  return {
    type: search.SEARCH,
    payload: query
  }

}

export const searchQueryPending = (bool) => {

  return {
    type: search.SEARCH_PENDING,
    payload: bool
  }

}

export const searchQuerySuccess = (data) => {

  return {
    type: search.SEARCH_SUCCESS,
    payload: data
  }

}

export const searchQueryError = () => {

  return {
    type: search.SEARCH_ERROR
  }

}

export const getAllSellers = (query) => {

  return {
    type: search.GET_ALL_SELLERS,
    payload: query
  }

}

export const getAllSellersPending = (bool) => {

  return {
    type: search.GET_ALL_SELLERS_PENDING,
    payload: bool
  }

}

export const getAllSellersSuccess = (data) => {

  return {
    type: search.GET_ALL_SELLERS_SUCCESS,
    payload: data
  }

}

export const getAllSellersError = () => {

  return {
    type: search.GET_ALL_SELLERS_ERROR
  }

}

export const searchForAllCity = () => {

  return {
    type: search.ALL_CITY
  }

}

