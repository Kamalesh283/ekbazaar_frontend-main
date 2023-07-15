import { actionTypes } from '../../utils/constants'
import {
    setOtp,
    getOtp,
    removeOtp
} from '../actions/sellers'
const { user, others, tender } = actionTypes

const initialState = {
  user: {
  },
  pending: false,
  success: false,
  error: false,
  errorMsg: null,
  successMsg: null,

  logout: {
    pending: false,
    success: false,
    error: false
  },

  natureOfWork: {
    natureOfWork: [],
    pending: false,
    success: false,
    error: false
  },
  preferences: {
    preferences: [],
    pending: false,
    success: false,
    error: false,
    successMsg: null,
    errorMsg: null,
    render: false
  },
  indPreference:{
    indPreference:{
    },
    pending: false,
    success: false,
    error: false,
  },
  fevoriteTenders: {
    fevoriteTenders: [],
    pending: false,
    success: false,
    error: false
  },
  tenderFilters: {
    tenderFilters: {
    },
    pending: false,
    success: false,
    error: false
  },
  forgotPassword: {
    forgotPassword: {
    },
    pending: false,
    success: false,
    error: false
  },
  validatePasswordToken: {
    validatePasswordToken: {
    },
    pending: false,
    success: false,
    error: false
  },
  updateNewPassword: {
    updateNewPassword: {
    },
    pending: false,
    success: false,
    error: false
  },
  notifications: {
    notifications: {
    },
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
  validatePhoneNumber: {
    otp: '',
    pending: false,
    success: false,
    error: false
  },
  emailAlerts: {
    alerts: {

    },
    pending: false,
    success: false,
    error: false
  },
  checkUserExist: {
    pending: false,
    success: false,
    error: false
  },
  otpVerified: false,
  userProfileSuccess: false,
  addUserDataSuccess: false,
  defaultPreferencesdepartment: [],
  defaultPreferenceslocation: []
}

export default function(state = initialState, action) {

  const { type, payload } = action
  switch (type) {

  default:
    return state

  }

}
