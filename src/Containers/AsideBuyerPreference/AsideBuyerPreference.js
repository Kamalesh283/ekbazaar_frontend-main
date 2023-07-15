import React, { Component } from "react";
import { connect } from "react-redux";
import "./AsideBuyerPreference.scss";
import { NavLink, Link } from "react-router-dom";
import Person from "../../Assets/Icons/person";
import Notify from "../../Assets/Icons/notify";
import Settings from "../../Assets/Icons/settings";
import { myprofile, notification, account, signin, viewrequest } from "../../Routes/path";
import history from "../../Routes/history"
import UserNameCard from "../../Components/UserNameCard/UserNameCard";
import LogoutPage from "../Logout/Logout";
import { logout, acticateAccount } from "../../store/actions/common"
import { bindActionCreators } from "redux";
import Out from "../../Assets/Icons/out";
import Portal from '../../Containers/Portal/Portal'
import ReactivateAccount from "../../Containers/ReActivateAccount/ReActivateAccount"
export class AsideBuyerPreference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // logout: false,
      model: null,
      isActive: false
    };
  }

  handleToggle = (str) => {
    if (str) {
      this.showModel(str)
    } else {
      this.hideModel()
    }
  }

  showModel = (str) => {
    this.setState({
      model: str
    })
  }
  hideModel = () => {
    this.setState({
      model: null
    })
  }

  handleLogout = () => {
    this.hideModel()
    this.props.actions.logout()
    // history.push(signin)
  }

  isAccountActive = (e, linkType) => {
    e.preventDefault()
    const { hasAccess, buyer } = this.props
    if(hasAccess && buyer && buyer.deactivateAccount && buyer.deactivateAccount.status){
      this.props.actions.acticateAccount(true)
      this.props.overlayHandler && this.props.overlayHandler()
    }else{
      history.push(linkType)
      this.props.overlayHandler && this.props.overlayHandler()
    }
  }
  handleActivationRequest = () => {
    this.props.actions.acticateAccount(false)
  }

  render() {
    const { model } = this.state

    return (
      <div className="AsideBuyerPreference">
        { this.props.isAccountActivate && 
              <Portal show logout >
                <ReactivateAccount
                  handleReActivation={this.handleActivationRequest}
                  name="Buyer"
                />
              </Portal> || null}
        <UserNameCard buyer={this.props.buyer} />
        <div className="path">
          <NavLink to={myprofile} onClick={(e) =>this.isAccountActive(e, myprofile)}>
            <Person fill="#ADB7BA" />
            My Profile
          </NavLink>
          <NavLink to={viewrequest} onClick={(e) =>this.isAccountActive(e, viewrequest)}>
            <Settings fill="#ADB7BA" />
            View Requests
          </NavLink>
          <NavLink to={notification} onClick={(e) =>this.isAccountActive(e, notification)}>
            <Notify fill="#ADB7BA" />
            Notification Settings
          </NavLink>
          <NavLink to={account} onClick={this.props.overlayHandler}>
            <Settings fill="#ADB7BA" />
            My Account 
          </NavLink>
          <a className="custom" onClick={() => this.handleToggle('logout')}>
            <Out fill="#ADB7BA" />
            Sign Out
          </a>
          {model === "logout" && <LogoutPage onClick={this.props.onClick} cancel={this.handleToggle} model={model} submit={this.handleLogout} overlay={this.props.overlayHandler} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  buyer: state.common.user.buyer,
  hasAccess: state.app.auth,
  isAccountActivate: state.common.acticateAccount,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout,
    acticateAccount
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideBuyerPreference);
