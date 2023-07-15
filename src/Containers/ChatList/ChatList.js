import React, { Component } from 'react'
import './ChatList.scss'
import ChatTitle from '../../Components/ChatTitle/ChatTitle'
import FormCheckbox from '../../Components/FormCheckbox/FormCheckbox'
import Input from '../../Components/Input/Input'
import UserChat from '../../Components/UserChat/UserChat'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getChatList, getChatHistory, chatRoomId, chatHistoryReset, getAllChatTemapltes, resetChatCategory, chatCategoryHeight } from '../../store/actions/chat'
import close from '../../Assets/Images/close-white.svg'
import moment from "moment"
import arrow from '.././../Assets/Images/chat-arrow-down.svg'
import _ from 'lodash'
import Loading from '../../Components/Loading/Loading'

// const chat = [
//     {
//         status: 'active',
//         company: 'KS Rice Mill, Chennai, TN-Surresh',
//         product: 'Basmati Rice 90 Bags',
//         description: 'Dear Madam/Sir...',
//         unread: '3',
//         time: '15:03'
//     }
// ]
class ChatList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchStatus: false,
            listData: [],
            checked: false,
            filter: false,
            bunched: true,
            filterSearch: false
        }

    }

    getChatHistory = async (data) => {
        const roomId = data.rid
        await this.props.actions.chatRoomId()
        this.props.actions.chatCategoryHeight(false)
        this.props.actions.chatHistoryReset()
        this.props.setWhoseHistory(data)
        const dt = { data: { roomId, offset: 0/* this.props.skip */, limit: this.props.limit, nextNext: this.nextNext }, changeLimit: this.props.changeLimit, type: "get" }
        this.props.actions.chatRoomId(roomId)
        this.props.actions.getChatHistory(dt)
        this.props.actions.resetChatCategory()
        // this.props.actions.getAllChatTemapltes({})

    }
    nextNext = () => {
        // this.props.chatStep(3)
        this.props.nextStep()
    }

    getChatList = (listData) => {
        // const filterList = listData && listData.length ? listData.filter(v => v.usernames[0] !== localStorage.getItem('chatUsername')) : []
        // const data = filterList && filterList.length && _.orderBy(listData, ['subscription.unread', 'lastMessage.ts'], ['desc', 'desc']).map((msg) =>
        const data = listData && listData.length && _.orderBy(listData, ['subscription.unread', 'lastMessage.ts'], ['desc', 'desc']).map((msg) =>
        ({
            company: msg.lastMessage && msg.lastMessage.u.name || '',
            product: 'Basmati Rice 90 Bags',
            description: msg.lastMessage && msg.lastMessage.msg || '',
            rid: msg.lastMessage && msg.lastMessage.rid || '',
            userId: msg._id,
            unread: msg.subscription && msg.subscription.unread || 0,
            status: msg.user && msg.user.status === "online" ? 'active' : 'inactive',
            isActive: msg.user && msg.user.active,
            name: msg.user && msg.user.name,
            time: msg.lastMessage && moment(msg.lastMessage.ts).format(' HH:mm') || '',
            usernames: msg.user && msg.usernames && msg.usernames.length && msg.usernames || [],
            _id: msg.user && msg.user._id
        })
        )
        return data
    }

    filterByRead = (checked, listData) => {

        this.setState({
            checked
        })
        if (checked) {

            const data = listData && listData.length && listData.filter(val => val.unread > 0)
            this.setState({
                searchStatus: true,
                listData: data
            })

        } else {
            // listData = this.getChatList(this.props.chatList)
            this.setState({
                searchStatus: true,
                listData: this.getChatList(this.props.chatList)
                // listData: listData && listData.length && listData.filter(val => val.unread > 0)
            })
        }
        return listData

    }

    filterByName = (value) => {
        const { checked } = this.state

        let { listData } = this.state
        if (checked && !listData.length) {

            listData = this.getChatList(this.props.chatList)
            listData = this.filterByRead(checked, listData)

        } else if (checked)
            listData = this.state.listData
        else
            listData = this.getChatList(this.props.chatList)
        let data = []
        if (checked)
            data = listData && listData.length && listData.filter(val => val.unread > 0 && val.name && val.name.toLowerCase().includes(value.toLowerCase()))
        else
            data = listData && listData.length && listData.filter(val => val.name && val.name.toLowerCase().includes(value.toLowerCase()))
        this.setState({
            searchStatus: true,
            listData: data,
            flag: true
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (/* !nextState.filterSearch && */ ((nextProps.chatList && nextProps.chatList.length && !nextState.listData.length && !nextState.flag) || (nextProps.chatList && nextProps.chatList.length && nextState.listData && _.sumBy(nextProps.chatList, 'subscription.unread') !== _.sumBy(nextState.listData, 'unread')))) {
            this.setState({
                listData: this.getChatList(nextProps.chatList),
                searchStatus: false,
                filterSearch: true
            })
            return true
        }
        return true

    }
    filterhandler = () => {
        this.setState({
            filter: !this.state.filter
        })
    }
    closeHnadler = () => {
        this.setState({
            filter: false
        })
    }
    componentDidMount() {
        document.body.classList.add("scrm")
      }
   componentWillUnmount() {
        document.body.classList.remove("scrm")
    }
    render() {
        const { listData, checked } = this.state
        const { chatListLoader } = this.props
        return (
            <div className="ChatList">

                <ChatTitle><h5><span className="active"></span>Chat with seller{this.props.messageCount && this.props.messageCount > 0 ? <span className="total-unread-count">{this.props.messageCount}</span> : false}</h5> <img onClick={this.props.closeChatWindow} src={arrow} />

                </ChatTitle>
                <div className="content">
                    <Input value={this.state.value} placeholdertext="Search messages" onChange={this.filterByName} >
                        <span className="filter" onClick={this.filterhandler}></span>

                        {this.state.filter &&

                            <>
                                <div className="custom-overlay" onClick={this.closeHnadler}></div>
                                <div className="bunch" >
                                    <h3>Filter</h3>
                                    <FormCheckbox checked={checked} onChange={(e) => this.filterByRead(e.target.checked, listData)} name="Unread" id="checkbox-custom-pattern" />

                                    <span style={{ cursor: 'pointer' }} className="close" onClick={this.props.closeChatWindow}><img src={close} /></span>
                                </div>
                            </>

                            || ''}

                    </Input>
                    <div className="list-people" >
                        {!listData.length && chatListLoader && <Loading />}
                        {listData && listData.length ?
                            <UserChat information={listData} getChatHistory={this.getChatHistory} />
                            : <div className="noChat"><p className="no-convo">No Conversation</p></div>
                        }
                    </div>

                </div>
                {this.props.contactsupport &&
                    <>
                        <a onClick={this.props.enablesupport} className="contact-support-team-btn">Contact Support</a>
                    </>
                }
            </div>
        )
    }
    // componentDidMount() {
    //     this.props.actions.getChatList({ chatUserType: 0 })
    // }
}

const mapStateToProps = (state) => ({
    seller: state.common.user.seller,
    chatList: state.chat.chatList.chatList,
    chatListLoader: state.chat.chatList.pending,
    chatHistory: state.chat.chatHistory.chatHistory,
    chatRoomId: state.chat.chatRoomId,
    skip: state.chat.chatHistoryLimit.skip,
    limit: state.chat.chatHistoryLimit.limit,
    messageCount: state.chat.chatList.messageCount,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getChatList,
        getChatHistory,
        chatRoomId,
        chatHistoryReset,
        getAllChatTemapltes,
        resetChatCategory,
        chatCategoryHeight
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
