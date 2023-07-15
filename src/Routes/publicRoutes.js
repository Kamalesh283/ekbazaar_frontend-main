import React, { lazy } from 'react'

// const Home = lazy(() => import('../Views/Home/Home'))
// const CategorylevelOne = lazy(() => import('../Views/CategorylevelOne/CategorylevelOne'))
// const CategorylevelTwo = lazy(() => import('../Views/CategorylevelTwo/CategorylevelTwo'))
// const Listing = lazy(() => import('../Views/Listing/Listing'))
// const ProductDesMem = lazy(() => import('../Views/ProductDesMem/ProductDesMem'))
// const ProductDesNonMem = lazy(() => import('../Views/ProductDesNonMem/ProductDesNonMem'))
// const CategoryMain = lazy(() => import('../Views/CategoryMain/CategoryMain'))
// const SignUp = lazy(() => import('../Views/SignUp/SignUp'))
// const SignIn = lazy(() => import('../Views/SignIn/SignIn'))
// const ResetPassword = lazy(() => import('../Views/ResetPassword/ResetPassword'))
// const CompanyProfileNon = lazy(() => import('../Views/CompanyProfileNon/CompanyProfileNon'))
// const Aboutview = lazy(() => import('../Views/Aboutview/Aboutview'))
// const Faq = lazy(() => import('../Views/Faq/Faq'))
// const ContactDetail = lazy(() => import('../Views/ContactDetail/ContactDetail'))
// const PrivacyPolicy = lazy(() => import('../Views/PrivacyPolicy/PrivacyPolicy'))
// const Disclaimer = lazy(() => import('../Views/Disclaimer/Disclaimer'))
// const FreeTrial = lazy(() => import('../Views/FreeTrial/FreeTrial'))
// const CategorylevelFive = lazy(() => import('../Views/categotyLevelFive/categoryLevelFive'))
// const UserVerificationView = lazy(() => import('../Views/UserVerificationView/UserVerificationView'))
// const PricingView = lazy(() => import('../Views/PricingView/PricingView'))
// const PurchaseSubscription = lazy(() => import('../Views/PurchaseSubscription/PurchaseSubscription'))
// const RefundPolicy = lazy(() => import('../Views/RefundPolicy/RefundPolicy'))
// const ThankYou = lazy(() => import("../Views/ThankYou/ThankYou"))
// const GlobalOffer = lazy(() => import("../Views/GlobalOffer/GlobalOffer"))
// const OfferSearch = lazy(() => import("../Views/OfferSearch/OfferSearch"))

import Home from '../Views/Home/Home'
import CategorylevelOne from '../Views/CategorylevelOne/CategorylevelOne'
import CategorylevelTwo from '../Views/CategorylevelTwo/CategorylevelTwo'
import Listing from '../Views/Listing/Listing'
import ProductDesMem from '../Views/ProductDesMem/ProductDesMem'
import ProductDesNonMem from '../Views/ProductDesNonMem/ProductDesNonMem'
import CategoryMain from '../Views/CategoryMain/CategoryMain'
import SignUp from '../Views/SignUp/SignUp'
import SignIn from '../Views/SignIn/SignIn'
import ResetPassword from '../Views/ResetPassword/ResetPassword'
import CompanyProfileNon from '../Views/CompanyProfileNon/CompanyProfileNon'
import Aboutview from '../Views/Aboutview/Aboutview'
import Faq from '../Views/Faq/Faq'
import ContactDetail from '../Views/ContactDetail/ContactDetail'
import PrivacyPolicy from '../Views/PrivacyPolicy/PrivacyPolicy'
import Disclaimer from '../Views/Disclaimer/Disclaimer'
import FreeTrial from '../Views/FreeTrial/FreeTrial'
import CategorylevelFive from '../Views/categotyLevelFive/categoryLevelFive'
import UserVerificationView from '../Views/UserVerificationView/UserVerificationView'
import PricingView from '../Views/PricingView/PricingView'
import PurchaseSubscription from '../Views/PurchaseSubscription/PurchaseSubscription'
import RefundPolicy from '../Views/RefundPolicy/RefundPolicy'
import ThankYou from "../Views/ThankYou/ThankYou"
import GlobalOffer from "../Views/GlobalOffer/GlobalOffer"
import OfferSearch from "../Views/OfferSearch/OfferSearch"
// import TqForCbForm from "../Views/Marketing/tqForCbForm"
import {
    rootPath,
    levelone,
    purchasesubscription,
    listing,
    leveltwo,
    productdescription,
    unregisteredseller,
    companyprofilenonPath,
    category,
    signup,
    signin,
    buyerSignin,
    sellerSignin,
    forgot,
    categoryPath,
    productselection,
    about,
    pricingPath,
    faqpath,
    contactpath,
    disclaimer,
    privacy,
    freetrialpath,
    levelFive,
    emailVerification,
    refund,
    thankyou,
    offer,
    offersearch,
} from './path'

const publicRoutes = [
    {
        path: rootPath,
        component: Home
    },
    /* {
        path:purchasesubscription,
        component:PurchaseSubscription
    }, */
    {
        path: pricingPath,
        component: PricingView
    },
    {
        path: about,
        component: Aboutview
    },
    {
        path: leveltwo,
        component: CategorylevelTwo
    },
    {
        path: `${categoryPath}/:title`,
        component: CategorylevelOne
    },
    {
        path: listing,
        component: Listing

    }, {
        path: productdescription,
        component: ProductDesMem
    }, {
        path: unregisteredseller,
        component: ProductDesNonMem
    }, {
        path: category,
        component: CategoryMain
    }, {
        path: signup,
        component: SignUp
    }, {
        path: signin,
        component: SignIn
    }, {
        path: buyerSignin,
        component: SignIn
    }, {
        path: sellerSignin,
        component: SignIn
    }, {
        path: forgot,
        component: ResetPassword
    }, {
        path: `${companyprofilenonPath}/:id`,
        component: CompanyProfileNon
    },
    {
        path: faqpath,
        component: Faq
    }, {
        path: contactpath,
        component: ContactDetail
    }, {
        path: privacy,
        component: PrivacyPolicy
    }, {
        path: disclaimer,
        component: Disclaimer
    }, {
        path: freetrialpath,
        component: FreeTrial
    },
    {
        path: levelFive,
        component: CategorylevelFive
    },
    {
        path: emailVerification,
        component: UserVerificationView
    },
    {
        path: refund,
        component: RefundPolicy
    },
    {
        path: thankyou,
        component: ThankYou
    },
    {
        path: offer,
        component: GlobalOffer

    },
    {
        path: offersearch,
        component: OfferSearch

    },
]
export default publicRoutes