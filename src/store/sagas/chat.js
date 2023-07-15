import { put, takeLatest, call, select, fork, all, take, takeEvery, delay } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
// import io from 'socket.io-client';
import { actionTypes } from "../../utils/constants";
import { baseURL } from "../../utils/request"
import { globalVaraibles } from "../../utils/utils"
import _ from "lodash";
import {
    chatLoginError,
    chatLoginPending,
    chatLoginSuccess,

    getChatList,
    getChatListError,
    getChatListPending,
    getChatListSuccess,

    chatMarkAsRead,
    chatMarkAsReadError,
    chatMarkAsReadPending,
    chatMarkAsReadSuccess,

    setChatLanguageError,
    setChatLanguagePending,
    setChatLanguageSuccess,

    openChatRoomError,
    openChatRoomPending,
    openChatRoomSuccess,

    sendMessageError,
    sendMessagePending,
    sendMessageSuccess,

    getChatHistory,
    getChatHistoryError,
    getChatHistorySuccess,
    getChatHistoryPending,

    chatGetSellerDetailsError,
    chatGetSellerDetailsPending,
    chatGetSellerDetailsSuccess,

    chatOpen,
    chatSetWhoseHistory,
    chatRoomId,

    chatSubscribe,
    socketGetChatHistorySuccess,
    chatSetHistoryLimit,

    chatLogoutPending,
    chatLogoutSuccess,
    chatLogoutError,

    getAllChatTemapltesError,
    getAllChatTemapltesPending,
    getAllChatTemapltesSuccess

} from '../../store/actions/chat'

import {
    chatLoginApi,
    getChatListApi,
    getChatHistoryApi,
    sendMessageApi,
    postMarkAsReadApi,
    setChatLanguageApi,
    getSellerChatDetailsApi,
    chatLogoutApi,
    getAllChatTemplateApi
} from '../../utils/api/chat'
import {
    setAlert
} from '../actions/app'
const { chat } = actionTypes;
// const ws = new WebSocket('wss://chatbot.active.agency/websocket')

const domains = globalVaraibles.domains()



//Login to get the token /expiry
var login = {
    "msg": "method",
    "method": "login",
    "id": "1",
    "params": [
        {
            "user": { "username": localStorage.getItem("chatUsername") ? localStorage.getItem("chatUsername").toString() : '' },
            "password": "active123"
        }
    ]
}

//Subscribing to a particular room
let roomSub = {
    "msg": "sub",
    "id": "2", //unique-id 
    "name": "stream-room-messages",
    "params": [
        "2aDCcJzHwaXfPvobstACzKwnsLK68noQvB", //roomID
        false
    ]
}

// DIrect message for new user
// var directMessage = {
//     "msg": "method",
//     "method": "createDirectMessage",
//     "id": "42",
//     "params": ["8660759817"]
// }

let notifySub = {
    "msg": "sub",
    "id": 44,
    "name": "stream-notify-user",
    "params": [
        // "tACzKwnsLK68noQvB/notification",
        `${localStorage.getItem('chatUserId')}/notification`,
        false
    ]
}

// let roomSub = {
//     "msg": "sub",
//     "id": "2", //unique-id 
//     "name": "stream-room-messages",
//     "params": [
//         "2aDCcJzHwaXfPvobstACzKwnsLK68noQvB", //roomID
//         false
//     ]
// }

// export function* socketLogin() {
//     console.log(' wsssswwwss', ws)
//     ws.send(JSON.stringify(login))
// }

