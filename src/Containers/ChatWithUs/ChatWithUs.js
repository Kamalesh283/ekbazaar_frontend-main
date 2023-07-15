import React, { Component } from 'react'
import ChatFooter from '../../Components/ChatFooter/ChatFooter'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ChatContent from '../ChatContent/ChatContent'
import './ChatWithUs.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { chatRoomId, sendMessage, chatMarkAsRead, chatHistoryReset, setChatCategory, resetChatCategory, chatCategoryHeight } from '../../store/actions/chat'
import moment from "moment"
import { withRouter } from 'react-router'
import { ChatFeed } from 'react-bell-chat'
class ChatWithUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionContainer: true,
            categoryclicked: false,
            showinitialcategory: true,
            chatToggle: true,
            varHeight: true,
            contentVisibility: true,
            scrolled: false,
            flag: false,
            rmId:"",
            // messageHistory: props.chatHistory && props.chatHistory.length ? props.chatHistory.map((msg) => ({
            //     message: msg.msg,
            //     time: moment(msg.ts).format('DD/MM/YYYY h:mm'),
            //     username: msg.u.username,
            //     rid: msg.rid
            // })) : []
            messages: /* this.formateChatHistory(), */[
                {
                    id: 1,
                    authorId: 1,
                    message: "Sample message",
                    createdOn: new Date(),
                    isSend: true
                },
                {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message",
                    createdOn: new Date(),
                    isSend: false
                }, {
                    id: 1,
                    authorId: 1,
                    message: "Sample message",
                    createdOn: new Date(),
                    isSend: true
                },
                {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message",
                    createdOn: new Date(),
                    isSend: false
                }, {
                    id: 1,
                    authorId: 1,
                    message: "Sample message",
                    createdOn: new Date(),
                    isSend: true
                },
                {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message",
                    createdOn: new Date(),
                    isSend: false
                }, {
                    id: 1,
                    authorId: 1,
                    message: "Sample message",
                    createdOn: new Date(),
                    isSend: true
                },
                {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message",
                    createdOn: new Date(),
                    isSend: false
                }, {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message",
                    createdOn: new Date(),
                    isSend: false
                }, {
                    id: 1,
                    authorId: 1,
                    message: "Sample message",
                    createdOn: new Date(),
                    isSend: true
                },
                {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message",
                    createdOn: new Date(),
                    isSend: false
                }, {
                    id: 1,
                    authorId: 1,
                    message: "Sample message",
                    createdOn: new Date(),
                    isSend: true
                },
                {
                    id: 2,
                    authorId: 2,
                    message: "Second sample message sjhfksdhgfkfg",
                    createdOn: new Date(),
                    isSend: false
                },
            ],
            authors: /* this.formateAuthor(), */[
                {
                    id: 1,
                    name: 'Mark',
                    isTyping: true,
                    lastSeenMessageId: 1,
                    bgImageUrl: undefined
                },
                {
                    id: 2,
                    name: 'Peter',
                    isTyping: false,
                    lastSeenMessageId: 2,
                    bgImageUrl: undefined
                }
            ],
            messageText: '',
            currentUser: 2,
        }
    }

    ModalchatToggle = () => {
        const { location } = this.props
        if (location && location.search === '') {
            this.props.actions.resetChatCategory()
        }
        // this.setState({
        //     chatToggle: !this.state.chatToggle
        // });
        this.props.actions.chatRoomId('')
        this.props.actions.chatCategoryHeight(true)


    }
    VariableHeightHandler = () => {
        this.setState({
            varHeight: !this.state.varHeight,
            contentVisibility: !this.state.contentVisibility,
        })
    }
    categoryClickHandler = () => {
        this.setState({
            categoryclicked: !this.state.categoryclicked,
            showinitialcategory: !this.state.showinitialcategory,
        });
    };

    formateChatHistory = () => {
        const { chatHistory } = this.props
        const temp = []
        const data = chatHistory && chatHistory.length && [...chatHistory].map((message) => {

            return Object.keys(message).map((val) => {
                return message[val].map((msg) => {
                    temp.push({
                        id: msg._id,
                        authorId: this.props.chatProfile._id === msg.u._id ? 1 : 2,
                        message: msg.msg,
                        createdOn: new Date(), //msg.ts,
                        isSend: true
                    })

                })

            })
        })
        return temp

    }

    formateAuthor = () => {
        const { chatHistory } = this.props
        const temp = []
        const data = chatHistory && chatHistory.length && chatHistory.map((message) => {

            return Object.keys(message).map((val) => {
                return message[val].map((msg) => {
                    temp.push({
                        id: msg.u._id,
                        authorId: this.props.chatProfile._id === msg.u._id ? 1 : 2, //msg.u.username,
                        message: msg.msg,
                        createdOn: msg.ts,
                        isSend: true
                    })

                })

            })
        })
        
    }

    sendMessage = (message) => {
        const limit = this.props.limit + 1
        const skip = this.props.skip
        this.props.actions.sendMessage({ roomId: this.props.chatRoomId, message/* :'message' */, language: localStorage.getItem('chatLanguage'), limit: limit, offset: skip, updateLimit: this.props.updateLimit, scrollBottom: this.scrollToBottomSmooth })

        // e.preventDefault();
        // if (this.state.messageText !== '') {
        //     const id = Number(new Date());
        //     const newMessage = {
        //         id,
        //         authorId: this.state.currentUser,
        //         message: this.state.messageText,
        //         createdOn: new Date(),
        //         isSend: false
        //     };
        //     this.setState(previousState => ({
        //         messageText: '',
        //         messages: previousState.messages.concat(newMessage)
        //     }), () => this.chat && this.chat.onMessageSend());
        //     setTimeout(() => {
        //         this.setState(previousState => ({ messages: previousState.messages.map(m => m.id === id ? { ...m, isSend: true } : m) }));
        //     }, 2000);
        // }
        // return true;
    }

    handleScroll = (e) => {
        e.preventDefault()
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        // console.log("🚀 ~ file: ChatWithUs.js ~ line 244 ~ ChatWithUs ~ bottom", e.target.scrollHeight - e.target.scrollTop, e.target.clientHeight, bottom)
        const test = e.target.scrollHeight - e.target.scrollTop
        // if(test <= 1000){
        //     console.log('worlks')
        // }
        if (e.target.scrollTop == 0) {
            this.props.onScrolleHistroty()
        }
    }

    clearHistory = () => {
        this.props.actions.chatHistoryReset()
    }

    scrollToBottom = () => {
        this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }
    scrollToBottomSmooth = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    loadMessage = () => new Promise(resolve => setTimeout(() => {

        const { messages } = this.state
        messages.unshift(...messages)
        this.setState({
            messages
        }, () => resolve())

    }, 1000))

    shouldComponentUpdate(nextProps, nextState) {
        // if (!nextState.scrolled && !this.state.flag) {
        if (!nextState.scrolled) {
            this.scrollToBottom()
            // this.setState({
            //     rmId: this.props.chatRoomId
            // })
            // this.setState({
            //     flag: true
            // })
        }
        // if ((nextProps.chatHistory.length && !nextState.messages.length)) {
        //     this.setState({
        //         message: this.formateChatHistory(),
        //         // searchStatus: false
        //     })
        // }
        return true
    }
    menutoggle = () => {
        this.setState({
            showinitialcategory: !this.state.showinitialcategory,
            categoryclicked: false,
            questionContainer: false,
            chatVisiblitiy: !this.state.chatVisiblitiy,
        })
    }

    setChatCategoryFun = (data) => {
        const lang = localStorage.getItem('chatLanguage') || 'en'
        const obj = {
            catName: data.lable || data.name || '',
            language: lang,
            questions: data && data.questions && data.questions[lang] && data.questions[lang] || [],
            selected: data._id || '',
            english: data.english
        }
        console.log(data," vvvvvvvvvvvvvvvvvvvvvvvvvvvvv",obj)
        this.props.actions.setChatCategory(obj)
    }

    categoryHeighthandler = (value) => {
        this.props.actions.chatCategoryHeight(value)
        this.scrollToBottom()
        this.scrollToBottomSmooth()
    }

    render() {
        let variableHeight = this.state.varHeight ? "max" : "min"
        console.log(this.state.contentVisibility,"------------bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        return (
            <>
                {/* {this.state.chatToggle?  */}
                <div
                    className={variableHeight} id="ChatWithUs" onScroll={(e)=>this.handleScroll(e)} >
                    <ChatHeader {...this.props} closeChatWindow={this.props.closeChatWindow} VariableHeightHandler={this.VariableHeightHandler} ModalchatToggle={this.ModalchatToggle} />
                    {/* <ChatFeed
                    ref={e => this.chat = e}
                    messages={this.state.messages} // Array: list of message objects
                    authors={this.state.authors} // Array: list of authors
                    yourAuthorId={2} // Number: Your author id (corresponds with id from list of authors)
                    showIsTyping={true}
                    showLoadingMessages={true}
                    showDateRow={true}
                    onLoadOldMessages={() => new Promise(resolve => setTimeout(() => {
                        this.setState(previousState => ({
                            messages: previousState.messages.concat(previousState.messages)
                        }), () => resolve());
                    }, 1000))}
                    hasOldMessages={true}
                    authors={this.state.authors}
                /> */}
                    {this.state.contentVisibility ?
                        <>
                            <ChatContent
                                categoryclicked={this.state.categoryclicked}
                                showinitialcategory={this.state.showinitialcategory}
                                categoryClickHandler={this.categoryClickHandler}
                                scrollToBottom={this.scrollToBottom}
                                handleScroll={this.handleScroll}
                                chatHistory={this.props.chatHistory}
                                username={this.props.buyer.mobile}
                                clearHistory={this.clearHistory}
                                scroll={<div style={{ float: "left", clear: "both" }}
                                    ref={(el) => { this.messagesEnd = el; }}
                                >
                                </div>} loader={this.props.chatHistoryPending}
                                setChatCategoryFun={this.setChatCategoryFun}
                                sendMessage={this.sendMessage}
                                categoryHeighthandler={this.categoryHeighthandler}
                            />

                            <ChatFooter menutoggle={this.menutoggle} sendMessage={this.sendMessage} onChange={value => this.setState({ messageText: value })} categoryHeighthandler={this.categoryHeighthandler} />
                        </>
                        : ''}
                </div>
                {/* : ""} */}
            </>
        )
    }
    componentDidMount() {
        this.props.actions.chatMarkAsRead({ roomId: this.props.chatRoomId })
        document.body.classList.add("scrm")
        // this.props.actions.chatCategoryHeight(true)
    }

    componentWillUnmount() {
        this.props.resetLimit()
        this.props.actions.chatHistoryReset()
        this.props.actions.chatRoomId('')
        document.body.classList.remove("scrm")
    }
}
const mapStateToProps = (state) => ({
    chatHistory: state.chat.chatHistory.chatHistory,
    chatHistoryPending: state.chat.chatHistory.pending,
    buyer: state.common.user.buyer,
    chatRoomId: state.chat.chatRoomId,
    chatStep: state.chat.chatStep,
    sellerChat: state.chat.chatSellerDetails.success,
    chatProfile: state.chat.whoseHistory,
    skip: state.chat.chatHistoryLimit.skip,
    limit: state.chat.chatHistoryLimit.limit,
    activeCat: state.chat.chatCategoryData.chatCategoryData,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        sendMessage,
        chatMarkAsRead,
        chatHistoryReset,
        chatRoomId,
        setChatCategory,
        resetChatCategory,
        chatCategoryHeight
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatWithUs);
