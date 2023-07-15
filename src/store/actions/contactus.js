import {
  actionTypes
} from "../../utils/constants";
const {
  contactUs
} = actionTypes;

/**
 * add Contactus
 */
export const addContactus = (data) => {
  return {
    type: contactUs.POST_CONTACTUS,
    payload: data,
  };
};

export const addContactusPending = (data) => {
  return {
    type: contactUs.POST_CONTACTUS_PENDING,
    payload: data,
  };
};

export const addContactusSuccess = (data) => {
  return {
    type: contactUs.POST_CONTACTUS_SUCCESS,
    payload: data,
  };
};

export const addContactusError = (data) => {
  return {
    type: contactUs.POST_CONTACTUS_ERROR,
    payload: data,
  };
};