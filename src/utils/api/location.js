import request from "../request";

/**
 * swgger_document Done
 */
export const getAllCitiesApi = (data) => {
  let url = "cities";
  return request({
    url,
    params: data,
    method: "get",
  });
};

/**
 * swgger_document Done
 */
export const getSellingCitiesApi = (data) => {
  let url = "cities";
  return request({
    url,
    params: data,
    method: "get",
  });
};

/**
 * swgger_document Done
 */
export const getAllStatesApi = (data) => {
  const url = "states";
  return request({
    url,
    params: data,
    method: "get",
  });
};

/**
 * swgger_document Done
 */
export const getAllCountriesApi = (data) => {
  const url = "countries";
  return request({
    url,
    // data,
    params: data,
    method: "get",
  });
};