let ws;
function websocketInitChannel() {
    // ws = new WebSocket('wss://chatbot.active.agency/websocket')
    ws = new WebSocket(domains.rocketrChat)
    
    return eventChannel(emitter => {
        // init the connection here
        ws.onclose = (err) => {
            console.log(err, 'cccccccccccccccccccc')
        }
        ws.onerror = (error) => {
            console.log(error, 'eeeeeeeeeeeeeeeeee')

        }
        ws.onopen = () => {
            const loki = localStorage.getItem("chatUsername")
            ws.send(JSON.stringify({
                "msg": "connect",
                "version": "1",
                "support": ["1", "pre2", "pre1"]
            }))
            if (loki) {
                const id = localStorage.getItem('chatUserId')
                ws.send(JSON.stringify(login))

                notifySub = {
                    "msg": "sub",
                    "id": "4",
                    "name": "stream-notify-user",
                    "params": [
                        // "tACzKwnsLK68noQvB/notification",
                        `${localStorage.getItem('chatUserId')}/notification`,
                        false
                    ]
                }
                setTimeout(() => {
                    ws.send(JSON.stringify(notifySub))
                    // ws.send(JSON.stringify(roomSub));
                }, 1000)
            }
        }

        ws.onmessage = e => {
            let payload = JSON.parse(e.data)
            console.log(payload, ' socket ---------------------------')
            console.log(e.payload);
            switch (payload.msg) {
                case "ping":
                    ws.send(JSON.stringify({ msg: 'pong' }));
                    payload = null;
                    break;
                case "changed":
                    console.log('data changed', payload)
                    payload = payload.fields.args[0].payload
                    if (payload && payload.message && payload.message.msg) {
                        // let notify = new Notification(payload.sender.username, { "body": payload.message.msg });
                        // notify.close()
                    }
                    break;
                case "result":
                    console.log("case result websocket onmessage!");
                    if (payload.id == 1 && payload.result) { //Login success!
                        payload = null;
                        notifySub = {
                            "msg": "sub",
                            "id": "4",
                            "name": "stream-notify-user",
                            "params": [
                                `${localStorage.getItem('chatUserId')}/notification`,
                                false
                            ]
                        }
                        console.log("send subsribe ", notifySub);
                        ws.send(JSON.stringify(notifySub)) //send subscribe!
                    } else if (payload.id == 1 && payload.error) {
                        payload = null;
                    }
                    else { //Login Error->
                        console.log("Login-Failed-> ");
                    }

                    break;
                case "ready":
                    console.log("ready->")
                    payload = null;
                    break;
                case "updated":
                    console.log("updated->")
                    payload = null;
                    break;
                case "added":
                    console.log("added->")
                    payload = null;
                    break;
                default:
                    break;
            }
            // return true
            // dispatch an action with emitter here
            // return emitter({ type: 'CHAT_SUBSCRIBE', payload })
            return emitter({ result: payload })
            // return emitter(socketGetChatHistorySuccess(payload))
        }
        return () => {
            // console.log(' ---- Socket Closed ---')
            ws.close()
        }
        // unsubscribe function
        return () => {
            console.log("Default return")
            // do whatever to interrupt the socket communication here
        }
    })
}

// export function* subscribeNotification(data) {

//     login = {
//         "msg": "method",
//         "method": "login",
//         "id": "1",
//         "params": [
//             {
//                 "user": { "username": data.me.username },
//                 "password": "active123"
//             }
//         ]
//     }
//     ws.send(JSON.stringify(login))

//     notifySub = {
//         "msg": "sub",
//         "id": "4",
//         "name": "stream-notify-user",
//         "params": [
//             `${data.userId}/notification`,
//             false
//         ]
//     }
//     setTimeout(() => {
//         ws.send(JSON.stringify(notifySub))
//     }, 1000);

// }


export function* websocketSagas() {
    const channel = yield call(websocketInitChannel)
    while (true) {
        const { result } = yield take(channel);
        console.log("####-> ", result);
        if (result && result.id === "42") {
            const { id, result: datas } = { ...result }
            yield delay(1000)
            yield put(getChatHistory({ data: { roomId: datas.rid, offset: 0, limit: 25 } }));
            yield put(chatRoomId(datas.rid));
            // }
        }
        else if (result !== null) {
            let { rid, sender, message } = { ...result };
            console.log(rid, sender, message, ' kkkkkkkkkkkkkkkkkkkkkk');
            yield put(getChatList());
            if (localStorage.getItem('roomID') === rid) {
                yield delay(1000)
                yield put(getChatHistory({ data: { roomId: rid } }));
                yield put(chatMarkAsRead({ roomId: rid }))
            }

        }
        // ws.close()
        // yield put(socketGetChatHistorySuccess(data))
    }
}

