import React, { Component } from "react";
import ChatTitle from "../../Components/ChatTitle/ChatTitle";
import onlineIndicator from "../../../src/Assets/Images/onlineIndicator.svg";
import dropArrow from "../../../src/Assets/Images/dropdownarr.svg";
import send from "../../../src/Assets/Images/send.png";
import menu from "../../../src/Assets/Images/menu.png";
import cross from "../../../src/Assets/Images/close.svg";
import "./Chatbotnew.scss";
import ChatSelectCategory from "../ChatSelectCategory/ChatSelectCategory";
import ChatQuestions from "../ChatQuestions/ChatQuestions";
import ChatMessages from "../ChatMessages/ChatMessages";

export default class Chatbotnew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: true,
      chatModalOpen: true,
      varHeight: true,
      closeModal: true,
      questionContainer: true,
      categoryclicked: false,
      showinitialcategory: true,
      chatVisiblitiy:false,
    };
  }
  menuToggle = () => {
    this.setState({
      showinitialcategory: !this.state.showinitialcategory,
      categoryclicked: false,
      questionContainer: false,
      chatVisiblitiy:!this.state.chatVisiblitiy,

    });
  };

  chatModalToggle = () => {
    this.setState({ chatModalOpen: !this.state.chatModalOpen });
  };

  varHeightHandler = () => {
    this.setState({ varHeight: !this.state.varHeight });
  };
  modalHandler = () => {
    this.setState({ closeModal: !this.state.closeModal });
  };

  questionContHandler = () => {
    this.setState({ questionContainer: false });
  };

  categoryClickHandler = () => {
    this.setState({
      categoryclicked: !this.state.categoryclicked,
      showinitialcategory: !this.state.showinitialcategory,
    });
  };
  render() {
    let variableHeight = this.state.varHeight ? "max" : "min";

    return (
      <>
        {this.state.closeModal ? (
          <div id="chatContainer" className={variableHeight}>
            <ChatTitle>
              <div className="ChatHeader">
                <span>
                  <img className="Indicator" src={onlineIndicator} />
                  <h3>Apsara Textiles</h3>
                  <p>Online</p>
                </span>
                <span>
                  <img
                    className="drpIndicator"
                    src={dropArrow}
                  />
                  <img
                    onClick={() => {
                      this.modalHandler();
                    }}
                    className="crossBtn"
                    src={cross}
                  />
                </span>
              </div>
            </ChatTitle>
            {this.state.chatModalOpen ? (
              <>
              {this.state.chatVisiblitiy&& <ChatMessages /> || ''}  
                {(this.state.showinitialcategory && (
                  <ChatSelectCategory
                    className="CategoryPostion "
                    categoryClickHandler={this.categoryClickHandler}
                  />
                )) ||
                  ""}
                {(this.state.categoryclicked && <ChatQuestions />) || ""}

                <div className="ChatSecFooter">
                  <form>
                    <span>
                      <img
                        className="menuImg"
                        src={menu}
                        onClick={() => {
                          this.menuToggle();
                        }}
                      />
                      <textarea placeholder="Send a message..."></textarea>
                    </span>
                    <span>
                      <img className="sendImg" src={send} />
                    </span>
                  </form>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
