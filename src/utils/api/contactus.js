import request from "../request";

/**
 * Submit contactus form
 * swgger_document Done
 */

export const postcontactUsApi = (data) => {
  const url = "/contact"
  return request({
    url,
    data,
    method: 'post'
  })
}