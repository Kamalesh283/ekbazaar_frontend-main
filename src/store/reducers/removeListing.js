import {
  actionTypes
} from "../../utils/constants";

const {
  removeListing
} = actionTypes;

const initialState = {
  removeListing: {
    removeListing : {},
    pending: false,
    success: false,
    error: false,
  },
};

export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case removeListing.POST_REMOVELISTING_PENDING: {
      return {
        ...state,
        removeListing: {
          removeListing: {},
          pending: true,
          success: false,
          error: false
        }
      }
    }
    case removeListing.POST_REMOVELISTING_SUCCESS: {
      return {
        ...state,
        removeListing: {
          removeListing: payload,
          pending: false,
          success: true,
          error: false
        }
      }
    }
    case removeListing.POST_REMOVELISTING_ERROR: {
      return {
        ...state,
        removeListing: {
          removeListing: {},
          pending: false,
          success: false,
          error: true
        }
      }
    }
    default:
      return state;
  }
}