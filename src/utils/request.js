import axios from "axios";
import { getAuthToken } from "./auth";
import store from "../store/index";
import { clearAuthToken } from "../store/actions/app";
// import { getUserLogoutSuccess } from '../store/actions/users'
// import history from "../Routes/history";
// import { signin } from '../Route/path'
import { globalVaraibles } from "./utils";
const { IS_DEV, IS_PROD, _IS_LOCAL_ } = globalVaraibles;

export const baseURL = IS_PROD ? "https://tradeapi.ekbazaar.com/api/" :
  IS_DEV ? 'https://tradebazaarapi.tech-active.com/api/' :
    "http://localhost:8070/api/";

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
    return response.data;
  },
  (err) => {
    if (err && err.response && err.response.status === 401) {
      // store.dispatch(clearAuthToken())
      //   store.dispatch(getUserLogoutSuccess())
      // history.push(signin)
    }

    return Promise.reject;
  }
);

export default request;
