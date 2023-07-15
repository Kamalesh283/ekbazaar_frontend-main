import {
  actionTypes
} from "../../utils/constants";

const {
  contactUs
} = actionTypes;

const initialState = {
    contactus: {
      contactus: {},
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
      case contactUs.POST_CONTACTUS_PENDING: {
        return {
          ...state,
          contactus: {
            contactus: {},
            pending: true,
            success: false,
            error: false
          }
        }
      }
      case contactUs.POST_CONTACTUS_SUCCESS: {
        return {
          ...state,
          contactus: {
            contactus: payload,
            pending: false,
            success: true,
            error: false
          }
        }
      }
      case contactUs.POST_CONTACTUS_ERROR: {
        return {
          ...state,
          contactus: {
            contactus: {},
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