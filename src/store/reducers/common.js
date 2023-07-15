import {
  actionTypes
} from "../../utils/constants";

const {
  common,
  seller,
  search
} = actionTypes;

const initialState = {
  removemylisting:false,
  userType: localStorage.getItem('userType') || "buyer",
  mobile: null,
  verify: {
    otp: null,
    pending: false,
    success: false,
    error: false,
    errorMessage: ""
  },
  otpVerified: false,
  pending: false,
  success: false,
  error: false,
  added: false,
  registered: false,
  resetPassword: false,
  user: {
    buyer: {},
    seller: {},
    pending: false,
    success: false,
    error: false,
  },
  subscriptionPlan: {
    pending: false,
    success: false,
    error: false
  },
  referralCode:{
    pending: false,
    success: false,
    error: false
  },
  accessToken: {
    token: null,
    pending: false,
    success: false,
    error: false,
  },
  deleteAccount: {
    deleteAccount: {},
    pending: false,
    success: false,
    error: false,
  },
  selectedTab: null,
  selectedTabBp: null,
  emailVerified: false,
  reset: false,
  userExist: false,
  existUserData: {},
  loginErrorMessage: "",
  acticateAccount: false,
  sellerActiveNumbers: {
    numbers: [],
    pending: false,
    success: false,
    error: false
  },
  verifyEmail: {
    pending: false,
    success: false,
    error: false,
    verificationMsg: '',
    linkSent: false
  },
  activeSellerCount: {
    key: '',
    value: 0,
    pending: false,
    success: false,
    error: false
  }
};

