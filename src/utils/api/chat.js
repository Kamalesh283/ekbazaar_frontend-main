import request from '../request'

export const chatLoginApi = (data) => {
    const url = "chat/login"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const getChatListApi = (data) => {
    const url = "chat/getList"
    return request({
        url,
        params: data,
        method: 'get'
    })
}

/**
 * swgger_document Done
 */
export const getChatHistoryApi = (data) => {
    const url = "chat/getHistory"
    return request({
        url,
        params: data,
        method: 'get'
    })
}

/**
 * swgger_document Done
 */
export const sendMessageApi = (data) => {
    const url = "chat/sendMessage"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const postMarkAsReadApi = (data) => {
    const url = "chat/markAsRead"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const setChatLanguageApi = (data) => {
    const url = "chat/setLanguage"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const getSellerChatDetailsApi = (data) => {
    const url = "chat/checkSellerChat"
    return request({
        url,
        params: data,
        method: 'post'
    })
}

/**
 * not in use
 */
export const chatLogoutApi = (data) => {
    const url = "chat/logout"
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const contactSupportApi = (data) => {
    const url = 'chat/support'
    return request({
        url,
        data,
        method: 'post'
    })
}

/**
 * swgger_document Done
 */
export const getAllChatTemplateApi = (data) => {
    const url = "chatAllTemplates"
    return request({
        url,
        params: data,
        method: 'get'
    })
}
