import axios from "axios";
import { getAuthToken } from "./auth";
import store from "../store/index";
// import history from "../Routes/history";
import { globalVaraibles } from "./utils";
const { IS_DEV, IS_PROD, _IS_LOCAL_ } = globalVaraibles;

export const baseURL = IS_PROD ? 'https://searchtrade.ekbazaar.com/api' :
  IS_DEV ? 'https://searchdb.tech-active.com/api' :
    'http://localhost:3001/api/'

const request = axios.create({
  withCredentials: true,
  baseURL,
});

request.interceptors.request.use(async (config) => {
  const token = getAuthToken();
  config.headers.authorization = "ekbazaar|".concat(token);
  return config;
}, Promise.reject);

request.interceptors.response.use(
  (response) => {
    console.log("🚀 ~ file: request.js ~ line 28 ~ response", response);
    return response.data;
  },
  (err) => {
    console.log("🚀 ~ file: request.js ~ line 33 ~ err", err);
    if (err && err.response && err.response.status === 401) {
      console.error(err)
    }

    return Promise.reject;
  }
);

export default request;
