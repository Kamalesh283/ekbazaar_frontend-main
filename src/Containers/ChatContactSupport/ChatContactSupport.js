import React, { Component } from 'react'
import './ChatContactSupport.scss'
import arrow from '.././../Assets/Images/chat-arrow-down.svg'
import ChatTitle from '../../Components/ChatTitle/ChatTitle'
import Input from '../../Components/Input/Input';
import { connect } from "react-redux";
class ChatContactSupport extends Component {

    render() {
        const { buyer } = this.props
        return (
            <div className="ChatContactSupport">
                <ChatTitle><h5>Contact Support</h5> <img onClick={this.props.closeChatWindow} src={arrow} /></ChatTitle>
                <div className="content">
                    <Input value={buyer.name} disabled={true} />
                    <Input value={buyer.mobile} disabled={true} />
                    <Input value={buyer.email} disabled={true} />
                    <textarea placeholder="Message" value={this.props.msg} onChange={(e) => this.props.onChange(e.target.value)}></textarea>

                    <div className="footer-option">
                        <a onClick={this.props.backtochat} className="back-to">Back to Chat</a>
                        <a className="submit" onClick={this.props.submit}>Submit</a>

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    seller: state.common.user.seller,
    buyer: state.common.user.buyer,
});

export default connect(mapStateToProps, null)(ChatContactSupport);
