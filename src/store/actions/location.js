import { actionTypes } from '../../utils/constants'

const { states, cities, countries } = actionTypes;

/**
 * cities
 */
export const getAllCities = (data) => {

  return {
    type: cities.GET_ALL_CITIES,
    payload: data
  }

}

export const getAllCitiesPending = (bool) => {

  return {
    type: cities.GET_ALL_CITIES_PENDING,
    payload: bool
  }

}

export const getAllCitiesSuccess = (data) => {

  return {
    type: cities.GET_ALL_CITIES_SUCCESS,
    payload: data
  }

}

export const getAllCitiesError = (data) => {

  return {
    type: cities.GET_ALL_CITIES_ERROR,
    payload: data
  }

}

/**
 * selling cities
 */
export const getSellingCities = (data) => {
  return {
    type: cities.GET_SELLING_CITIES,
    payload: data
  }
}

export const getSellingCitiesPending = (data) => {
  return {
    type: cities.GET_SELLING_CITIES_PENDING,
    payload: data
  }
}

export const getSellingCitiesSuccess = (data) => {
  return {
    type: cities.GET_SELLING_CITIES_SUCCESS,
    payload: data
  }
}

export const getSellingCitiesError = (data) => {
  return {
    type: cities.GET_SELLING_CITIES_ERROR,
    payload: data
  }
}

/**
 * states
 */
export const getAllStates = (data) => {

  return {
    type: states.GET_ALL_STATES,
    payload: data
  }

}

export const getAllStatesPending = (bool) => {

  return {
    type: states.GET_ALL_STATES_PENDING,
    payload: bool
  }

}

export const getAllStatesSuccess = (data) => {

  return {
    type: states.GET_ALL_STATES_SUCCESS,
    payload: data
  }

}

export const getAllStatesError = (data) => {

  return {
    type: states.GET_ALL_STATES_ERROR,
    payload: data
  }

}

/**
 * SELLING STATES
 */
export const getSellingStates = (data) => {
  return {
    type: states.GET_SELLING_STATES,
    payload: data
  }
}

export const getSellingStatesPending = (data) => {
  return {
    type: states.GET_SELLING_STATES_PENDING,
    payload: data
  }
}

export const getSellingStatesSuccess = (data) => {
  return {
    type: states.GET_SELLING_STATES_SUCCESS,
    payload: data
  }
}

export const getSellingStatesError = (data) => {
  return {
    type: states.GET_SELLING_STATES_ERROR,
    payload: data
  }
}

/**
 * countries
 */
export const getAllCountries = (data) => {

  return {
    type: countries.GET_ALL_COUNTRIES,
    payload: data
  }

}

export const getAllCountriesPending = (bool) => {

  return {
    type: countries.GET_ALL_COUNTRIES_PENDING,
    payload: bool
  }

}

export const getAllCountriesSuccess = (data) => {
  return {
    type: countries.GET_ALL_COUNTRIES_SUCCESS,
    payload: data
  }

}

export const getAllCountriesError = (data) => {

  return {
    type: countries.GET_ALL_COUNTRIES_ERROR,
    payload: data
  }

}

/**
 * select city
 */
export const selectCity = (data) => {

  return {
    type: cities.SELECT_CITY,
    payload: data
  }

}
