import * as publicIp from "public-ip";
import moment from "moment";
import { getSeachQueryStructure, convertObjToQSobj, stringyfyQS } from './helpers'
import { listing, levelFive, leveltwo } from '../Routes/path'
// import history from "../Routes/history";

export let myIP = null;
export const ipV4 = () => publicIp.publicIpv4();
export const getMyIP = async () => {
  try {
    return (myIP = myIP === null ? await ipV4() : myIP);
  } catch (error) {
    console.log(error);
  }
};

export const get_GTAG = () => process.env.NODE_ENV === "production" ? 'G-BVT52GXG3D' : 'G-4QBHC5L673'
// export const g_Tag_MEASUREMENT_ID = process.env.NODE_ENV === "production" ? 'G-BVT52GXG3D' : 'G-4QBHC5L673'

export const validateEmail = (str) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(str)
export const validateMobile = (str) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(str)
export const validateUrl = (str) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(str);
export const validateGst = (str) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/gm.test(str);
export const validatePAN = (str) => /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/gm.test(str);
export const validateAadhar = (str) => /[0-9]{12}$/gm.test(str);
///[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
export const resendOtpCount = 3

export const globalVaraibles = {
  IS_PROD: process.env.NODE_ENV === "production",
  IS_DEV: process.env.NODE_ENV === "development",
  _IS_LOCAL_: process.env.NODE_ENV === "localhost",
  domains: function () {
    if (this.IS_PROD) {
      return {
        tender: "https://tenders.ekbazaar.com",
        investment: "https://investment.ekbazaar.com",
        trade: "https://trade.ekbazaar.com/",
        rocketrChat: "wss://chatbot.ekbazaar.com/websocket"
      }
    } else {
      return {
        tender: "https://ekbazaar.tech-active.com/home",
        investment: "https://investment.tech-active.com",
        trade: "https://tradebazaar.tech-active.com/",
        rocketrChat: "wss://chatbot.active.agency/websocket"
      }
    }
  }
}

export const nextLevelCategoryList = (data, key) => {
  const objKey = key;
  let obj = {}

  obj[objKey] = {
    label: data.title || data.name,
    value: data.id || data._id
  }
  const strctObj = getSeachQueryStructure(obj)
  const qs = stringyfyQS(convertObjToQSobj(strctObj))
  // if (key === 'productId')
  // history.push({ pathname: levelFive, search: `?${qs}` });
  // else if (key === 'primaryId')
  // history.push({ pathname: leveltwo, search: `?${qs}` });
}

export const categorySearch = (value, key) => {

  const objKey = key;
  let obj = {}

  obj[objKey] = {
    label: value.name,
    value: value._id
  }
  const strctObj = getSeachQueryStructure(obj)
  const qs = stringyfyQS(convertObjToQSobj(strctObj))

  // history.push({
  //   pathname: listing,
  //   search: `?${qs}`
  // })

}

export const getBuildDate = (epoch) => {
  const buildDate = moment(epoch).format("DD-MM-YYY HH:MM");
  return buildDate;
};

export const siteLanguagesList = [
  { label: "English", value: "en" },
  { label: "हिंदी", value: "hi" },
  { label: "ગુજરાતી", value: "gu" },
  { label: "বাংলা", value: "bn" },
  { label: "ಕನ್ನಡ", value: "kn" },
  { label: "മലയാളം", value: "ml" },
  { label: "मराठी", value: "mr" },
  { label: "தமிழ்", value: "ta" },
  { label: "తెలుగు", value: "te" },
  // { label: "Odia(Oriya)", value: "or" },
  // { label: "Punjabi", value: "pa" },
  // { label: "Sindhi", value: "sd" },
  // { label: "Urdu", value: "ur" }
]

export const browseByCategories = [
  {
    _id: "5fddf6051a15802b9764520d",
    name: "Food",
    vendorId: "3"
  },
  {
    _id: "5fddf6051a15802b9764520e",
    name: "Machinery,Industrial Equipment & Plants",
    vendorId: "4"
  },
  {
    _id: "5fddf6051a15802b9764520f",
    name: "Industrial Consumables & Spares",
    vendorId: "5"
  },
  {
    _id: "5fddf6051a15802b97645214",
    name: "Textiles & Fabrics",
    vendorId: "21"
  },
  {
    _id: "5fddf6051a15802b9764521a",
    name: "Transportation & Warehousing",
    vendorId: "40"
  }
]

export const setCountryLocal = (data, type) => {
  if (type === 'set') {
    localStorage.setItem('countryFilter', JSON.stringify(data))
  }
  else
    localStorage.setItem('countryFilter', JSON.stringify({ label: "all india", value: "5e312f978acbee60ab54de08" }))
}
