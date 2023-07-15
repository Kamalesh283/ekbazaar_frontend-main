import React, { Component } from "react";
import "./ChatHeader.scss";
import ChatTitle from "../ChatTitle/ChatTitle";
import back from "../../Assets/Images/arrow-chat.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import language from "../../Assets/Images/language.svg";
import arrow from ".././../Assets/Images/chat-arrow-down.svg";
import close from ".././../Assets/Images/close.svg";

import onlineIndicator from "../../../src/Assets/Images/onlineIndicator.svg";
import { siteLanguagesList } from "../../utils/utils";
const langList = siteLanguagesList;
export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      rotatearr: true,
    };
  }

  rotatearrHandler = () => {
    this.setState({
      rotatearr: !this.state.rotatearr,
    });
    // this.props.VariableHeightHandler
  };

  handleTwoFunc = () => {
    this.rotatearrHandler();
    this.props.VariableHeightHandler();
  };

  language = () => {
    this.setState({
      initial: !this.state.initial,
    });
  };
  seletLanguage = (e) => {
    this.setState({
      initial: !this.state.initial,
    });
    this.props.onLanguageChangeHandler(e.target.value);
  };
  render() {
    let upDown = this.state.rotatearr ? "uparr" : "downarr";
    const { chatProfile } = this.props;
    let chatName =
      (chatProfile && chatProfile.name && chatProfile.name.split(" ")[0]) ||
      null;
    if (chatName && chatName.length > 10) {
      chatName = chatName.substring(0, 10) + " ...";
    }
    return (
      <div className="ChatHeader">
        <ChatTitle>
          <div className="compant-status">
            {/* <div className="go-back" onClick={() => this.props.goToStep(localStorage.getItem('chatLanguage') || localStorage.getItem('chatLanguage') === "undefined" ? 1 : 2)}>
                            {!this.props.sellerChat && <img src={back} />}
                        </div> */}
            <div className="go-back">
              {/* <img src={onlineIndicator} /> */}
              <span className="user-status" style={{backgroundColor:`${chatProfile.status === "online" || chatProfile.status === 'active' ?'#8beb65':'lightslategrey'}`}}></span>
            </div>
            <div className="profile">
              <h4
                title={chatProfile.name}
                style={{
                  width: "65px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {chatName || chatProfile.name}
              </h4>
              <p>
                {chatProfile.status === "online" ||
                chatProfile.status === "active"
                  ? "Online"
                  : "offline"}
              </p>
            </div>
          </div>
          <div className="language-person">
            {/* <div className="usr">
                            <FontAwesomeIcon icon={faUser} />
                        </div> */}
            {/* <div>
                            <img src={language} />
                        </div> */}
            <div className="trans">
              <div className="transl-blk">
                {/* <img
                  className="translate"
                  src={language}
                  onClick={this.language}
                /> */}
                <select
                  name="seller-lang-picker"
                  id="seller-lang-picker"
                  onChange={this.seletLanguage}
                >
                  {langList.map((v) => {
                    return (
                      <option
                        selected={
                          localStorage.getItem("chatLanguage") === v.value
                            ? true
                            : false
                        }
                        value={v.value}
                      >
                        {v.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* {this.state.initial ?
                                <ul>
                                    {langList.map((v) => {
                                        return (
                                            <li onClick={() => this.seletLanguage(v.value)}>{v.label}</li>
                                        )
                                    })}
                                </ul> : ''} */}
              {/* <span className="arrow">
                <img
                  id="dwnArrowImg"
                  className={upDown}
                  onClick={this.handleTwoFunc}
                  src={arrow}
                />
              </span> */}

              <span className="crossMark">
                <img onClick={this.props.ModalchatToggle} src={close} />
              </span>
            </div>
          </div>
        </ChatTitle>
      </div>
    );
  }
}
