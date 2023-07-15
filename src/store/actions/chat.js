import { actionTypes } from '../../utils/constants'

const { chat } = actionTypes

/**
 * 
 * Not an API Action
 */
export const chatResetList = () => {
    return {
        type: chat.CHAT_RESET_LIST,
        payload: true
    }
}

export const chatLogin = (data) => {
    return {
        type: chat.CHAT_LOGIN,
        payload: data
    }
}
export const chatLoginPending = (data) => {
    return {
        type: chat.CHAT_LOGIN_PENDING,
        payload: data
    }
}

export const chatLoginSuccess = (data) => {
    return {
        type: chat.CHAT_LOGIN_SUCCESS,
        payload: data
    }
}

export const chatLoginError = (data) => {
    return {
        type: chat.CHAT_LOGIN_ERROR,
        payload: data
    }
}

/**
 * 
 * Not an API Action
 */
export const chatOpen = (data) => {
    return {
        type: chat.CHAT_OPEN,
        payload: data
    }
}

export const chatSetHistoryLimit = (data) => {
    return {
        type: chat.CHAT_SET_HISTORY_LIMIT,
        payload: data
    }
}
export const chatClose = (data) => {
    return {
        type: chat.CHAT_CLOSE,
        payload: false
    }
}
export const chatReset = () => {
    return {
        type: chat.CHAT_RESET,
        payload: true
    }
}

export const chatSetWhoseHistory = (data) => {
    return {
        type: chat.CHAT_WHOSE_HISTORY,
        payload: data
    }
}

/**
 * sET cHAT lANGUAGE
 */
export const setChatLanguage = (data) => {
    return {
        type: chat.CHAT_LANGUAGE_SET,
        payload: data
    }
}

export const setChatLanguagePending = (data) => {
    return {
        type: chat.CHAT_LANGUAGE_SET_PENDING,
        payload: data
    }
}

export const setChatLanguageSuccess = (data) => {
    return {
        type: chat.CHAT_LANGUAGE_SET_SUCCESS,
        payload: data
    }
}

export const setChatLanguageError = (data) => {
    return {
        type: chat.CHAT_LANGUAGE_SET_ERROR,
        payload: data
    }
}
/**
 * Get Chat List
 */
export const getChatList = (data) => {
    return {
        type: chat.CHAT_GET_LIST,
        payload: data
    }
}

export const getChatListPending = (data) => {
    return {
        type: chat.CHAT_GET_LIST_PENDING,
        payload: data
    }
}

export const getChatListSuccess = (data) => {
    return {
        type: chat.CHAT_GET_LIST_SUCCESS,
        payload: data
    }
}

export const getChatListError = (data) => {
    return {
        type: chat.CHAT_GET_LIST_ERROR,
        payload: data
    }
}

/**
 * Mark As Read
 */
export const chatMarkAsRead = (data) => {
    return {
        type: chat.CHAT_MARK_AS_READ_MESSAGE,
        payload: data
    }
}

export const chatMarkAsReadPending = (data) => {
    return {
        type: chat.CHAT_MARK_AS_READ_MESSAGE_PENDING,
        payload: data
    }
}

export const chatMarkAsReadSuccess = (data) => {
    return {
        type: chat.CHAT_MARK_AS_READ_MESSAGE_SUCCESS,
        payload: data
    }
}

export const chatMarkAsReadError = (data) => {
    return {
        type: chat.CHAT_MARK_AS_READ_MESSAGE_ERROR,
        payload: data
    }
}


/**
 * Open Chat room
 */
export const openChatRoom = (data) => {
    return {
        type: chat.CHAT_ROOM_OPEN,
        payload: data
    }
}

export const openChatRoomPending = (data) => {
    return {
        type: chat.CHAT_ROOM_OPEN_PENDING,
        payload: data
    }
}

export const openChatRoomSuccess = (data) => {
    return {
        type: chat.CHAT_ROOM_OPEN_SUCCESS,
        payload: data
    }
}

export const openChatRoomError = (data) => {
    return {
        type: chat.CHAT_ROOM_OPEN_ERROR,
        payload: data
    }
}

/**
 * Get Chat hostory
 */
export const chatHistoryReset = () => {
    return {
        type: chat.CHAT_HISTORY_RESET,
        payload: false
    }
}
export const getChatHistory = (data) => {
    return {
        type: chat.CHAT_GET_HISTORY,
        payload: data
    }
}

