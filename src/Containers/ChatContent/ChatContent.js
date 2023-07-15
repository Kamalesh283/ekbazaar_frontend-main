import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChatDate from '../../Components/ChatDate/ChatDate'
import ReceivedText from '../../Components/ReceivedText/ReceivedText'
import SendedText from '../../Components/SendedText/SendedText'
import './ChatContent.scss'
import moment from "moment"
import ChatTabs from '../ChatTabs/ChatTabs'
import { chatCategoryHeight } from '../../store/actions/chat'
class ChatContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
            //   questionContainer: true,
            //   categoryclicked: false,
            //   showinitialcategory: true,
        };
    }

    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "auto" });
    // }

    componentDidMount() {
        this.props.scrollToBottom();
    }

    componentDidUpdate() {
        this.props.scrollToBottom();
    }
    //     this.scrollToBottom();
    // }
    // componentWillUnmount() {
    //     this.props.clearHistory()
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps && nextProps.chatHistory && nextProps.chatHistory.length && nextProps.chatHistory.slice(-1).pop()){
    //     // if (((nextProps.chatList.length && !nextState.listData.length && !nextState.flag) || (nextProps.chatList && nextState.listData && _.sumBy(nextProps.chatList, 'subscription.unread') !== _.sumBy(nextState.listData, 'unread')))) {
    //     //     this.setState({
    //     //         listData: this.getChatList(nextProps.chatList),
    //     //         searchStatus: false
    //     //     })
    //     }
    //     return true

    // }
    // categoryClickHandler = () => {
    //     this.setState({
    //       categoryclicked: !this.state.categoryclicked,
    //       showinitialcategory: !this.state.showinitialcategory,
    //     });
    //   };

    tabAction = (value) => {
        console.log(' tab changes', value)
        this.setState({
            activeTab: value
        })
    }
    getQuestion = (data) => {
        this.setState({
            activeTab: 1
        })

    }

    // categoryHeighthandler = (value) => {
    // console.log("🚀 ~ file: ChatContent.js ~ line 73 ~ //shouldComponentUpdate ~ value", value)
    //     this.props.actions.chatCategoryHeight(value)
    // }

    render() {
        const { chatHistory, username, scroll, showinitialcategory, categoryclicked, loader, setChatCategoryFun, catQuestion, selecteCat, catEnglish, chatCategoryHeight, categoryHeighthandler } = this.props
        const todatdate = moment().format('YYYY-MM-DD')
        const yesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const lang = localStorage.getItem("chatLanguage");
        return (
            <>
                <div className={chatCategoryHeight ? "ChatContent1":"ChatContent"}>

                    {chatHistory && chatHistory.length ? [...chatHistory].map((message) => {
                        return Object.keys(message)/* .reverse() */.map((val) => {
                            return (<>
                                <ChatDate chatDate={moment(todatdate).isSame(val.toString()) ? 'Today' : moment(yesterdayDate).isSame(val.toString()) ? 'Yesterday' : moment(val).format('DD-MM-YYYY')} />
                                {
                                    message[val].map((msg) => {
                                        return (<>{
                                            username.toString() === msg.u.username
                                                ? <SendedText message={msg && msg.translations
                                                    ? Object.keys(msg.translations).includes(lang)
                                                        ? lang === "en" ? msg.msg : msg.translations[lang]
                                                        : Object.keys(msg.translations).lenght > 1
                                                            ? lang
                                                                ? lang === "en" ? msg.msg : msg.translations[lang]
                                                                : msg.translations[Object.keys(msg.translations)[1]]
                                                            : msg.translations[Object.keys(msg.translations)[1]] || msg.translations[Object.keys(msg.translations)[0]]
                                                    : msg.msg} time={moment(msg.ts).format('HH:mm')} roomId={msg.rid} />
                                                : <ReceivedText message={msg && msg.translations ? Object.keys(msg.translations).includes(lang) ? lang === "en" ? msg.msg : msg.translations[lang] : msg.translations[Object.keys(msg.translations)[0]] : msg.msg} time={moment(msg.ts).format('HH:mm')} roomId={msg.rid} />}</>)
                                    })
                                }
                            </>)

                        })

                    }
                    ) : (false)}
                    {scroll}
                    {/* <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div> */}
                    {/* {showinitialcategory &&
                        <ChatSelectCategory
                            className="CategoryPostion "
                            categoryClickHandler={this.props.categoryClickHandler}
                        />
                        || ''}
                    {(categoryclicked && <ChatQuestions />) || ""} */}
                    <ChatTabs className="chatTabPosition" activeTab={this.state.activeTab} changeTab={this.tabAction} getQuestion={this.getQuestion} setChatCategoryFun={setChatCategoryFun} catQuestion={catQuestion} chatTemplates={this.props.chatTemplates} sendMessage={this.props.sendMessage} selecteCat={selecteCat} catEnglish={catEnglish} categoryHeighthandler={categoryHeighthandler} chatCategoryHeight={chatCategoryHeight}/>

                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    catQuestion: state.chat.chatCategoryData.questions,
    catEnglish: state.chat.chatCategoryData.english,
    selecteCat: state.chat.chatCategoryData.selected,
    chatTemplates: state.chat.chatTemplate.template,
    chatCategoryHeight: state.chat.chatHeight,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        chatCategoryHeight
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);

// message[val].map((msg) => {
//     return (<>{
//         username === msg.u.username 
//         ? <SendedText message={msg && msg.translations 
//             ? Object.keys(msg.translations).includes(lang) 
//                 ? msg.translations[lang] 
//                 : Object.keys(msg.translations).lenght > 1 
//                     ? lang 
//                         ? msg.translations[lang]
//                         : msg.translations[Object.keys(msg.translations)[1]] 
//                 : msg.translations[Object.keys(msg.translations)[1]] ||  msg.translations[Object.keys(msg.translations)[0]]
//                 : msg.msg} time={moment(msg.ts).format('HH:mm')} roomId={msg.rid} /> 
//         : <ReceivedText message={msg && msg.translations ? Object.keys(msg.translations).includes(lang) ? msg.translations[lang] : msg.translations[Object.keys(msg.translations)[0]] : msg.msg} time={moment(msg.ts).format('HH:mm')} roomId={msg.rid} />}</>)
// })
