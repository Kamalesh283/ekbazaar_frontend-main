import React, { Component } from 'react'
import ChatLanguage from '../ChatLanguage/ChatLanguage'
import './ChatProcess.scss'
import StepWizard from 'react-step-wizard';
import ChatList from '../ChatList/ChatList';
import ChatWithUs from '../ChatWithUs/ChatWithUs';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getChatHistory, setChatLanguage, chatSetWhoseHistory, chatSetHistoryLimit, getChatList, getAllChatTemapltes } from '../../store/actions/chat'
import ChatContactSupport from '../ChatContactSupport/ChatContactSupport';
import { contactSupportApi } from '../../utils/api/chat';
import { setAlert } from '../../store/actions/app';

class ChatProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whoseHistory: "",
            offset: 0,
            limit: 5,
            preferredLanguage: '',
            customersupport: false,
            msg: ""
        }
    }
    setWhoseHistory = (values) => {
        // this.setState({
        //     whoseHistory: values
        // })
        this.props.actions.chatSetWhoseHistory(values)
    }

    chagePropsLimit = (skip, limit) => {
        this.props.actions.chatSetHistoryLimit({ skip, limit })
    }

    onScrolleHistroty = () => {
        this.props.actions.getChatHistory({ data: { roomId: this.props.chatRoomId, offset: this.props.skip, limit: this.props.limit }, changeLimit: this.changeLimit, type: "scroll" })
    }

    changeLimit = () => {
        const { skip, limit } = this.props
        // this.chagePropsLimit({ skip: skip + 5, limit })
        const data = {
            skip: skip + 25,
            limit
        }
        this.props.actions.chatSetHistoryLimit(data)
        // this.setState({
        //     offset: this.state.offset + 5,
        //     limit: 5
        // }, () => {
        // })

    }

    resetLimit = () => {
        const data = {
            skip: 0,
            limit: 25
        }
        this.props.actions.chatSetHistoryLimit(data)
        // this.chagePropsLimit(0, 5)
        // this.setState({
        //     offset: 0,
        //     limit: 5
        // }, () => {
        // })

    }

    updateLimit = (data) => {
        // this.setState({
        //     limit: data.limit,
        //     offset: this.state.offset + 1
        // })
        this.chagePropsLimit(this.props.skip, this.props.limit)
    }

    onLanguageSubmit = (e, nextFunc) => {
        e.preventDefault()
        if (this.state.preferredLanguage !== '') {

            this.props.actions.setChatLanguage({
                lang: this.state.preferredLanguage.value, nextFunc: ''//nextFunc(1) 
            })
        }
    }

    onHistoryLanguageChange = (value) => {
        if (value !== '') {

            this.props.actions.setChatLanguage({ lang: value, roomId: this.props.chatRoomId, fromWhere: 1 })
        }
    }

    onChangeLangusge = (value) => {
        this.setState({
            preferredLanguage: value
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        this.props.actions.getChatList({ chatUserType: 0 })
        // document.body.classList.add("removing-scroll")
        this.props.actions.getAllChatTemapltes({skip:0, limit: 60})
    }
    enablesupport = () => {
        this.setState({
            customersupport: true
        })

    }
    backtochat = () => {
        this.setState({
            customersupport: false
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const { buyer } = this.props
        const data = {
            name: buyer.name,
            mobile: buyer.mobile,
            email: buyer.email,
            msg: this.state.msgremoving
        }
        const resp = await contactSupportApi(data)
        if (resp.success) {
            this.setState({ customersupport: false })
            this.props.actions.setAlert("success", resp.message)
        }
    }
    render() {
        let noTransitions = {
            enterRight: '',
            enterLeft: '',
            exitRight: '',
            exitLeft: ''
        };
        const { limit, skip, messageCount } = this.props
        return (
            // <div id={this.props.id} className="ChatProcess">
            <>
                {!this.props.sellerChat ? <>
                    <div id={this.props.id} className="ChatProcess">
                    {/* <StepWizard isLazyMount={true} transitions={noTransitions}> */}
                    {(!localStorage.getItem('chatLanguage') || localStorage.getItem('chatLanguage') === "undefined") &&
                        <ChatLanguage messageCount={messageCount} minimize={this.props.closeChatWindow} onSubmit={this.onLanguageSubmit} onChange={this.onChangeLangusge} value={this.state.preferredLanguage} />
                    }
                    {localStorage.getItem('chatLanguage') /* && !this.props.chatRoomId  */&&
                        <ChatList enablesupport={this.enablesupport} contactsupport={true} closeChatWindow={this.props.closeChatWindow} setWhoseHistory={this.setWhoseHistory} changeLimit={this.changeLimit} />
                    }

                    {this.props.chatRoomId &&
                        <ChatWithUs {...this.props} chatProfile={this.props.setWhoseHistory} onScrolleHistroty={this.onScrolleHistroty} resetLimit={this.resetLimit} /* limit={limit} offset={skip} */ updateLimit={this.updateLimit} onLanguageChangeHandler={this.onHistoryLanguageChange} />
                        || ""
                    }
                    {/* </StepWizard> */}
                    {this.state.customersupport && <ChatContactSupport onChange={msg => this.setState({ msg })} submit={this.handleSubmit} closeChatWindow={this.props.closeChatWindow} backtochat={this.backtochat} /> || ''}
                    </div>
                </> : <>
                    {/* <StepWizard isLazyMount={true} transitions={noTransitions}> */}
                    {/* <ChatLanguage onSubmit={this.onLanguageSubmit} onChange={this.onChangeLangusge} value={this.state.preferredLanguage} />
                    <ChatList setWhoseHistory={this.setWhoseHistory} offset={this.state.offset} limit={this.state.limit} changeLimit={this.changeLimit} /> */}
                    {this.props.chatRoomId &&
                        < ChatWithUs closeChatWindow={this.props.closeChatWindow} {...this.props} chatProfile={this.state.whoseHistory} onScrolleHistroty={this.onScrolleHistroty} setLimit={this.setLimit} resetLimit={this.resetLimit} getSellerChat={this.props.sellerChat} updateLimit={this.updateLimit} onLanguageChangeHandler={this.onHistoryLanguageChange} />
                    }

                    {/* </StepWizard> */}
                </>


                }
                </>
            // </div>
        )
    }
}
const mapStateToProps = (state) => ({
    // seller: state.common.user.seller,
    chatList: state.chat.chatList.chatList,
    // chatHistory: state.chat.chatHistory.chatHistory,
    chatRoomId: state.chat.chatRoomId,
    sellerChat: state.chat.chatSellerDetails.success,
    setWhoseHistory: state.chat.whoseHistory,
    skip: state.chat.chatHistoryLimit.skip,
    limit: state.chat.chatHistoryLimit.limit,
    messageCount: state.chat.chatList.messageCount,
    buyer: state.common.user.buyer,

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getChatHistory,
        setChatLanguage,
        chatSetWhoseHistory,
        getChatList,
        chatSetHistoryLimit,
        setAlert,
        getAllChatTemapltes
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatProcess);