function* chatLogoutSaga(action) {
    console.log("🚀 ~ file: chat.js ~ line 310 ~ function*chatLogoutSaga ~ action", action)
    try {
        yield put(chatLogoutPending(true));
        const response = yield call(chatLogoutApi, action.payload);
        if (response.success) {
            yield put(chatLogoutSuccess(response.data));
        }
    } catch (err) {
        yield put(chatLoginError(err));
    }
}

/**
 * Chat Login
 */
function* chatLoginSaga(action) {     
    try {
        yield put(chatLoginPending(true));
        const response = yield call(chatLoginApi, action.payload);
        if (response.success) {
            yield put(chatLoginSuccess(response.data));
            if (response.data && response.data.authToken) {

                localStorage.setItem('chatAuthToken', response.data.authToken)
                localStorage.setItem('chatUserId', response.data.userId)
                localStorage.setItem('chatUsername', response.data.me.username)
                yield fork(websocketSagas)
                setTimeout(() => {
                    ws.send(JSON.stringify({
                        "msg": "method",
                        "method": "login",
                        "id": "1",
                        "params": [
                            {
                                "user": { "username": response.data.me.username ? response.data.me.username.toString() : '' },
                                "password": "active123"
                            }
                        ]
                    }))
                }, 500)



                if ((response.data.me && response.data.me.language) || (response.data && response.data.language)) {
                    localStorage.setItem('chatLanguage', response.data.me.language || response.data.language || undefined)
                }
            }
        } else {
            yield put(chatLoginError(response));
        }
    } catch (err) {
        yield put(chatLoginError(err));
    }
}

/**
 * Set Chat Language
 */

function* setChatLanguageSaga(action) {
    try {
        yield put(setChatLanguagePending(true));
        const { fromWhere, lang } = action.payload
        const res = yield call(setChatLanguageApi, action.payload);
        if (res.success) {
            yield put(setChatLanguageSuccess(res.data));
            localStorage.setItem('chatLanguage', lang)
            !fromWhere && localStorage.setItem('chatType', 1)
            yield put(getChatList());
            // yield put(action.payload.nextFunc());
            // yield fork(websocketSagas);
        } else {
            yield put(setChatLanguageError(res));
        }
    } catch (err) {
        yield put(setChatLanguageError(err));
    }
}

/**
 * get chat list
 */
function* getChatListSaga(action) {
    try {
        yield put(getChatListPending(true));
        const res = yield call(getChatListApi, action.payload);
        if (res.success) {
            // if (res && res.data && res.data.status && res.data.status === 401) {
            //     yield put(setAlert('danger', ' Please login'))
            // } else {
            // localStorage.setItem("userId", res.data._id);
            yield put(getChatListSuccess(res.data && res.data.ims));
            // }
        } else {
            yield put(getChatListError(res));
        }
    } catch (err) {
        yield put(getChatListError(err));
    }
}

/**
 * Chat Mark As Read
 */
function* postMarkAsReadSaga(action) {
    try {
        yield put(chatMarkAsReadPending(true));
        const res = yield call(postMarkAsReadApi, action.payload);
        if (res.success) {
            // localStorage.setItem("userId", res.data._id);
            yield put(chatMarkAsReadSuccess(res.data && res.data.ims));
            yield put(getChatList());
        } else {
            yield put(chatMarkAsReadError(res));
        }
    } catch (err) {
        yield put(chatMarkAsReadError(err));
    }
}

/**
 * get chat history
 */
function* getChatHistorySaga(action) {
    try {
        const { data, changeLimit, type, scrollBottom } = action.payload
        console.log(action.payload, ' ppppppppppppp')
        yield put(getChatHistoryPending(true));
        const res = yield call(getChatHistoryApi, data);

        if (res.success) {
            if (res.data && res.data.messages && !_.isEmpty(res.data.messages)) {

                yield put(getChatHistorySuccess(res.data && { data: res.data, type }));
                // data && data.nextNext && data.nextNext()
                if (!_.isEmpty(res.data.messages) && changeLimit) {
                    changeLimit()
                } else {
                    if (data.limit) {

                        const lim = {
                            skip: data.limit,
                            limit: 25
                        }
                        yield put(chatSetHistoryLimit(lim))
                    }
                }
                scrollBottom && scrollBottom()
            }
        } else {
            yield put(getChatHistoryError(res));
        }
    } catch (err) {
        yield put(getChatHistoryError(err));
    }
}

