import { actionTypes } from "../../utils/constants";
import { handlePermission } from "../../utils/geoLocation"
const { common, sso, search } = actionTypes;

export const acticateAccount = (data) => {
  return {
    type: common.ACTIVATE_ACCOUNT,
    payload: data,
  };
};

export const removemylistingurl = (data) => {
  return {
    type: common.REMOVE_MY_LISTING,
    payload: data,
  };
};

/**
 * SSO CHECK
 */
export const checkForLoggedUser = () => {
  return {
    type: sso.SSO_REDIRECT
  };
}
export const checkForLoggedUserPending = () => {
  return {
    type: sso.SSO_REDIRECT_PENDING
  };
}

export const checkForLoggedUserSuccess = () => {
  return {
    type: sso.SSO_REDIRECT_SUCCESS
  };
}

export const checkForLoggedUserError = () => {
  return {
    type: sso.SSO_REDIRECT_ERROR
  };
}

/**
 * access token
 */
export const getAccessToken = (data) => {
  return {
    type: common.GET_ACCESS_TOKEN,
    payload: data,
  };
};

export const getAccessTokenPending = (data) => {
  return {
    type: common.GET_ACCESS_TOKEN_PENDING,
    payload: data,
  };
};

export const getAccessTokenSuccess = (data) => {
  return {
    type: common.GET_ACCESS_TOKEN_SUCCESS,
    payload: data,
  };
};

export const getAccessTokenError = (data) => {
  return {
    type: common.GET_ACCESS_TOKEN_ERROR,
    payload: data,
  };
};

/**
 * check user exist
 */
export const checkUserExist = (data) => {
  return {
    type: common.CHECK_USER_EXIST,
    payload: data,
  };
};

export const checkUserExistPending = (data) => {
  return {
    type: common.CHECK_USER_EXIST_PENDING,
    payload: data,
  };
};

export const checkUserExistSuccess = (data) => {
  return {
    type: common.CHECK_USER_EXIST_SUCCESS,
    payload: data,
  };
};

export const checkUserExistError = (data) => {
  return {
    type: common.CHECK_USER_EXIST_ERROR,
    payload: data,
  };
};

/**
 * send otp
 */
export const sendOtp = (data) => {
  return {
    type: common.SEND_OTP,
    payload: data,
  };
};

export const sendOtpPending = (data) => {
  return {
    type: common.SEND_OTP_PENDING,
    payload: data,
  };
};

export const sendOtpSuccess = (data) => {
  return {
    type: common.SEND_OTP_SUCCESS,
    payload: data,
  };
};

export const sendOtpError = (data) => {
  return {
    type: common.SEND_OTP_ERROR,
    payload: data,
  };
};

/**
 * set otp
 */
export const setOtp = () => {
  return {
    type: common.SET_OTP,
    paylaod: ""
  }
}
/**
 * set mobile
 */
export const setMobile = () => {
  return {
    type: common.SET_MOBILE,
    paylaod: ""
  }
}

/**
 * otp verified
 */
export const otpVerified = () => {
  return {
    type: common.OTP_VERIFIED,
    payload: true,
  };
};

/**
 * verify mobile
 */
export const verifyMobile = (data) => {
  return {
    type: common.VERIFY_MOBILE,
    payload: data,
  };
};

export const verifyMobilePending = (data) => {
  return {
    type: common.VERIFY_MOBILE_PENDING,
    payload: data,
  };
};

export const verifyMobileSuccess = (data) => {
  return {
    type: common.VERIFY_MOBILE_SUCCESS,
    payload: data,
  };
};

export const verifyMobileError = (data) => {
  return {
    type: common.VERIFY_MOBILE_ERROR,
    payload: data,
  };
};

/**
 * add user
 */
export const addUser = (data) => {
  return {
    type: common.ADD_USER,
    payload: data,
  };
};

export const addUserPending = (data) => {
  return {
    type: common.ADD_USER_PENDING,
    payload: data,
  };
};

export const addUserSuccess = (data) => {
  return {
    type: common.ADD_USER_SUCCESS,
    payload: data,
  };
};

export const addUserError = (data) => {
  return {
    type: common.ADD_USER_ERROR,
    payload: data,
  };
};

/**
 * user added
 */
export const userAdded = () => {
  return {
    type: common.USER_ADDED,
    payload: true
  }
}

/**
 * reset password
 */
export const resetPassword = (data) => {
  return {
    type: common.RESET_PASSWORD,
    payload: data
  }
}

/**
 * login
 */
export const login = (data) => {
  return {
    type: common.LOGIN,
    payload: data,
  };
};

