import queryString from 'query-string'


export const capitalizeFirstForAll = (value) => {

  let string = value;
  string = string.toLowerCase().split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  return string

}

/*

  Query String

*/

export const parseQS = (string) => {

  return queryString.parse(string)

}

export const getSellerDataStruct = (obj) =>
  obj && obj._index
    ? {
      _id: obj._id,
      ...obj._source,
      ...obj.highlight
    }
    : obj

export const getSuggestionDataStruct = (obj) =>
  obj && obj._index
    ? {
      value: obj._id,
      label: capitalizeFirstForAll(obj._source.name),
      ...obj._source,
      ...obj.highlight
    }
    : obj

/*

  Case converter

*/

export const snakeToCamel = (string) => {

  return string.replace(/(_\w)/g, function (m) {

    return m[1].toUpperCase()

  })

}

export const getSeachQueryStructure = (state) => {
  const query = {

  }

  if (state.from) {
    query.from = state.from
  }

  if (state.keyword) {

    query.keyword = `${state.keyword.value},${state.keyword.label}`

  }
  if (state.selected) query.selected = state.selected
  if (state.c) {
    query.c = state.c
  }
  if (state.st) {
    query.st = state.st
  }
  if (state.serviceType) {

    if (Array.isArray(state.serviceType)) {

      query.serviceType = state.serviceType.map((type) => `${type.value},${type.label}`)

    } else {

      query.serviceType = `${state.serviceType.value},${state.serviceType.label}`

    }

  }
  if (state.search) {
    query.search = state.search
  }
  if (state.tab) {
    query.tab = state.tab
  }
  if (state.countryId) {
    if (Array.isArray(state.country)) {

      query.countryId = state.country.map((cntry) => `${cntry.value},${cntry.label}`)

    } else {

      query.countryId = `${state.countryId.value},${state.countryId.label}`

    }
  }
  if (state.cityId) {

    if (Array.isArray(state.cityId)) {

      query.cityId = state.cityId.map((city) => `${city.value},${city.label}`)

    } else {

      query.cityId = `${state.cityId.value},${state.cityId.label}`

    }

  }

  if (state.sellerProductId) {
    query.sellerProductId = `${state.sellerProductId.value},${state.sellerProductId.label}`
  }

  if (state.sellerId) {
    query.sellerId = `${state.sellerId.value},${state.sellerId.label}`
  }

  if (state.productId) {

    if (Array.isArray(state.productId)) {

      query.productId = state.productId.map((product) => `${product.value},${product.label}`)

    } else {

      query.productId = `${state.productId.value},${state.productId.label}`

    }

  }

  if (state.secondaryId) {

    if (Array.isArray(state.secondaryId)) {

      query.secondaryId = state.secondaryId.map((sec) => `${sec.value},${sec.label}`)

    } else {

      query.secondaryId = `${state.secondaryId.value},${state.secondaryId.label}`

    }


  }
  if (state.primaryId) {

    if (Array.isArray(state.primaryId)) {

      query.primaryId = state.primaryId.map((sec) => `${sec.value},${sec.label}`)

    } else {

      query.primaryId = `${state.primaryId.value},${state.primaryId.label}`

    }

  }

  if (state.level5Id) {

    if (Array.isArray(state.level5Id)) {

      query.level5Id = state.level5Id.map((sec) => `${sec.value},${sec.label}`)

    } else {

      query.level5Id = `${state.level5Id.value},${state.level5Id.label}`

    }

  }

  if (state.parentId) {

    if (Array.isArray(state.parentId)) {

      query.parentId = state.parentId.map((sec) => `${sec.value},${sec.label}`)

    } else {

      query.parentId = `${state.parentId.value},${state.parentId.label}`

    }

  }

  if (state.level1) {
    query.level1 = `${state.level1.value},${state.level1.label}`
  }

  if (state.level2) {
    query.level2 = `${state.level2.value},${state.level2.label}`
  }

  if (!state.search) {
    query.skip = state.skip ? state.skip : 0
    query.limit = state.limit ? state.limit : 10
  }

  return query
}

export const convertObjToQSobj = (obj) => {

  // converts Object to QSObjec, Observe and understand

  const newObj = {

  }
  for (const key in obj) {

    const element = obj[key]
    const newKey = camelToSnake(key)
    newObj[newKey] = element

  }
  return newObj
}

const camelToSnake = (string) => {

  return string
    .replace(/[\w]([A-Z])/g, function (m) {

      return m[0] + '_' + m[1]

    })
    .toLowerCase()

}

export const stringyfyQS = (obj) => {

  return queryString.stringify(obj)

}

const splitValId = (string) => {

  return string.split(',')

}

const convertLablValObj = (string) => {
  // Converts Simple string to object as label and value
  if (string) {

    const array = splitValId(string)
    return {
      value: array[0],
      label: array[1] || array[0],
      id: array[2] || array[0] // added for handling keyword save search
    }

  }
  return {
    value: string,
    label: string,
    id: string // added for handling keyword save search
  }

}

export const convertQSobjToObj = (obj) => {

  // converts QSObjec to object, Observe and understand

  const newObj = {

  }
  for (const key in obj) {

    const element = obj[key]
    const newKey = snakeToCamel(key)
    newObj[newKey] = element
    if (newObj[newKey]) {
      if (newKey === "from" || newKey === "search" || newKey === "tab" || newKey === "c" || newKey === "st" || newKey === "selected" /* || newKey === "country" */ /* || newKey === "level1" || newKey === "level2" */) {
        newObj[newKey] = obj[key]
      } else if (Array.isArray(newObj[newKey])) {

        newObj[newKey] = newObj[newKey].map(convertLablValObj)

      } else if (newKey === 'countryId' || newKey === 'productId' || newKey === 'cityId' || newKey === 'secondaryId' || newKey === 'primaryId' || newKey === "keyword" || newKey === "sellerProductId" || newKey === "serviceType" || newKey === "level5Id" || newKey === "parentId" || newKey === "level1" || newKey === "level2") {

        newObj[newKey] = convertLablValObj(element)

      }

    }

  }
  return newObj

}
