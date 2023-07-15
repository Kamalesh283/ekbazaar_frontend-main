import request from "../request";
import ssoRequest from "../sso-request"

/**
 * SSO CHECK
 * swgger_document Done
 */
export const checkForLoggedUserApi = () => {
  const url = 'logged'
  // return request({
  //   url,
  //   method: 'get'
  // })
  return ssoRequest({
    url,
    method: "GET",
    params: {
      origin: "trade"
    }
  })
}


/**
 * get access token
 * swgger_document Done
 */
export const getAccessTokenApi = (data) => {
  const url = 'user/access-token'
  return request({
    url,
    params: data,
    method: 'get'
  })
}

/**
 * user exist
 * swgger_document Done
 */
export const checkUserExistApi = (data) => {
  const url = "user/check-user-exist";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * send otp
 * swgger_document Done
 */
export const sendOtpApi = (data) => {
  const url = "user/send-otp";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * verify mobile
 * swgger_document Done
 */
export const verifyMobileApi = (data) => {
  const url = "user/verify-mobile";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * add user
 * swgger_document Done
 */
export const addUserApi = (data) => {
  const url = "user";
  // return request({
  //   url,
  //   data,
  //   method: "post",
  // });
  data.origin = "trade"
  return ssoRequest({
    url,
    data,
    method: "post",
  })
};

/**
 * user login
 * swgger_document Done
 */
export const loginApi = (data) => {
  const url = "user/login";
  // return request({
  //   url,
  //   data,
  //   method: "post",
  // });
  data.origin = "trade"
  return ssoRequest({
    url,
    data,
    method: "post",
  })
};

/**
 * get user
 * swgger_document Done
 */
export const getUserProfileApi = (data) => {
  const url = "user/profile";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * update user
 * swgger_document Done
 */
export const updateUserProfileApi = (data) => {
  const url = 'user'
  return request({
    url,
    data,
    method: "put",
  });
}

/**
 * update user preferred language
 * swgger_document Done
 */
export const updateLanguageApi = data => {
  const url = "user-update-language"
  return request({
    url,
    data,
    method: "put",
  });
}

/**
 * user logout
 * swgger_document Done
 */
export const logoutApi = (data) => {
  const url = "user/logout";
  // return request({
  //   url,
  //   data,
  //   method: "post",
  // });
  if (data) data.origin = "trade"
  else {
    data = {
      origin: "trade"
    }
  }
  return ssoRequest({
    url,
    data,
    method: "post",
  })
};

/**
 * forget password
 * swgger_document Done
 */
export const forgetPasswordApi = (data) => {
  const url = "user/forget-password";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * update password
 * swgger_document Done
 */
export const updatePasswordApi = (data) => {
  const url = "user/update-password";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * update new password
 * not is use
 */
export const updateNewPasswordApi = (data) => {
  const url = "user/new-password";
  return request({
    url,
    data,
    method: "post",
  });
};
/**
 * get subscription plan
 * swgger_document Done
 */
export const getSubscriptionPlanApi = (data) => {
  // console.log(data,"#$################################");
  const url = "/subscriptionplan";
  return request({
    url,
    params: data,
    method: "get",
  });
};

/**
 * verify email
 * swgger_document Done
 */
export const verifyEmailApi = (data) => {
  const url = "user/verify-email";
  return request({
    url,
    data,
    method: "post",
  });
};


/**
 * DELETE ACCOUNT
 * swgger_document Done
 */
export const deleteAccountApi = (data) => {
  const url = "user/deleteCurrentAccount";
  return request({
    url,
    data,
    method: "post",
  });
};

/**
 * Not In Use.
 */

export const userVerifyEmailApi = (data) => {

  const url = 'user/email-verification'
  return request({
    url,
    data,
    method: 'post'
  })

}
export const getReferralCodeApi = () => {
  const url = "/referralcode?client=ekb";

  return request({
    url,
    method: "get",
  });
};
// { "client": { $in: [1, 2] } } { $or: [{ "client": 1 }, { "client": 2 }] }
// params: {
//   client: { $in: ["ekbazaar", "both"] }
// }