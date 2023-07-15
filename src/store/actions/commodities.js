import {
  actionTypes
} from "../../utils/constants";
const {
  commodities
} = actionTypes;

/**
 * get commodities
 */
export const getCommodities = (data) => {
  return {
    type: commodities.GET_COMMODITIES,
    payload: data,
  };
};

export const getCommoditiesPending = (data) => {
  return {
    type: commodities.GET_COMMODITIES_PENDING,
    payload: data,
  };
};

export const getCommoditiesSuccess = (data) => {
  return {
    type: commodities.GET_COMMODITIES_SUCCESS,
    payload: data,
  };
};

export const getCommoditiesError = (data) => {
  return {
    type: commodities.GET_COMMODITIES_ERROR,
    payload: data,
  };
};

export const getNews = (data) => {
  return {
    type: commodities.GET_NEWS,
    payload: data,
  };
};

export const getNewsPending = (data) => {
  return {
    type: commodities.GET_NEWS_PENDING,
    payload: data,
  };
};

export const getNewsSuccess = (data) => {
  return {
    type: commodities.GET_NEWS_SUCCESS,
    payload: data,
  };
};

export const getNewsError = (data) => {
  return {
    type: commodities.GET_NEWS_ERROR,
    payload: data,
  };
};