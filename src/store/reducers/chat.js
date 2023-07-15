import {
    actionTypes
} from "../../utils/constants";
import _ from 'lodash'

const {
    chat
} = actionTypes;

const generalQuestion = [{
    categoryNames: { en: "General Questions", mr: "सामान्य प्रश्न", gu: "સામાન્ય પ્રશ્નો", bn: "General bn", kn: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು", te: "సాధారణ ప్రశ్నలు", ta: "பொதுவான கேள்விகள்", ml: "പൊതു ചോദ്യങ്ങൾ", hi: "सामान्य सवाल" },

    createdAt: "2021-11-13T10:00:51.206Z",
    l1: "5fddf6051a15802b9764520d",
    l2: "5fdf688808dba12132ecafe4",
    l3: "5fdf6cc7be4f6810f10102c4",
    name: "General",
    questions: {
        en: ['What is the price of this product?',
            'What is the minumum order quantity?',
            'Where can you delivery?',
            'What is the delivery time?'],
        mr: ['या उत्पादनाची किंमत काय आहे?',
            'किमान ऑर्डर प्रमाण किती आहे?',
            'आपण कुठे डिलिव्हरी करू शकता?',
            'वितरण वेळ काय आहे?'
        ],
        gu: ['આ પ્રોડક્ટની કિંમત શું છે?',
            'ન્યૂનતમ ઓર્ડર જથ્થો શું છે?',
            'તમે ક્યાં ડિલિવરી કરી શકો છો?',
            'વિતરણ સમય શું છે?'
        ],
        bn: ['এই পণ্যের দাম কত?',
            'ন্যূনতম অর্ডার পরিমাণ কি?',
            'আপনি কোথায় বিতরণ করতে পারেন?',
            'প্রসবের সময় কি?'
        ],
        kn: ['ಈ ಉತ್ಪನ್ನದ ಬೆಲೆ ಎಷ್ಟು?',
            'ಕನಿಷ್ಠ ಆದೇಶದ ಪ್ರಮಾಣ ಎಷ್ಟು?',
            'ನೀವು ಎಲ್ಲಿ ತಲುಪಿಸಬಹುದು?',
            'ವಿತರಣಾ ಸಮಯ ಎಷ್ಟು?'
        ],
        te: ['ఈ ఉత్పత్తి ధర ఎంత?',
            'కనిష్ట ఆర్డర్ పరిమాణం ఎంత?',
            'మీరు ఎక్కడ డెలివరీ చేయవచ్చు?',
            'డెలివరీ సమయం ఎంత?',
        ],
        ta: ['இந்த பொருளின் விலை என்ன?',
            'குறைந்தபட்ச ஆர்டர் அளவு என்ன?',
            'எங்கு டெலிவரி செய்யலாம்?',
            'டெலிவரி நேரம் என்ன?'
        ],
        ml: ['ഈ ഉൽപ്പന്നത്തിന്റെ വില എന്താണ്?',
            'മിനിമം ഓർഡർ അളവ് എന്താണ്?',
            'എവിടെ ഡെലിവറി ചെയ്യാം?',
            'ഡെലിവറി സമയം എത്രയാണ്?'
        ],
        hi: ['इस उत्पाद की कीमत क्या है?',
            'न्यूनतम आदेश मात्रा क्या है?',
            'आप डिलीवरी कहां कर सकते हैं?',
            'डिलीवरी का समय क्या है?'
        ]
    },
    updatedAt: "2021-11-13T12:34:03.384Z",
    _id: "General",
    english: ['What is the price of this product?',
        'What is the minumum order quantity?',
        'Where can you delivery?',
        'What is the delivery time?']
}

]
const initialState = {
    chatRoomId: '',
    chatStep: '',
    chatOpen: false,
    chatLogin: {
        chatLogin: {},
        pending: false,
        success: false,
        error: false,
    },
    chatHistoryLimit: {
        skip: 0,
        limit: 25
    },
    whoseHistory: {},
    chatMessagCount: 0,
    chatList: {
        chatList: [],
        pending: false,
        success: false,
        error: false,
        messageCount: 0
    },
    chatLanguage: {
        chatList: '',
        pending: false,
        success: false,
        error: false,
    },
    chatMarkAsRead: {
        chatMarkAsRead: [],
        pending: false,
        success: false,
        error: false,
    },
    chatHistory: {
        chatHistory: [],
        pending: false,
        success: false,
        error: false,
    },
    chatSendMessage: {
        pending: false,
        success: false,
        error: false,
    },
    chatSellerDetails: {
        chatSellerDetails: {},
        pending: false,
        success: false,
        error: false,
    },
    chatLogout: {
        chatLogout: {},
        pending: false,
        success: false,
        error: false,
    },
    chatCategoryData: {
        catName: '',
        language: '',
        questions: generalQuestion && generalQuestion.length && generalQuestion[0].questions[localStorage.getItem('chatLanguage') || 'en'] || [],
        selected: 'General',
        english: generalQuestion && generalQuestion.length && generalQuestion[0].english
    },
    chatTemplate: {
        template: [...generalQuestion],
        pending: false,
        success: false,
        error: false,
    },
    chatHeight: true
};

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {

        case chat.CHAT_RESET_LIST: {
            return {
                ...state,
                chatList: {
                    chatList: [],
                    pending: false,
                    success: false,
                    error: false
                }
            }
        }

        case chat.CHAT_SET_HISTORY_LIMIT: {
            return {
                ...state,
                chatHistoryLimit: {
                    skip: payload.skip || payload.skip.skip || 0,
                    limit: payload.limit || payload.skip.limit || 5
                }
            }
        }
        case chat.CHAT_OPEN: {
            return {
                ...state,
                chatOpen: payload
            }
        }
        case chat.CHAT_ROOM_ID: {
            return {
                ...state,
                chatRoomId: payload
            }
        }
        case chat.CHAT_STEP: {
            return {
                ...state,
                chatStep: payload
            }
        }
        case chat.CHAT_RESET: {
            return {
                ...state,
                chatSellerDetails: {},
                pending: false,
                success: false,
                error: false,
            }
        }

        case chat.CHAT_WHOSE_HISTORY: {
            return {
                ...state,
                whoseHistory: payload
            }
        }
        case chat.CHAT_HISTORY_RESET: {
            return {
                ...state,
                chatHistory: {
                    chatHistory: [],
                    pending: false,
                    success: false,
                    error: false,
                }
            }
        }

        /* 
            Chat Login
        */
        case chat.CHAT_LOGIN_PENDING: {
            return {
                ...state,
                chatLogin: {
                    // ...state.chatLogin,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_LOGIN_SUCCESS: {
            return {
                ...state,
                chatLogin: {
                    chatLogin: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case chat.CHAT_LOGIN_ERROR: {
            return {
                ...state,
                chatLogin: {
                    ...state.chatLogin,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        /* 
            Set chat Language
        */
        case chat.CHAT_LANGUAGE_SET_PENDING: {
            return {
                ...state,
                chatLanguage: {
                    ...state.chatLanguage,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_LANGUAGE_SET_SUCCESS: {
            const selectedCatId = state.chatCategoryData && state.chatCategoryData.selected || ''

            const data = state.chatTemplate && state.chatTemplate.template && state.chatTemplate.template.length && state.chatTemplate.template.filter((val) => val._id == selectedCatId.toString())

            const lang = payload.language || 'en'

            return {
                ...state,
                chatLanguage: {
                    chatLanguage: payload,
                    pending: false,
                    success: true,
                    error: false
                },
                chatCategoryData: {
                    ...state.chatCategoryData,
                    questions: data && data.length && data[0].questions && data[0].questions[lang] || generalQuestion && generalQuestion.length && generalQuestion[0].questions[payload && payload.language || 'en'] || [],


                }
            }
        }
        case chat.CHAT_LANGUAGE_SET_ERROR: {
            return {
                ...state,
                chatLanguage: {
                    ...state.chatLanguage,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }
        /* 
            Get chat list 
        */
        case chat.CHAT_GET_LIST_PENDING: {
            return {
                ...state,
                chatList: {
                    ...state.chatList,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_GET_LIST_SUCCESS: {
            const _payload = payload && payload.length && payload.filter(v => v.msgs !== 0) || []
            const data = _payload && _payload.length ? localStorage.getItem('userType') === "seller" ? _payload.filter(v => v.usernames[0] !== localStorage.getItem('chatUsername')) : _payload.filter(v => v.usernames[0] === localStorage.getItem('chatUsername')) : []
            let count = data && data.length ? _.sumBy(data, 'subscription.unread') : 0
            // const messagecount = payload && payload.length ? payload.map((v) => {
            //     count += v.subscription.unread
            // }) : 0
            return {
                ...state,
                chatList: {
                    chatList: data, //payload,
                    pending: false,
                    success: true,
                    error: false,
                    messageCount: count || 0
                }
            }
        }
        case chat.CHAT_GET_LIST_ERROR: {
            return {
                ...state,
                chatList: {
                    ...state.chatList,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        /* 
            Char Mark As Read
        */
        case chat.CHAT_MARK_AS_READ_MESSAGE_PENDING: {
            return {
                ...state,
                chatMarkAsRead: {
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_MARK_AS_READ_MESSAGE_SUCCESS: {
            return {
                ...state,
                chatMarkAsRead: {
                    // chatMarkAsRead: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case chat.CHAT_MARK_AS_READ_MESSAGE_ERROR: {
            return {
                ...state,
                chatMarkAsRead: {
                    // chatMarkAsRead: [],
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        /* 
            Get chat history 
        */
        case chat.CHAT_GET_HISTORY_PENDING: {
            return {
                ...state,
                chatHistry: {
                    ...state.chatHistry,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_GET_HISTORY_SUCCESS: {
            console.log(payload, ' 7777777777777777777777777')
            const { data, type } = payload
            const content = type === "scroll" ? [data.messages, ...state.chatHistory.chatHistory] : [data.messages]
            let contentArray = content && content.length && content.reduce((acc, obj) => {
                Object.keys(obj).forEach(item => {
                    if (acc[item]) {
                        acc[item] = acc[item].concat(obj[item])
                    } else {
                        acc[item] = obj[item]
                    }
                })
                return acc
            }, {}) || null;
            contentArray = contentArray && Object.keys(contentArray).map(elem => ({ [elem]: contentArray[elem] })) || []
            return {
                ...state,
                chatHistory: {
                    chatHistory: contentArray, //type === "scroll" ? [data.messages, ...state.chatHistory.chatHistory] : [data.messages],
                    pending: false,
                    success: true,
                    error: false
                },
                // chatHeight: contentArray && contentArray.length ? false : true
            }
        }
        case chat.CHAT_GET_HISTORY_ERROR: {
            return {
                ...state,
                chatHistory: {
                    ...state.chatHistry,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        /* 
            Send Chat message
        */
        case chat.CHAT_SEND_MESSAGE_PENDING: {
            return {
                ...state,
                chatSendMessage: {
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                chatSendMessage: {
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case chat.CHAT_SEND_MESSAGE_ERROR: {
            return {
                ...state,
                chatSendMessage: {
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        /* 
            Get Seller Chat details
        */
        case chat.CHAT_GET_SELLER_DETAILS_PENDING: {
            return {
                ...state,
                chatSellerDetails: {
                    //   chatList: {},
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_GET_SELLER_DETAILS_SUCCESS: {
            return {
                ...state,
                chatSellerDetails: {
                    chatSellerDetails: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case chat.CHAT_GET_SELLER_DETAILS_ERROR: {
            return {
                ...state,
                chatSendMessage: {
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }

        case chat.CHAT_SOCKET_LIST: {
            return {
                ...state,
                chatList: {
                    chatList: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }

        /* 
            Chat Login
        */
        case chat.CHAT_LOGOUT_PENDING: {
            return {
                ...state,
                chatLogout: {
                    // ...state.chatLogout,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.CHAT_LOGOUT_SUCCESS: {
            return {
                ...state,
                chatLogout: {
                    chatLogout: payload,
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case chat.CHAT_LOGOUT_ERROR: {
            return {
                ...state,
                chatLogout: {
                    ...state.chatLogout,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }
        /* set Chat category */
        case chat.CHAT_CATEGORY: {
            return {
                ...state,
                chatCategoryData: payload
            }
        }

        case chat.CHAT_CATEGORY_RESET: {
            return {
                ...state,
                chatCategoryData: {
                    catName: '',
                    language: '',
                    questions: generalQuestion && generalQuestion.length && generalQuestion[0].questions[localStorage.getItem('chatLanguage') || 'en'] || [],
                    selected: 'General'
                }
            }
        }

        /* 
            Get all chat templates
        */
        case chat.GET_ALL_CHAT_TEMPLATES_PENDING: {
            return {
                ...state,
                chatTemplate: {
                    ...state.chatTemplate,
                    pending: true,
                    success: false,
                    error: false
                }
            }
        }
        case chat.GET_ALL_CHAT_TEMPLATES_SUCCESS: {
            return {
                ...state,
                chatTemplate: {
                    template: [...generalQuestion, ...payload],
                    pending: false,
                    success: true,
                    error: false
                }
            }
        }
        case chat.GET_ALL_CHAT_TEMPLATES_ERROR: {
            return {
                ...state,
                chatTemplate: {
                    ...state.chatTemplate,
                    pending: false,
                    success: false,
                    error: true
                }
            }
        }
        /* Chat Height */
        case chat.CHAT_CATEGORY_HEIGHT: {
            return {
                ...state,
                chatHeight: payload
            }
        }


        default:
            return state;
    }
}