export const getChatHistoryPending = (data) => {
    return {
        type: chat.CHAT_GET_HISTORY_PENDING,
        payload: data
    }
}

export const getChatHistorySuccess = (data) => {
    return {
        type: chat.CHAT_GET_HISTORY_SUCCESS,
        payload: data
    }
}

export const getChatHistoryError = (data) => {
    return {
        type: chat.CHAT_GET_HISTORY_ERROR,
        payload: data
    }
}

/**
 * Send Message
 */
export const sendMessage = (data) => {
    return {
        type: chat.CHAT_SEND_MESSAGE,
        payload: data
    }
}

export const sendMessagePending = (data) => {
    return {
        type: chat.CHAT_SEND_MESSAGE_PENDING,
        payload: data
    }
}

export const sendMessageSuccess = (data) => {
    return {
        type: chat.CHAT_SEND_MESSAGE_SUCCESS,
        payload: data
    }
}

export const sendMessageError = (data) => {
    return {
        type: chat.CHAT_SEND_MESSAGE_ERROR,
        payload: data
    }
}

/**
 * Send Message
 */
export const chatGetSellerDetails = (data) => {
    return {
        type: chat.CHAT_GET_SELLER_DETAILS,
        payload: data
    }
}

export const chatGetSellerDetailsPending = (data) => {
    return {
        type: chat.CHAT_GET_SELLER_DETAILS_PENDING,
        payload: data
    }
}

export const chatGetSellerDetailsSuccess = (data) => {
    return {
        type: chat.CHAT_GET_SELLER_DETAILS_SUCCESS,
        payload: data
    }
}

export const chatGetSellerDetailsError = (data) => {
    return {
        type: chat.CHAT_GET_SELLER_DETAILS_ERROR,
        payload: data
    }
}

/**
 * Get Chat hostory
 */
export const chatRoomId = (data) => {
    localStorage.setItem('roomID', data)
    return {
        type: chat.CHAT_ROOM_ID,
        payload: data
    }
}

/**
 * Get Chat hostory
 */
export const chatStep = (data) => {
    return {
        type: chat.CHAT_STEP,
        payload: data
    }
}

export const chatConnect = (data) => {
    return {
        type: chat.CHAT_CONNECT,
        payload: data
    }
}

// export const chatSubscribe = (data) => {
//return {
//         type: chat.CHAT_SOCKET_LIST,
//         payload: data
//     }
// }

export const socketGetChatHistorySuccess = (data) => {
    return {
        type: chat.CHAT_SOCKET_LIST,
        payload: data
    }
}

export const chatLogout = (data) => {
    return {
        type: chat.CHAT_LOGOUT,
        payload: data
    }
}
export const chatLogoutPending = (data) => {
    return {
        type: chat.CHAT_LOGOUT_PENDING,
        payload: data
    }
}

export const chatLogoutSuccess = (data) => {
    return {
        type: chat.CHAT_LOGOUT_SUCCESS,
        payload: data
    }
}

export const chatLogoutError = (data) => {
    return {
        type: chat.CHAT_LOGOUT_ERROR,
        payload: data
    }
}

/* 
    Set Chat Category
*/
export const setChatCategory = (data) => {
    return {
        type: chat.CHAT_CATEGORY,
        payload: data
    }
}

export const resetChatCategory = () => {
    return {
        type: chat.CHAT_CATEGORY_RESET,
        // payload: data
    }
}

/* GET CHAT TEMPLATES */
export const getAllChatTemapltes = (data) => {
    return {
        type: chat.GET_ALL_CHAT_TEMPLATES,
        payload: data
    }
}
export const getAllChatTemapltesPending = (data) => {
    return {
        type: chat.GET_ALL_CHAT_TEMPLATES_PENDING,
        payload: data
    }
}

export const getAllChatTemapltesSuccess = (data) => {
    return {
        type: chat.GET_ALL_CHAT_TEMPLATES_SUCCESS,
        payload: data
    }
}

export const getAllChatTemapltesError = (data) => {
    return {
        type: chat.GET_ALL_CHAT_TEMPLATES_ERROR,
        payload: data
    }
}

/* Chat category height */
export const chatCategoryHeight = (data) => {
    return {
        type: chat.CHAT_CATEGORY_HEIGHT,
        payload: data
    }
}


