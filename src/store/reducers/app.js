import { actionTypes } from "../../utils/constants";
import {
  getAuthToken,
  getPermission,
  setPermission,
  removePermission,
  setAuthToken,
  removeAuthToken,
} from "../../utils/auth";

const { app } = actionTypes;

const initialState = {
  permission: getPermission() ? true : false,
  auth: getAuthToken() ? true : false,
  showModel: false,
  msg: {
    type: "success",
    msg: "",
  },
  redirectUrl: "",
  autoModal: false,
  expireTime: 1,
  browserToken: null,
  currency: "",
  IPDetails: {},
  siteLanguage: '',
  searchCountry: {
    label: 'all india',
    value: '5e312f978acbee60ab54de08'
  }
};

const appStates = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {

    case app.SITE_LANGUAGE: 
    return {
      ...state,
      siteLanguage: payload

    }
    case app.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: null,
      };

    case app.SET_COOKIE: {
      setPermission({
        token: "Granted",
        expireTime: state.expireTime,
      });
      return {
        ...state,
        permission: payload,
      };
    }

    case app.CLEAR_COOKIE:
      removePermission();
      return {
        ...state,
        permission: payload,
      };

    case app.SET_TOKEN: {
      setAuthToken(payload);
      return {
        ...state,
        auth: payload ? true : false,
        expireTime: payload.expireTime,
      };
    }

    case app.GET_TOKEN: {
      return {
        ...state,
        browserToken: payload
      }
    }

    case app.CLEAR_TOKEN:
      removeAuthToken();
      return {
        ...state,
        auth: false,
      };

    case app.MODAL_SHOW:
      return {
        ...state,
        showModel: true,
      };

    case app.MODAL_HIDE:
      return {
        ...state,
        showModel: false,
      };

    case app.SET_ALERT: {
      return {
        ...state,
        msg: {
          ...payload,
        },
      }
    }

    case app.CLEAR_ALERT:
      return {
        ...state,
        msg: {
          ...payload,
        },
      };
    case app.LOCATION_REDIRECT:
      return {
        ...state,
        redirectUrl: payload,
      };

    case app.AUTO_MODAL_SHOW:
      return {
        ...state,
        autoModal: true,
      };

    case app.AUTO_MODAL_HIDE:
      return {
        ...state,
        autoModal: false,
      };

    case app.SET_CURRENCY:
      return {
        ...state,
        currency: payload,
      };
    case app.SET_IP_DETAILS: {
      return {
        ...state,
        IPDetails: payload
      }
    }
    case app.SET_SEARCH_COUNTRY: {
      return {
        ...state,
        searchCountry: payload
      }
    }

    default:
      return state;
  }
};

export default appStates;
