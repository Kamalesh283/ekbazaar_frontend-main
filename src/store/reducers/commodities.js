import {
  actionTypes
} from "../../utils/constants";

const {
  commodities,
} = actionTypes;

const initialState = {
    Commidities: {
      Commidities:[], 
      pending: false,
      success: false,
      error: false,
    },
    News : {
      News : [],
      pending:false,
      success:false,
      error:false
    }
};

export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action;

    switch (type) {
      case commodities.GET_COMMODITIES_PENDING: {
        return {
          ...state,
          Commidities: {
            Commidities: [],
            pending: true,
            success: false,
            error: false
          }
        }
      }
      case commodities.GET_COMMODITIES_SUCCESS: {
        return {
          ...state,
          Commidities: {
            Commidities: payload,
            pending: false,
            success: true,
            error: false
          }
        }
      }
      case commodities.GET_COMMODITIES_ERROR: {
        return {
          ...state,
          Commidities: {
            Commidities: [],
            pending: false,
            success: false,
            error: true
          }
        }
      }
       case commodities.GET_NEWS_PENDING: {
        return {
          ...state,
          News: {
            News: [],
            pending: true,
            success: false,
            error: false
          }
        }
      }
      case commodities.GET_NEWS_SUCCESS: {
        return {
          ...state,
          News: {
            News: payload,
            pending: false,
            success: true,
            error: false
          }
        }
      }
      case commodities.GET_NEWS_ERROR: {
        return {
          ...state,
          News: {
            News: [],
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