/**
 * post chat chat message
 */
function* sendMessageSaga(action) {
    try {
        const { roomId, limit, offset, updateLimit, scrollBottom } = action.payload
        yield put(sendMessagePending(true));
        const res = yield call(sendMessageApi, action.payload);
        if (res.success) {
            yield put(sendMessageSuccess(res.data));
            // updateLimit && updateLimit({ offset: offset, limit: limit })
            yield delay(500)
            yield put(getChatHistory({ data: { roomId, offset: 0, limit: offset + 1 }, type: 'message', scrollBottom }));
            // setTimeout(function () {
            //     scrollBottom()
            //     // if(scrollBottom) {

            //     // }
            // }, 100)
        } else {
            yield put(sendMessageError(res));
        }
    } catch (err) {
        yield put(sendMessageError(err));
    }
}

/**
 * get Sellet char Details
 */
function* getSellerChatDetailsSaga(action) {
    try {
        // const { data, changeLimit } = action.payload
        yield put(chatGetSellerDetailsPending(true));
        const res = yield call(getSellerChatDetailsApi, action.payload);
        if (res.success) {
            yield put(chatGetSellerDetailsSuccess(res.data && res.data));
            const uname = res.data.details.user.username
            const status = res.data.details.user.status
            const name = res.data.details.user.name
            login = {
                "msg": "method",
                "method": "login",
                "id": "1",
                "params": [
                    {
                        "user": { "username": localStorage.getItem("chatUsername") ? localStorage.getItem("chatUsername").toString() : '' },
                        "password": "active123"
                    }
                ]
            }
            console.log("Inside LoginAgain", login);
            ws.send(JSON.stringify(login));

            yield delay(1000)
            ws.send(JSON.stringify({
                "msg": "method",
                "method": "createDirectMessage",
                "id": "42",
                "params": [uname.toString()]
            }))
            yield put(chatOpen(true))
            yield put(chatSetWhoseHistory({ ...res.data.details.user }))
        } else {
            yield put(chatGetSellerDetailsError(res));
        }
    } catch (err) {
        yield put(chatGetSellerDetailsError(err));
    }
}

/* Get All Chat templates */


function* getAllChatTemplateSaga(action) {
    try {
        const { payload } = action
        yield put(getAllChatTemapltesPending(true));
        const response = yield call(getAllChatTemplateApi, payload);
        if (response.success) {
            yield put(getAllChatTemapltesSuccess(response.data));
        }
    } catch (err) {
        yield put(getAllChatTemapltesError(err));
    }
}

export function* chatLoginWatcher() {
    yield takeLatest(chat.CHAT_LOGIN, chatLoginSaga);
}
export function* chatLogoutWatcher() {
    yield takeLatest(chat.CHAT_LOGOUT, chatLogoutSaga);
}
export function* setChatLanguageWatcher() {
    yield takeLatest(chat.CHAT_LANGUAGE_SET, setChatLanguageSaga);
}

export function* getChatListWatcher() {
    yield takeLatest(chat.CHAT_GET_LIST, getChatListSaga);
}
export function* getChatHistoryWatcher() {
    yield takeLatest(chat.CHAT_GET_HISTORY, getChatHistorySaga);
}
export function* sendMessageWatcher() {
    yield takeLatest(chat.CHAT_SEND_MESSAGE, sendMessageSaga);
}

export function* postMarkAsReadWatcher() {
    yield takeLatest(chat.CHAT_MARK_AS_READ_MESSAGE, postMarkAsReadSaga);
}
export function* getSellerChatDetailsWatcher() {
    yield takeEvery(chat.CHAT_GET_SELLER_DETAILS, getSellerChatDetailsSaga);
}
export function* getAllChatTemplateWatcher() {
    yield takeEvery(chat.GET_ALL_CHAT_TEMPLATES, getAllChatTemplateSaga);
}

// export function* websocketWatcher() {
//     console.log("websocketWatcher Called")
//     yield takeEvery(chat.CHAT_SOCKET_LIST, websocketSagas);
// }