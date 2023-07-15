import { parse } from "query-string"

export const generateTendersQueryString = (baseUrl, query) => {

  const {
    cityId,
    productId,
    parentId,
    skip,
    limit,
    secondaryId,
    primaryId,
    keyword,
    sellerProductId,
    serviceType,
    level5Id,
    selected,
    countryId
  } = query

  let url = baseUrl
  url += skip ? `skip=${skip}&` : ''
  url += limit ? `limit=${limit}&` : ''

  url += countryId ?
    Array.isArray(countryId) ?
      countryId.map((cntry) => 'countryId=' + cntry.value + '&') :
      `countryId=${countryId.value}&` :
    ''

  url += cityId ?
    Array.isArray(cityId) ?
      cityId.map((city) => 'city_id=' + city.value + '&') :
      `city_id=${cityId.value}&` :
    ''

  url += parentId && selected ? createQueryString({ parent_id: parentId }) :
    parentId ?
      Array.isArray(parentId) ?
        parentId.map((product) => 'parent_id=' + product.value + '&') :
        `parent_id=${parentId.value}&` :
      ''

  url += productId && selected ? createQueryString({ product_id: productId }) :
    productId ?
      Array.isArray(productId) ?
        productId.map((product) => 'product_id=' + product.value + '&') :
        `product_id=${productId.value}&` :
      ''
  url += level5Id && selected ? createQueryString({ level5_id: level5Id }) :
    level5Id ?
      Array.isArray(level5Id) ?
        level5Id.map((l5) => 'level5_id=' + level5Id.value + '&') :
        `level5_id=${level5Id.value}&` :
      ''

  url += secondaryId && selected ? createQueryString({ secondary_id: secondaryId }) :
    secondaryId ?
      Array.isArray(secondaryId) ?
        secondaryId.map((sec) => 'secondary_id=' + sec.value + '&') :
        `secondary_id=${secondaryId.value}&` :
      ''

  url += primaryId && selected ? createQueryString({ primary_id: primaryId }) :
    primaryId ?
      Array.isArray(primaryId) ?
        primaryId.map((sec) => 'primary_id=' + sec.value + '&') :
        `primary_id=${primaryId.value}&` :
      ''

  url += keyword ?
    `keyword=${keyword.value}&` :
    ""

  url += sellerProductId ?
    `sellerProductId=${sellerProductId.value}&` :
    ""

  url += serviceType ?
    Array.isArray(serviceType) ?
      serviceType.map((type) => 'serviceTypeId=' + type.value + '&') :
      `serviceTypeId=${serviceType.value}&` :
    ''

  url = url.replace(/[,]+/g, '').trim()

  return url

}

const createQueryString = (data) => {
  return Object.keys(data).map(key => {
    let val = data[key]
    if (val !== null && typeof val === 'object') val = createQueryString(val)
    return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}&`
  }).join('&')
}
