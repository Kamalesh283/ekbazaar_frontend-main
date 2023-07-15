/* eslint-disable no-unused-expressions */
import request from '../request'
import searchrequest from '../searchRequest'
import { generateTendersQueryString } from './apiHelper'

/**
 * swgger_document Done
 */
export const searchApi = async (query) => {
    const { skip, limit, search, product, group, sellerId, productId, restrictl1 } = query
    let url = `elastic/search?`
    product ? url += `product=${product}&` : ""
    url += `skip=${skip}&`
    url += limit ? `limit=${limit}&` : ''
    url += `search=${search}&`
    url += `group=${group}&`
    url += `sellerId=${sellerId}&`
    url += `productId=${productId}&`
    if (restrictl1)
        url += `restrictl1=${restrictl1}&`
    return request({
        url,
        method: 'get'
    })

}

export const getAllSellersAPI = async (query) => {
    console.log("🚀 ~ file: search.js ~ line 23 ~ getAllSellersAPI ~ query", query)

    // const baseURL = 'elastic/seller/searchSeller?'
    const baseURL = '/searchelastic?'

    const url = generateTendersQueryString(baseURL, query)

    return searchrequest({
        url,
        method: 'get'
    })
    // return request({
    //     url,
    //     method: 'get'
    // })

}
