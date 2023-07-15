import { actionTypes } from "../../utils/constants";
import { getSellerDataStruct } from "../../utils/helpers";

const { seller } = actionTypes;

const initialState = {
  seller: {},
  pending: false,
  success: false,
  error: false,
  errorMsg: null,
  successMsg: null,
  logout: {
    pending: false,
    success: false,
    error: false,
  },
  forgotPassword: {
    forgotPassword: {},
    pending: false,
    success: false,
    error: false,
  },
  updateNewPassword: {
    updateNewPassword: {},
    pending: false,
    success: false,
    error: false,
  },
  notifications: {
    notifications: {},
    pending: false,
    success: false,
    error: false,
  },
  verifyEmail: {
    pending: false,
    success: false,
    error: false,
    verificationMsg: "",
    linkSent: false,
  },
  validatePhoneNumber: {
    otp: "",
    pending: false,
    success: false,
    error: false,
  },
  emailAlerts: {
    alerts: {},
    pending: false,
    success: false,
    error: false,
  },
  checkUserExist: {
    pending: false,
    success: false,
    error: false,
  },
  addSelectedProduct: {
    addSelectedProduct: [],
    pending: false,
    success: false,
    error: false,
  },
  deleteSellerProduct: {
    pending: false,
    success: false,
    error: false,
  },
  updateSellerProduct: {
    updateSellerProduct: {},
    pending: false,
    success: false,
    error: false,
  },
  getSellerProduct: {
    getSellerProduct: {},
    pending: false,
    success: false,
    error: false,
  },
  getFilteredCities: {
    getFilteredCities: {},
    pending: false,
    success: false,
    error: false,
  },
  getBuyerEnquiries: {
    getBuyerEnquiries: {},
    pending: false,
    success: false,
    error: false,
  },
  otpVerified: false,
  selectedProduct: null,
  productSelection: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case seller.SEND_OTP_PENDING:
      return {
        ...state,
        validatePhoneNumber: {
          otp: "",
          pending: true,
          success: false,
          error: false,
        },
      };
    case seller.SEND_OTP_SUCCESS:
      return {
        ...state,
        validatePhoneNumber: {
          ...payload,
          pending: false,
          success: true,
          error: false,
        },
      };
    case seller.SEND_OTP_ERROR:
      return {
        ...state,
        validatePhoneNumber: {
          otp: "",
          pending: false,
          success: false,
          error: true,
        },
      };
    case seller.SELLER_OTP_VERIFIED:
      return {
        ...state,
        otpVerified: true,
      };
    case seller.ADD_SELLER_PENDING:
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
      };
    case seller.ADD_SELLER_SUCCESS:
      return {
        ...state,
        seller: payload,
        pending: false,
        success: true,
        error: false,
      };
    case seller.ADD_SELLER_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMsg: payload.message,
      };
    case seller.GET_SELLER_PROFILE_PENDING:
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
      };
    case seller.GET_SELLER_PROFILE_SUCCESS: {
      const seller = payload[0]._index
        ? [getSellerDataStruct(payload[0])]
        : payload;
      return {
        ...state,
        seller: seller[0],
        pending: false,
        success: true,
        error: false,
      };
    }
    case seller.GET_SELLER_PROFILE_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMsg: payload.message,
      };

    case seller.UPDATE_SELLER_PRODUCT_PENDING:
      return {
        ...state,
        updateSellerProduct: {
          pending: true,
          success: false,
          error: false,
        }
      };
    case seller.UPDATE_SELLER_PRODUCT_SUCCESS:
      return {
        ...state,
        productUpdate: payload,
        updateSellerProduct: {
          pending: false,
          success: true,
          error: false,
        }
      };
    case seller.UPDATE_SELLER_PROFILE_ERROR:
      return {
        ...state,
        updateSellerProduct: {
          pending: false,
          success: false,
          error: true,
        },
        errorMsg: payload.message,
      };

    case seller.UPDATE_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
      };

    case seller.UPDATE_SELLER_PROFILE_PENDING:
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
      };

    case seller.GET_SELLER_PRODUCT_PENDING:
      return {
        ...state,
        getSellerProduct: {
          // ...getSellerProduct,
          pending: true,
          success: false,
          error: false,
        },
      };
    case seller.GET_SELLER_PRODUCT_SUCCESS:
      return {
        ...state,
        getSellerProduct: {
          getSellerProduct: payload,
          pending: false,
          success: true,
          error: false,
        },
      };
    case seller.GET_SELLER_PRODUCT_ERROR:
      return {
        ...state,
        getSellerProduct: {
          // ...getSellerProduct,
          pending: false,
          success: false,
          error: true,
          errorMsg: payload.message,
        },
      };

    case seller.GET_FILTERED_CITIES_PENDING:
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
      };
    case seller.GET_FILTERED_CITIES_SUCCESS:
      return {
        ...state,
        getFilteredCities: payload,
        pending: false,
        success: true,
        error: false,
      };
    case seller.GET_FILTERED_CITIES_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMsg: payload.message,
      };

    case seller.GET_BUYER_ENQUIRIES_PENDING:
      return {
        ...state,
        getBuyerEnquiries: {
          pending: true,
          success: false,
          error: false,
        },
      };
    case seller.GET_BUYER_ENQUIRIES_SUCCESS:
      return {
        ...state,
        getBuyerEnquiries: {
          getBuyerEnquiries: payload,
          pending: false,
          success: true,
          error: false,
        },
      };
    case seller.GET_BUYER_ENQUIRIES_ERROR:
      return {
        ...state,
        getBuyerEnquiries: {
          pending: false,
          success: false,
          error: true,
          errorMsg: payload.message,
        },
      };

      case seller.ADD_SELECTED_PRODUCTS_PENDING: 
      return {
        ...state,
        addSelectedProduct: {
          pending: true,
        }
      }
      case seller.ADD_SELECTED_PRODUCTS_SUCCESS: 
      return {
        ...state,
        addSelectedProduct: {
          pending: false,
          success: true
        }
      }
      case seller.ADD_SELECTED_PRODUCTS_ERROR: 
      return {
        ...state,
        addSelectedProduct: {
          pending: false,
          success: false,
          error: true
        }
      }

    case seller.EDIT_PRODUCT_INFO:
      return {
        ...state,
        selectedProduct: payload,
      };
    case seller.PRODUCT_SELECTION:
      return {
        ...state,
        productSelection: payload,
      };
    case seller.UPDATE_STATUS:
      return {
        ...state,
        success: payload.success,
      };
    default:
      return state;
  }
}
