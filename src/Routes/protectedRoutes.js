import React, {lazy} from 'react'

// const Home = lazy(() => import("../Views/Home/Home"))
// const AddingNew = lazy(() => import("../Views/AddingNew/AddingNew"))
// const BuyerPreference = lazy(() => import("../Views/BuyerPreference/BuyerPreference"))
// const MyProduct = lazy(() => import("../Views/MyProduct/MyProduct"))
// const ProductInventory = lazy(() => import("../Views/ProductInventory/ProductInventory"))
// const ProductSelection = lazy(() => import("../Views/ProductSelection/ProductSelection"))
// const SellerAccount = lazy(() => import("../Views/SellerAccount/SellerAccount"))
// const SellerBusinessDetails = lazy(() => import("../Views/SellerBusinessDetails/SellerBusinessDetails"))
// const SellerCentral = lazy(() => import("../Views/SellerCentral/SellerCentral"))
// const ThankYou = lazy(() => import("../Views/ThankYou/ThankYou"))
// const Profile = lazy(() => import("../Views/Profile/Profile"))
// const BuyerPrefernceMobile = lazy(() => import("../Containers/BuyerPrefernceMobile/BuyerPrefernceMobile"))
// const Xs_Account = lazy(() => import("../Containers/Xs_Account/Xs_Account"))
// const Xs_Bussiness = lazy(() => import("../Containers/Xs_Bussiness/Xs_Bussiness"))
// const Enquiry = lazy(() => import("../Views/Enquiry/Enquiry"))
// const PurchaseSubscription = lazy(() => import("../Views/PurchaseSubscription/PurchaseSubscription"))
// const SellerChat = lazy(() => import("../Views/SellerChat/SellerChat"))
// // const GlobalOffer = lazy(() => import("../Views/GlobalOffer/GlobalOffer"))
// // const OfferSearch = lazy(() => import("../Views/OfferSearch/OfferSearch"))
// const SellerProductOffers = lazy(() => import('../Containers/SellerProductOffers/SellerProductOffers'))

import Home from "../Views/Home/Home"
import AddingNew from "../Views/AddingNew/AddingNew"
import BuyerPreference from "../Views/BuyerPreference/BuyerPreference"
import MyProduct from "../Views/MyProduct/MyProduct"
import ProductInventory from "../Views/ProductInventory/ProductInventory"
import ProductSelection from "../Views/ProductSelection/ProductSelection"
import SellerAccount from "../Views/SellerAccount/SellerAccount"
import SellerBusinessDetails from "../Views/SellerBusinessDetails/SellerBusinessDetails"
import SellerCentral from "../Views/SellerCentral/SellerCentral"
import ThankYou from "../Views/ThankYou/ThankYou"
import Profile from "../Views/Profile/Profile"
import BuyerPrefernceMobile from "../Containers/BuyerPrefernceMobile/BuyerPrefernceMobile"
import Xs_Account from "../Containers/Xs_Account/Xs_Account"
import Xs_Bussiness from "../Containers/Xs_Bussiness/Xs_Bussiness"
import Enquiry from "../Views/Enquiry/Enquiry"
import PurchaseSubscription from "../Views/PurchaseSubscription/PurchaseSubscription"
import SellerChat from "../Views/SellerChat/SellerChat"
// import GlobalOffer from "../Views/GlobalOffer/GlobalOffer"
// import OfferSearch from "../Views/OfferSearch/OfferSearch"
import SellerProductOffers from '../Containers/SellerProductOffers/SellerProductOffers'

import {
    rootPath,
    enquiry,
    bp,
    preference,
    seller,
    thankyou,
    profile,
    selleraccount,
    productinventory,
    myproduct,
    buyerpreference,
    newproduct,
    sellerproduct,
    productselection,
    xsaccount,
    xsbussiness,
    purchasesubscription,
    sellerchat,
    selleraccountplan,
    offer,
    offersearch,
    sellerProductOffers,
} from './path'

const privateRoutes = [
    {
        path: rootPath,
        component: Home
    },
    {
         path: preference,
        component: BuyerPreference,
        exact: false
    }, {
         path: seller,
        component: SellerCentral
    }, {
        path: selleraccount,
        component: SellerAccount
    },{
        path: selleraccountplan,
        component: SellerAccount
    }, {
        path: bp,
         component: SellerBusinessDetails
    },
    {
        path: productinventory,
        component: ProductInventory
    }, {
        path: myproduct,
        component: MyProduct
    }, {
         path: newproduct,
        component: AddingNew
    },
    {
        path: productselection,
         component: ProductSelection
    },
    {
        path: sellerproduct,
        component: ProductInventory
    },
    {
        path: thankyou,
        component: ThankYou
    },
    {
        path: profile,
        component: Profile
    },
    {
        path: buyerpreference,
        component: BuyerPrefernceMobile
    }, {
        path: xsaccount,
        component: Xs_Account
    }, {
        path: xsbussiness,
        component: Xs_Bussiness
    }, {
         path: enquiry,
        component: Enquiry
    }, {
        path: purchasesubscription,
        component: PurchaseSubscription
    },{
        path:sellerchat,
        component:SellerChat

    },
    // {
    //     path:offer,
    //     component:GlobalOffer

    // },
    // {
    //     path:offersearch,
    //     component:OfferSearch

    // },
    {
        path:sellerProductOffers,
        component:SellerProductOffers

    },
  
]
export default privateRoutes