export const loginPending = (data) => {
  return {
    type: common.LOGIN_PENDING,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: common.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginError = (data) => {
  return {
    type: common.LOGIN_ERROR,
    payload: data,
  };
};

/**
 * RFP LOGIN
 */
export const rfpLogin = (data) => {
  return {
    type: common.RFP_LOGIN,
    payload: data,
  };
};

/**
 * get user
 */
export const getUserProfile = (data) => {
  return {
    type: common.GET_USER_PROFILE,
    payload: data,
  };
};

export const getUserProfilePending = (data) => {
  return {
    type: common.GET_USER_PROFILE_PENDING,
    payload: data,
  };
};

export const getUserProfileSuccess = (data) => {
  return {
    type: common.GET_USER_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getUserProfileError = (data) => {
  return {
    type: common.GET_USER_PROFILE_ERROR,
    payload: data,
  };
};

/**
 * update user
 */
export const updateUserProfile = (data) => {
  return {
    type: common.UPDATE_USER_PROFILE,
    payload: data,
  };
};

export const updateUserProfilePending = (data) => {
  return {
    type: common.UPDATE_USER_PROFILE_PENDING,
    payload: data,
  };
};

export const updateUserProfileSuccess = (data) => {
  return {
    type: common.UPDATE_USER_PROFILE_SUCCESS,
    payload: data,
  };
};

export const updateUserProfileError = (data) => {
  return {
    type: common.UPDATE_USER_PROFILE_ERROR,
    payload: data,
  };
};

/**
 * update user preferred language
 */
export const updateLanguage = (data) => {
  return {
    type: common.UPDATE_LANGUAGE,
    payload: data,
  };
};

export const updateLanguagePending = (data) => {
  return {
    type: common.UPDATE_LANGUAGE_PENDING,
    payload: data,
  };
};

export const updateLanguageSuccess = (data) => {
  return {
    type: common.UPDATE_LANGUAGE_SUCCESS,
    payload: data,
  };
};

export const updateLanguageError = (data) => {
  return {
    type: common.UPDATE_LANGUAGE_ERROR,
    payload: data,
  };
};

/**
 * logout
 */
export const logout = (data) => {
  return {
    type: common.LOGOUT,
    payload: data,
  };
};

export const logoutPending = (data) => {
  return {
    type: common.LOGOUT_PENDING,
    payload: data,
  };
};

export const logoutSuccess = (data) => {
  return {
    type: common.LOGOUT_SUCCESS,
    payload: data,
  };
};

export const logoutError = (data) => {
  return {
    type: common.LOGOUT_ERROR,
    payload: data,
  };
};

/**
 * forget password
 */
export const forgetPassword = (data) => {
  return {
    type: common.FORGET_PASSWORD,
    payload: data,
  };
};

export const forgetPasswordPending = (data) => {
  return {
    type: common.FORGET_PASSWORD_PENDING,
    payload: data,
  };
};

export const forgetPasswordSuccess = (data) => {
  return {
    type: common.FORGET_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const forgetPasswordError = (data) => {
  return {
    type: common.FORGET_PASSWORD_ERROR,
    payload: data,
  };
};

/**
 * update password
 */
export const updatePassword = (data) => {
  return {
    type: common.UPDATE_PASSWORD,
    payload: data,
  };
};

export const updatePasswordPending = (data) => {
  return {
    type: common.UPDATE_PASSWORD_PENDING,
    payload: data,
  };
};

export const updatePasswordSuccess = (data) => {
  return {
    type: common.UPDATE_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const updatePasswordError = (data) => {
  return {
    type: common.UPDATE_PASSWORD_ERROR,
    payload: data,
  };
};

/**
 * update new password
 */
export const updateNewPassword = (data) => {
  return {
    type: common.UPDATE_NEW_PASSWORD,
    payload: data,
  };
};

export const updateNewPasswordPending = (data) => {
  return {
    type: common.UPDATE_NEW_PASSWORD_PENDING,
    payload: data,
  };
};

export const updateNewPasswordSuccess = (data) => {
  return {
    type: common.UPDATE_NEW_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const updateNewPasswordError = (data) => {
  return {
    type: common.UPDATE_NEW_PASSWORD_ERROR,
    payload: data,
  };
};

/**
 * ueer type
 */
export const setUserType = (data) => {
  localStorage.setItem("userType", data)
  return {
    type: common.SET_USER_TYPE,
    payload: data
  }
}

/**
 * get user current location
 */
export const getCurrentLocation = () => {
  handlePermission()
  return {
    type: common.SET_USER_TYPE,
    payload: ''
  }
}

/**
 * set seller mobile
 */
// export const setSellerMobile = (data) => {
//   return {
//     type: seller.SET_SELLER_MOBILE,
//     payload: data,
//   };
// };

/**
 * otp verified clear
 */
export const changeOtpVerifiedStatus = () => {
  return {
    type: common.OTP_VERIFIED_STATUS,
    payload: false,
  };
};

/**
 * get subscription plan
 */
export const getSubscriptionPlan = (data) => {
  return {
    type: common.GET_SUBSCRPTION_PLAN,
    payload: data,
  };
};

export const getSubscriptionPlanPending = (data) => {
  return {
    type: common.GET_SUBSCRPTION_PLAN_PENDING,
    payload: data,
  };
};

export const getSubscriptionPlanSuccess = (data) => {
  return {
    type: common.GET_SUBSCRPTION_PLAN_SUCCESS,
    payload: data,
  };
};

export const getSubscriptionPlanError = (data) => {
  return {
    type: common.GET_SUBSCRPTION_PLAN_ERROR,
    payload: data,
  };
};
/**
 * get ReferralCodes 
 */
export const getReferralCode = (data) => {
  return {
    type: common.GET_REFERRAL_CODE,
    payload: data,
  };
};
export const getReferralCodePending = (data) => {
  return {
    type: common.GET_REFERRAL_CODE_PENDING,
    payload: data,
  };
};

export const getReferralCodeSuccess = (data) => {
  return {
    type: common.GET_REFERRAL_CODE_SUCCESS,
    payload: data,
  };
};
export const getReferralCodeError = (data) => {
  return {
    type: common.GET_REFERRAL_CODE_ERROR,
    payload: data,
  };
};

export const selectedTab = (data) => {
  return {
    type: common.SELECTED_TAB,
    payload: data
  }
}

export const selectedTabBp = (data) => {
  return {
    type: common.SELECTED_TAB_BP,
    payload: data
  }
}

/**
 * verify email
 */
export const verifyEmail = (data) => {
  return {
    type: common.VERIFY_EMAIL,
    payload: data,
  };
};

export const verifyEmailPending = (data) => {
  return {
    type: common.VERIFY_EMAIL_PENDING,
    payload: data,
  };
};

export const verifyEmailSuccess = (data) => {
  return {
    type: common.VERIFY_EMAIL_SUCCESS,
    payload: data,
  };
};

export const verifyEmailError = (data) => {
  return {
    type: common.VERIFY_EMAIL_ERROR,
    payload: data,
  };
};

export const clear = () => {
  return {
    type: common.CLEAR_DATA
  }
}

export const setLang = () => {
  return {
    type: common.SET_LANG
  }
}

/**
 * RESET USER(BUYER) DATA FOR LOGIN
 */
export const resetUser = (data) => {
  return {
    type: common.RESET_USER,
    payload: data
  }
}

/**
 * Delete Account from site
 */
export const deleteAccount = (data) => {
  return {
    type: common.DELETE_ACCOUNT,
    payload: data,
  };
};

export const deleteAccountPending = (data) => {
  return {
    type: common.DELETE_ACCOUNT_PENDING,
    payload: data,
  };
};

export const deleteAccountSuccess = (data) => {
  return {
    type: common.DELETE_ACCOUNT_SUCCESS,
    payload: data,
  };
};

export const deleteAccountError = (data) => {
  return {
    type: common.DELETE_ACCOUNT_ERROR,
    payload: data,
  };
};


export const searchActiveSellerNumbers = (data) => {

  return {
    type: search.ACTIVE_SELLER_NUMBERS,
    payload: data
  }

}
export const setActiveNumber = (data) => {

  return {
    type: search.SET_ACTIVE_NUMBER,
    payload: data
  }

}
export const activeSellerCount = (data) => {

  return {
    type: search.ACTIVE_SELLER_COUNT,
    payload: data
  }

}


export const verifyUserEmail = data => {

  return {
    type: common.VERIFY_USER_EMAIL,
    payload: data
  }

}

export const verifyUserEmailPending = data => {

  return {
    type: common.VERIFY_USER_EMAIL_PENDING,
    payload: data
  }

}

export const verifyUserEmailSuccess = data => {

  return {
    type: common.VERIFY_USER_EMAIL_SUCCESS,
    payload: data
  }

}

export const verifyUserEmailError = data => {

  return {
    type: common.VERIFY_USER_EMAIL_ERROR,
    payload: data
  }

}

