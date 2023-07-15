import request from "../request";

/**
 * Submit removeListing form
 * swgger_document Done
 */

export const postremoveListingApi = (data) => {
  const url = "/removelisting"
  return request({
    url,
    data,
    method: 'post'
  })
}