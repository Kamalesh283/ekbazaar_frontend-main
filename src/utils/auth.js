import Cookies from 'js-cookie'

const TokenKey = 'Access-Token'
const hasPermission = 'has-permission'
// Let sampleToken = "asdasasdasdasd";

/*

  LOGIN AUTH

*/
export function getAuthToken() {

  const token = Cookies.get("Access-Token")
  return token

}

export function setAuthToken(token /*  = sampleToken */) {
  return Cookies.set('Access-Token', token.token, {
    expires: token.expireTime
  })

}

export function removeAuthToken() {

  return Cookies.remove("Access-Token")

}

/*

  SITES PASSWORD

*/

export function getPermission() {

  return Cookies.get("has-permission")

}

export function setPermission(token) {

  return Cookies.set("has-permission", token.token, {
    expires: token.expireTime
  })

}

export function removePermission() {

  return Cookies.remove("has-permission")

}
