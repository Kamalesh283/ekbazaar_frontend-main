import React, { Component } from "react";
import InitiateChat from "../../Components/InitiateChat/InitiateChat";
import ChatProcess from "../ChatProcess/ChatProcess";
import "./Chatbot.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getChatList,
  chatStep,
  chatOpen,
  chatReset,
} from "../../store/actions/chat";
import classnames from "classnames";
import history from "../../Routes/history";
import Portal from "../../Containers/Portal/Portal";
import ReactivateAccount from "../../Containers/ReActivateAccount/ReActivateAccount";
import ForceSignin from "../ForceSignin/ForceSignin";
import Chatbotnew from "../Chatbotnew/Chatbotnew";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      process: false,
      chatStepNumber: props.chatStep,
      force: false,
      moreinfo:false
    };
  }
  initiatechat = () => {
    console.log(' chat pro initiated -----------------')
    const { buyer, hasAccess } = this.props;
    if (!hasAccess) {
      this.setState({
        force: true,
      });
    } else if (
      hasAccess &&
      buyer &&
      buyer.deactivateAccount &&
      buyer.deactivateAccount.status
    ) {
      this.props.checkAccount();
    } else {
      this.props.actions.chatOpen(!this.props.chatOpen);
      this.props.actions.chatReset();
      if(this.state.process){
        this.props.actions.getChatList()
      }
      this.setState({
        process: !this.state.process,
      });
      
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps &&
      nextProps.chatList &&
      this.props.chatList &&
      nextProps.chatList.length !== this.props.chatList
    )
      return true;
    return true;
  }
  // chatStep = (value) => {
  //     this.setState({
  //         chatStepNumber: value
  //     })
  //     this.props.actions.chatStep(value)
  // }
  forcein = () => {
    history.push("/signin");
    this.setState({
      force: false,
    });
  };
  closemodule = () => {
    this.setState({
      force: false,
    });
  };
  userinfoHandler=()=>{
 this.setState({
   moreinfo:!this.state.moreinfo
 })
  }
  render() {
      console.log(this.props.chatRoomId,'chatRoomId')
    return (
      <>
        {(this.props.isAccountActivate && this.props.userType !== "seller" && (
          <Portal show logout>
            <ReactivateAccount
              handleReActivation={this.props.handleActivationRequest}
              name="Buyer"
            />
          </Portal>
        )) ||
          null}
        <div className={classnames("Chatbot", "notranslate")}>
          <InitiateChat
            hasAccess={this.props.hasAccess}
            onClick={this.initiatechat}
            process={this.state.process}
            messageCount={this.props.messageCount}
            changeicon={this.props.chatOpen ? true : false}
            roomid={this.props.chatRoomId ? true :false}
          />
          {this.props.chatOpen &&
            <>
              <ChatProcess
                closeChatWindow={
                  this.initiatechat
                }
              />
              
            </>
            ||
            ""
          }
          {/* {this.state.moreinfo && <Chatbotnew /> || ''} */}
        </div>

        {(this.state.force && (
          <ForceSignin
            closemodule={this.closemodule}
            title="Sign-In"
            info="Please sign-in to Chat with Seller!"
            click={this.forcein}
          />
        )) ||
          ""}
      </>
    );
  }
  // componentDidMount() {
  //     this.props.actions.getChatList()
  // }
}

const mapStateToProps = (state) => ({
  // seller: state.common.user.seller,
  chatList: state.chat.chatlist,
  hasAccess: state.app.auth,
  chatStep: state.chat.chatStep,
  chatOpen: state.chat.chatOpen,
  messageCount: state.chat.chatList.messageCount,
  buyer: state.common.user.buyer,
  isAccountActivate: state.common.acticateAccount,
  userType: state.common.userType,  
  chatRoomId: state.chat.chatRoomId,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      chatStep,
      chatOpen,
      chatReset,
      getChatList
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
