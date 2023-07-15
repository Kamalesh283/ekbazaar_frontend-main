import React, { Component } from "react";
import { connect } from "react-redux";
import "./AsideSellerPreference.scss";
import { NavLink } from "react-router-dom"; 
import brief from '../../Assets/Images/briefcase.svg'
import exclusion from '../../Assets/Images/Exclusion.svg'
import home from '../../Assets/Images/home.svg'
import profile from '../../Assets/Images/profile-user.svg'
import cart from '../../Assets/Images/shopping-cart.svg'
import Notify from "../../Assets/Icons/notify";
import UserNameCard from "../../Components/UserNameCard/UserNameCard";
import LogoutPage from "../Logout/Logout";
import { logout, selectedTab, acticateAccount } from "../../store/actions/common"
import { bindActionCreators } from "redux";
import history from "../../Routes/history"
import { bp, xsbussiness, xsaccount, sellerhelp, seller, selleraccount, productinventory, myproduct, signin, selleraccountplan } from '../../Routes/path'
import Out from "../../Assets/Icons/out";
import ReactivateAccount from "../../Containers/ReActivateAccount/ReActivateAccount"
import Portal from '../../Containers/Portal/Portal'
import { setAlert } from '../../store/actions/app';
export class AsideSellerPreference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // logout: false,
      model: null,
      width: window.innerWidth
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

  redirectHandler = (e, tab, link) => {
    e.preventDefault()
    const { hasAccess, sellerData } = this.props
    if(hasAccess && sellerData && sellerData.deactivateAccount && sellerData.deactivateAccount.status){
      this.props.actions.acticateAccount(true)
    }else{
      tab !== "" &&  this.props.actions.selectedTab(tab);
        this.props.overlayHandler()
        if(link === seller ){
          const url = sellerData && sellerData.sellerProductId && sellerData.sellerProductId.length && sellerData.sellerProductId.filter((value) => !value.isDeleted && value.productDetails && value.productDetails.price && value.productDetails.price.price) || []
          const path = url && url.length ? seller : sellerData.sellerProductId.filter((value) => !value.isDeleted).length ? myproduct :productinventory
          history.push(path)
          if(path === myproduct)
          this.props.actions.setAlert('danger', "Required min 1 product details")
        }else{
          if(link === productinventory)
          this.props.actions.setAlert('danger', "Required min 1 product")
          history.push(link)
        }
    }
  }
  handleActivationRequest = () => {
    this.props.actions.selectedTab(2)
    history.push({pathname: selleraccountplan, search: "tab=2&&productId=true"})
    this.props.overlayHandler()
    this.props.actions.acticateAccount(false)
  }

  render() {
    const { model, width } = this.state;
    const { sellerData, isAccountActivate } = this.props
    return (
      <div className="AsideSellerPreference">
        { isAccountActivate && 
              <Portal show logout >
                <ReactivateAccount
                  handleReActivation={this.handleActivationRequest}
                  name="Seller"
                />
              </Portal> || null}
        <UserNameCard buyer={sellerData} />
        <div className="path">
          {/* <NavLink  to={sellerData && sellerData.sellerProductId && sellerData.sellerProductId.length ? seller : productinventory} onClick={()=>{ this.props.overlayHandler() }}> */}
          <NavLink  to={sellerData && sellerData.sellerProductId && sellerData.sellerProductId.length ? seller : productinventory} onClick={(e) => this.redirectHandler(e, '', sellerData && sellerData.sellerProductId && sellerData.sellerProductId.length ? seller : productinventory)}>
            <span><img src={home} /></span>
            Seller Central
          </NavLink >
          <NavLink  exact to={width < 768 ? xsaccount : selleraccount} onClick={(e) => this.redirectHandler(e, 0, width < 768 ? xsaccount : selleraccount)}>
            <span><img src={profile} /></span>
            My Account
          </NavLink >
          <NavLink  exact onClick={(e) => this.redirectHandler(e, 3, selleraccountplan)} to={selleraccountplan}>
            <span><img src={exclusion} /></span>
            Manage Subscriptions
          </NavLink >
          <NavLink  to={width < 768 ? xsbussiness : bp} onClick={(e) => this.redirectHandler(e, '', width < 768 ? xsbussiness : bp)}>
            <span><img src={brief} /></span>
            Business Profile
          </NavLink >
          <NavLink  to={sellerData && sellerData.sellerProductId && sellerData.sellerProductId.length ? myproduct : productinventory} onClick={(e) => this.redirectHandler(e, "", sellerData && sellerData.sellerProductId && sellerData.sellerProductId.length ? myproduct : productinventory)}>
            <span><img src={cart} /></span>
            Manage Products/Services
          </NavLink >
          {/* <NavLink  to={sellerhelp} onClick={() => { this.props.overlayHandler() }}>
            <Notify fill="#ADB7BA" />
            Help
          </NavLink > */}
          <a className="custom" onClick={() => this.handleToggle('logout')}>
            <Out fill="#ADB7BA" />
            Sign Out
          </a>
          {model === "logout" && <LogoutPage cancel={this.handleToggle} model={model} submit={this.handleLogout} overlay={this.props.overlayHandler} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sellerData: state.common.user.seller,
  isAccountActivate: state.common.acticateAccount,
  hasAccess: state.app.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout,
    selectedTab,
    acticateAccount,
    setAlert
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideSellerPreference);
