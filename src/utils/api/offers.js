import request from '../request'

/**
 * GET ALL OFFERS API
 * swgger_document Done
 */
export const getAllOffersApi = (data) => {
    const url = 'offers'
    return request({
        url,
        method: 'GET'
    })
}

/**
 * get seller offers
 * swgger_document Done
 */
export const getSellerOffersApi = (query) => {
const { skip, limit, search} = query
    let url = 'sellerOffers?'
    return request({
        url,
        params: query,
        method: 'get'
    })

}

/**
 * get buyer request
 * not in use
 */
export const getBuyerRequestApi = (data) => {

    const url = 'buyerRquest'
    return request({
        url,
        data,
        method: 'get'
    })

}

/**
 * Post buyer request
 * swgger_document Done
 */
 export const postBuyerRequestApi = (data) => {

    const url = 'buyerRquest'
    return request({
        url,
        data,
        method: 'post'
    })

}
/**
 * Post sellerf contact offers
 * swgger_document Done
 */
 export const postSelletOffersContactApi = (data) => {

    const url = 'sellerContactOffers'
    return request({
        url,
        data,
        method: 'post'
    })

}

/**
 * gET buyer request list
 * not in use
 */
 export const getBuyerAllRequestApi = (data) => {
    const { id } = data
    const url = `buyerAllRequest/${id}`;
    return request({
      url,
      method: "get",
      params:data
    });

}

/**
 * Delete Buyer request
 * swgger_document Done
 */
 export const deleteBuyerRequestApi = (id) => {

    const url = `deleteBuyerRequest/${id}`
    return request({
        url,
        method: 'post'
    })

}