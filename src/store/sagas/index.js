import { all, fork } from "redux-saga/effects";
import {
  getSpecificCategoriesWatcher,
  getAllCategoriesWatcher,
  getCategoryWatcher,
  getAllProductsWatcher,
  getSellerTypesWatcher,
  getSecondaryCategoriesWatcher,
  getProductsWatcher,
  getPrimaryCategoryWatcher,
  getLevelFiveProductsWatcher
} from "./categories";
import {
  getAllCitiesWatcher,
  getSellingCitiesWatcher,
  getAllStatesWatcher,
  getSellingStatesWatcher,
  getAllCountriesWatcher,
} from "./location";
import {
  checkForLoggedUserWatcher,
  getAccessTokenWatcher,
  checkUserExistWatcher,
  sendOtpWatcher,
  verifyMobileWatcher,
  addUserWatcher,
  loginWatcher,
  rfpLoginWatcher,
  getUserProfileWatcher,
  updateUserProfileWatcher,
  updateLanguageWatcher,
  logoutWatcher,
  forgetPasswordWatcher,
  updatePasswordWatcher,
  updateNewPasswordWatcher,
  getSubscriptionPlanWatcher,
  verifyEmailWatcher,
  deleteAccountWatcher,
  userVerifyEmailWatcher,
  getReferralCodeWatcher
} from "./common";
import {
  getSellerProfileWatcher,
  updateSellerProfileWatcher,
  updateSellerNotificationsWatcher,
  getSellerNotificationsWatcher,
  verifySellerEmailWatcher,
  sellerEmailVerifiedWatcher,
  deleteSellerProductWatcher,
  addSelectedProductWatcher,
  updateSellerProductWatcher,
  getSellerProductWatcher,
  getFilteredCitiesWatcher,
  getBuyerEnquiriesWatcher,
  deleteDocumentWatcher,
} from "./sellers";
import {
  postRFPWatcher,
  getBuyerProfileWatcher,
  updateBuyerProfileWatcher,
  updateBuyerNotificationsWatcher,
  getBuyerNotificationsWatcher,
  verifyBuyerEmailWatcher,
  buyerEmailVerifiedWatcher,
} from "./buyers";
import { getAllSellersWatcher, searchWatcher } from "./search";
import { postContactUsWatcher } from "./contactus"
import {
  postRemoveListingWatcher
} from "./removeListing"

import {
  acticateTrialPlanWatcher,
  createOrderIdWatcher,
  captureRazorPayOrderWatcher,
  getAllOrdersWatcher,
  cancelSubscriptionWatcher,
  createPaymentIdWatcher,
  captureRazorPaySubscriptionWatcher
} from "./plans"

import {
  chatLoginWatcher,
  getChatListWatcher,
  getChatHistoryWatcher,
  sendMessageWatcher,
  postMarkAsReadWatcher,
  setChatLanguageWatcher,
  getSellerChatDetailsWatcher,
  chatLogoutWatcher,
  // websocketSagas
  // websocketWatcher
  getAllChatTemplateWatcher
} from './chat'

import {
  getAllOffersWatcher,
  getSellerOffersWatcher,
  getBuyerRequestWatcher,
  postBuyerRequestWatcher,
  postSellerOfferContactsWatcher,
  deleteBuyerRequestWatcher
} from './offers'

import {
getCommiditiesWatcher,
getNewsWatcher
} from './commodities'
export default function* rootSaga() {
  yield all([
    // categories
    getSpecificCategoriesWatcher(),
    getAllCategoriesWatcher(),
    getCategoryWatcher(),
    getAllProductsWatcher(),
    getSellerTypesWatcher(),
    searchWatcher(),
    getAllSellersWatcher(),
    getSecondaryCategoriesWatcher(),
    getProductsWatcher(),
    getPrimaryCategoryWatcher(),
    getLevelFiveProductsWatcher(),

    // location
    getAllCitiesWatcher(),
    getSellingCitiesWatcher(),
    getAllStatesWatcher(),
    getSellingStatesWatcher(),
    getAllCountriesWatcher(),

    // common
    checkForLoggedUserWatcher(),
    getAccessTokenWatcher(),
    checkUserExistWatcher(),
    sendOtpWatcher(),
    verifyMobileWatcher(),
    addUserWatcher(),
    loginWatcher(),
    rfpLoginWatcher(),
    getUserProfileWatcher(),
    updateLanguageWatcher(),
    updateUserProfileWatcher(),
    logoutWatcher(),
    forgetPasswordWatcher(),
    updatePasswordWatcher(),
    updateNewPasswordWatcher(),
    getSubscriptionPlanWatcher(),
    verifyEmailWatcher(),
    deleteAccountWatcher(),
    userVerifyEmailWatcher(),
    getReferralCodeWatcher(),
    // seller
    getSellerProfileWatcher(),
    updateSellerProfileWatcher(),
    updateSellerNotificationsWatcher(),
    getSellerNotificationsWatcher(),
    verifySellerEmailWatcher(),
    sellerEmailVerifiedWatcher(),
    deleteSellerProductWatcher(),
    addSelectedProductWatcher(),
    updateSellerProductWatcher(),
    getSellerProductWatcher(),
    getFilteredCitiesWatcher(),
    getBuyerEnquiriesWatcher(),
    deleteDocumentWatcher(),

    // buyer
    postRFPWatcher(),
    getBuyerProfileWatcher(),
    updateBuyerProfileWatcher(),
    updateBuyerNotificationsWatcher(),
    getBuyerNotificationsWatcher(),
    verifyBuyerEmailWatcher(),
    buyerEmailVerifiedWatcher(),
    //contactus
    postContactUsWatcher(),
    //removeListing
    postRemoveListingWatcher(),

    // plans
    acticateTrialPlanWatcher(),
    createOrderIdWatcher(),
    captureRazorPayOrderWatcher(),
    getAllOrdersWatcher(),
    cancelSubscriptionWatcher(),
    createPaymentIdWatcher(),
    captureRazorPaySubscriptionWatcher(),

    // chat
    chatLoginWatcher(),
    getChatListWatcher(),
    getChatHistoryWatcher(),
    sendMessageWatcher(),
    postMarkAsReadWatcher(),
    setChatLanguageWatcher(),
    getSellerChatDetailsWatcher(),
    chatLogoutWatcher(),
    // websocketWatcher()
    // websocketSagas().
    getAllChatTemplateWatcher(),

    // offers
    getAllOffersWatcher(),
    getSellerOffersWatcher(),
    getBuyerRequestWatcher(),
    postBuyerRequestWatcher(),
    postSellerOfferContactsWatcher(),
    deleteBuyerRequestWatcher(),

    //commodities
    getCommiditiesWatcher(),
    getNewsWatcher(),
  ]);
}
