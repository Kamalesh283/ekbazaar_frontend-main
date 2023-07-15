import React, { Component } from 'react'
import './ChatFooter.scss'
import send from "../../../src/Assets/Images/send.png";

import attach from '../../Assets/Images/chat-attach.png'
import menu from "../../Assets/Images/menu.png";
export default class ChatFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        // this.textMessage = React.createRef();
    }
    sendMessage = (e) => {
        e.preventDefault()
        this.sendTextMessage()
    }
    sendTextMessage = () => {
        if (this.state.message !== "") {

            this.props.sendMessage(this.state.message)
            this.setState({
                message: ''
            })
        }
    }
    onChnageHandler = (value) => {
        this.setState({
            message: value && value.length === 1 ? value.trim() : value
        })
        this.props.onChange(value && value.length === 1 ? value.trim() : value)
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.sendTextMessage()
        }
    }
    // componentDidMount() {
    //     // this.textMessage.current.focus();
    // }
    // componentDidUpdate() {
    //     this.textMessage.current.focus();
    // }

    render() {
        return (
            <div className="ChatFooter">
                <form>
                    {/* <img
                        className="menuImg"
                        src={menu}
                        onClick={this.props.menutoggle}
                      /> */}
                    <div className="text">
                        <textarea placeholder="Send a message..." onKeyDown={this._handleKeyDown} value={this.state.message} onChange={(e) => this.onChnageHandler(e.target.value)} /* ref={this.textMessage} */ onFocus={()=>this.props.categoryHeighthandler(false)}></textarea>
                    </div>
                    <div className="send-and-attachment">
                        {/* <div className="attachment">
                            <input type="file" id="upload" hidden />
                            <label for="upload"><img src={attach} /></label>
                        </div> */}
                        <div className="send">
                            <button type="submit" onClick={(e) => this.sendMessage(e)}> <img src={send} /></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
