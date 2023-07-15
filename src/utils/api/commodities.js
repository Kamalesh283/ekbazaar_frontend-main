import request from '../request'

/**
 * get commodities
 * Swagger Document Completed
 */
export const getCommoditiesApi = (data) => {

  const url = 'commodity'
  return request({
    url,
    data,
    method: 'get'
  })

}
/**
 * get news
 * Swagger Document Completed
 */
export const getNewsApi = (data) => {

  const url = 'news'
  return request({
    url,
    data,
    method: 'get'
  })

}