export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action;
  switch (type) {
    case common.REMOVE_MY_LISTING:
      return {
        ...state,
        removemylisting: payload
      };

    case common.ACTIVATE_ACCOUNT:
      return {
        ...state,
        acticateAccount: payload
      };

    case common.GET_ACCESS_TOKEN_PENDING:
      return {
        ...state,
        accessToken: {
          token: null,
          pending: true,
          success: false,
          error: false,
        },
      };
    case common.GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: {
          token: payload.token,
          pending: false,
          success: true,
          error: false,
        },
      };
    case common.GET_ACCESS_TOKEN_ERROR:
      return {
        ...state,
        accessToken: {
          token: null,
          pending: false,
          success: false,
          error: true,
        },
      };
    case common.CHECK_USER_EXIST_PENDING: {
      return {
        ...state,
        userExist: false,
        pending: true,
        existUserData: {},
        verify: {
          ...state.verify,
          errorMessage: ""
        },
      }
    }
    case common.CHECK_USER_EXIST_SUCCESS: {
      return {
        ...state,
        userExist: true,
        pending: false,
        existUserData: payload.data,
        verify: {
          ...state.verify,
          errorMessage: payload.message
        },
      }
    }
    case common.RESET_USER: {
      return {
        ...state,
        userExist: payload && payload.set ? true : false,
        existUserData: {},
        verify: {
          otp: null,
          pending: false,
          success: false,
          error: false,
          errorMessage: payload && payload.set ? "User with this number already exist" : ""
        },
        otpVerified: false,
        loginErrorMessage: ""
      }
    }
    case common.CHECK_USER_EXIST_ERROR: {
      return {
        ...state,
        userExist: false,
        existUserData: {},
        pending: false,
        verify: {
          ...state.verify,
          errorMessage: ""
        },
      }
    }
    case common.SEND_OTP_PENDING:
      return {
        ...state,
        mobile: payload,
        verify: {
          ...state.verify,
          pending: true,
        },
      };
    case common.SEND_OTP_SUCCESS:
      return {
        ...state,
        verify: {
          ...state.verify,
          otp: payload.otp,
          pending: false,
          success: true,
        },
      };
    case common.SEND_OTP_ERROR:
      return {
        ...state,
        verify: {
          otp: null,
          success: true,
          pending: false,
          error: true,
          errorMessage: payload
        },
        userExist: payload === "User with this number already exist"  || payload === "User already exist"? true : false
      };
    case common.SET_OTP:
      return {
        ...state,
        verify: {
          ...state.verify.otp,
          otp: null
        }
      }
    case common.OTP_VERIFIED:
      return {
        ...state,
        otpVerified: true,
      };
    case common.SET_USER_TYPE: {
      localStorage.setItem("userType", payload)
      return {
        ...state,
        userType: payload, // || localStorage.getItem("userType"),
        otpVerified: false
      };
    }
    case common.ADD_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case common.ADD_USER_SUCCESS: {
      return {
        ...state,
        pending: false,
        success: true,
      };
    }
    case common.ADD_USER_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
      };
    case common.USER_ADDED:
      return {
        ...state,
        userAdded: true
      }
    case common.RESET_PASSWORD:
      return {
        ...state,
        resetPassword: payload
      }
    case common.LOGIN_PENDING:
      return {
        ...state,
        user: {
          ...state.user,
          pending: true,
        },
        pending: true,
        success: false,
        error: false,
      }
    case common.LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          // buyer: {},
          // seller: {},
          pending: false,
          success: true,
          error: false,
        },
        verify: {
          otp: null,
          pending: false,
          success: false,
          error: false,
          errorMessage: ""
        },
        pending: false,
        success: true,
        error: false
      }
    }
    case common.LOGIN_ERROR:
      return {
        ...state,
        user: {
          user: { ...payload },
          buyer: {},
          seller: {},
          pending: false,
          success: false,
          error: true,
        },
        loginErrorMessage: payload,
        pending: false,
        success: false,
        error: true,

      }
    case common.GET_USER_PROFILE_PENDING:
      return {
        ...state,
        user: {
          ...state.user,
          pending: true,
        },
      };
    case common.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          seller: {
            ...state.user.seller,
            ...payload.user,
            ...payload.seller
          },
          buyer: {
            ...state.user.buyer,
            ...payload.buyer,
            ...payload.user,
          },
        },
        pending: false,
        success: true,
      }
    }
    case common.GET_USER_PROFILE_ERROR:
      return {
        ...state,
        user: {
          // seller: {},
          // buyer: {},
          pending: false,
          success: false,
          error: true,
        },
      };
    case common.UPDATE_USER_PROFILE_PENDING:
      return {
        ...state,
        user: {
          ...state.user,
          pending: true,
        }
      }
    case common.UPDATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: {
          buyer: {
            ...state.user.buyer,
            ...payload.buyer
          },
          seller: {
            ...state.user.seller,
            ...payload.seller
          },
          pending: false,
          success: true,
          error: false,
        }
      }
    }
    case common.UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          pending: false,
          success: false,
          error: true,
        }
      }
    case common.SET_MOBILE:
      return {
        ...state,
        mobile: null,
      }
    // case common.OTP_VERIFIED:
    //   return {
    //     ...state,
    //     otpVerified: true,
    //   };
    case common.SET_USER_TYPE: {
      return {
        ...state,
        userType: payload || localStorage.getItem("userType"),
        otpVerified: false
      };
    }
    case common.LOGOUT_PENDING:
      return {
        ...state,
        user: {
          ...state.user,
          pending: true,
        },
        pending: true,
        success: false,
        error: false,
        sellerActiveNumbers: {
          numbers: [],
          pending: false,
          success: false,
          error: false
        },
        activeSellerCount: {
          ...state.activeSellerCount,
          key: '',
          value: 0
        }
      }
    case common.LOGOUT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: false,
        error: false,
        userExist: false,
        existUserData: {},
        user: {
          buyer: {},
          seller: {},
          pending: false,
          success: true,
          error: false,
        },
        otpVerified: false,
        verify: {
          errorMessage: "",
          otp: null,
          pending: false,
          success: false,
          error: false,
        },
        sellerActiveNumbers: {
          numbers: [],
          pending: false,
          success: false,
          error: false
        },
        sellerActiveNumber: null
      }
    case common.LOGOUT_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        user: {
          ...state.user,
          pending: false,
          success: false,
          error: true,
        }
      }
    case seller.DELETE_SELLER_PRODUCT_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          seller: {
            ...state.user.seller,
            ...payload,
          },
        }
      }
    }
    case seller.ADD_SELECTED_PRODUCTS_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          seller: {
            ...state.user.seller,
            ...payload
          },
        }
      }
    }
    case seller.UPDATE_SELLER_PRODUCT_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          seller: {
            ...state.user.seller,
            ...payload[0]
          },
        },
        seller: {
          ...state.user.seller,
          ...payload[0],
        }
      }
    }

    case common.OTP_VERIFIED_STATUS:
      return {
        ...state,
        otpVerified: false,
        verify: {
          otp: null,
          pending: false,
          success: false,
          error: false,
        }
      };

    case common.GET_SUBSCRPTION_PLAN_PENDING: {
      return {
        ...state,

        ...state.subscriptionPlan,
        pending: payload,
      };
    }

    case common.GET_SUBSCRPTION_PLAN_SUCCESS: {
      return {
        ...state,
        subscriptionPlan: payload,
        pending: false,
        succuss: true,
        error: false,
      };
    }

    case common.GET_SUBSCRPTION_PLAN_ERROR: {
      return {
        ...state,
        ...state.subscriptionPlan,
        error: true,
        pending: false,
      };
    }
    case common.GET_REFERRAL_CODE_PENDING: {
      return {
        ...state,
        ...state.referralCode,
        pending: payload,
      };
    }

    case common.GET_REFERRAL_CODE_SUCCESS: {
      return {
        ...state,
        referralCode: payload,
        pending: false,
        succuss: true,
        error: false,
      };
    }

    case common.GET_REFERRAL_CODE_ERROR: {
      return {
        ...state,
        ...state.referralCode,
        error: true,
        pending: false,
      };
    }

    case common.SELECTED_TAB: {
      return {
        ...state,
        selectedTab: payload
      }
    }
    case common.SELECTED_TAB_BP: {
      return {
        ...state,
        selectedTabBp: payload
      }
    }
    case common.VERIFY_EMAIL_PENDING:
      return {
        ...state,
        emailVerified: false
      };
    case common.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true
      };
    case common.VERIFY_EMAIL_ERROR:
      return {
        ...state,
        emailVerified: true
      };

    case common.SET_LANG: {
      return {
        ...state,
        reset: false
      }
    }
    case common.FORGET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: true,
      }
    }
    case common.CLEAR_DATA:
      return {
        ...state,
        mobile: null,
        verify: {
          otp: null,
          pending: false,
          success: false,
          error: false,
          errorMessage: ""
        },
        otpVerified: false,
        pending: false,
        success: false,
        error: false,
        added: false,
        registered: false,
        resetPassword: false,
        user: {
          buyer: {},
          seller: {},
          pending: false,
          success: false,
          error: false,
        },
        subscriptionPlan: {
          pending: false,
          success: false,
          error: false
        },
        accessToken: {
          token: null,
          pending: false,
          success: false,
          error: false,
        },
        selectedTab: null,
        emailVerified: false,
        reset: true,
        userExist: false
      }

    case common.DELETE_ACCOUNT_PENDING:
      return {
        ...state,
        deleteAccount: {
          deleteAccount: {},
          pending: true,
          success: false,
          error: false,
        },
      };
    case common.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccount: {
          // deleteAccount: payload,
          pending: false,
          success: true,
          error: false,
        },
      };
    case common.DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        deleteAccount: {
          deleteAccount: {},
          pending: false,
          success: false,
          error: true,
        },
      };

    case search.ACTIVE_SELLER_NUMBERS: {
      return {
        ...state,
        sellerActiveNumbers: {
          ...state.sellerActiveNumbers,
          numbers: payload ? [...state.sellerActiveNumbers.numbers, payload] : [...state.sellerActiveNumbers.numbers, state.sellerActiveNumber]
        }
      }

    }
    case search.SET_ACTIVE_NUMBER: {
      return {
        ...state,
        sellerActiveNumber: payload
      }

    }

    case search.ACTIVE_SELLER_COUNT: {
      return {
        ...state,
        activeSellerCount: {
          ...state.activeSellerCount,
          ...payload
        }
      }

    }

    case common.VERIFY_USER_EMAIL_PENDING:
      return {
        ...state,
        verifyEmail: {
          pending: true,
          success: false,
          error: false,
          verificationMsg: '',
          linkSent: true
        }
      }

    case common.VERIFY_USER_EMAIL_SUCCESS: {
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          pending: false,
          success: true,
          error: false,
          verificationMsg: payload.message
        }
      }
    }

    case common.VERIFY_USER_EMAIL_ERROR:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          pending: false,
          success: false,
          error: true,
          verificationMsg: ''
        }
      }

    default:
      return state;
  }
}