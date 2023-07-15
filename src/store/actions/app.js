import { actionTypes } from '../../utils/constants'
import Cookies from 'js-cookie'
const TokenKey = 'Access-Token'

const { app } = actionTypes

export const setSiteLanguage = (data) => {

  return {
    type: app.SITE_LANGUAGE,
    payload: data
  }

}

export const setPermission = () => {

  return {
    type: app.SET_COOKIE,
    payload: true
  }

}

export const clearPermission = () => {

  return {
    type: app.CLEAR_COOKIE,
    payload: false
  }

}

export const setAuthToken = (token, expireTime) => {
  const obj = {
    token: token,
    expireTime: expireTime
  }
  return {
    type: app.SET_TOKEN,
    payload: obj
  }

}

export const getAuthToken = () => {
  const token = Cookies.get(TokenKey)
  return {
    type: app.GET_TOKEN,
    payload: token
  }
}

export const clearAuthToken = () => {

  return {
    type: app.CLEAR_TOKEN,
    payload: ''
  }

}
/* Alert */
export const setAlert = (type, msg) => {
  return {
    type: app.SET_ALERT,
    payload: {
      type,
      msg
    }
  }

}

export const clearAlert = (data) => {

  return {
    type: app.CLEAR_ALERT,
    payload: data
  }

}

export const clearErrorMessage = () => {

  return {
    type: app.CLEAR_ERROR_MESSAGE,
    payload: ''
  }

}

export const redirectWithFilter = (obj) => {

  return {
    type: app.REDIRECT_WITH_FILTER,
    payload: obj
  }

}

export const setLocationRedirect = (data) => {

  return {
    type: app.LOCATION_REDIRECT,
    payload: data
  }

}

export const clearLocationRedirect = () => {

  return {
    type: app.LOCATION_REDIRECT,
    payload: ''
  }

}

export const setCurrency = (data) => {
  return {
    type: app.SET_CURRENCY,
    payload: data
  }

}

export const userLocationDetails = (data) => {
  return{
    type: app.SET_IP_DETAILS,
    payload: data
  }
}

export const setSearchCountry = data => {
  return {
    type: app.SET_SEARCH_COUNTRY,
    payload: data
  }
}
