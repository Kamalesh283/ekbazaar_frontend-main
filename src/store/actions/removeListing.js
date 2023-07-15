import {
  actionTypes
} from "../../utils/constants";
const {
  removeListing
} = actionTypes;

/**
 * add Remove Listing
 */
export const addRemoveListing = (data) => {
  return {
    type: removeListing.POST_REMOVELISTING,
    payload: data,
  };
};

export const addRemoveListingPending = (data) => {
  return {
    type: removeListing.POST_REMOVELISTING_PENDING,
    payload: data,
  };
};

export const addRemoveListingSuccess = (data) => {
  return {
    type: removeListing.POST_REMOVELISTING_SUCCESS,
    payload: data,
  };
};

export const addRemoveListingError = (data) => {
  return {
    type: removeListing.POST_REMOVELISTING_ERROR,
    payload: data,
  };
};