/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Seconadrynav.scss";
import Conatiner from "../../Components/Conatiner/Conatiner";
import Search from "../../Components/Search/Search";
import Signin from "../../Components/Signin/Signin";
import Register from "../../Components/Register/Register";
import Logo from "../../Assets/Images/Final.svg";
import mobileLogo from "../../Assets/Images/logo-for-xs.png";
import Sidebar from "../../Components/Sidebar/Sidebar";
import WebSidebarleft from "../WebSidebarleft/WebSidebarleft";
import UserPreference from "../../Components/UserPreference/UserPreference";
import {
  rootPath,
  seller,
  productinventory,
  myproduct,
  offer,
  offersearch,
  signup,
  signin
} from "../../Routes/path";
import { Link, NavLink } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserType, clear } from "../../store/actions/common";
import { setAlert } from "../../store/actions/app";
import { getAllProducts, setSearchKeyword } from '../../store/actions/categories'
import notify from "../../Assets/Images/notification-updated.svg";
import MediaQuery from "react-responsive";
import NotifyMob from "../../Assets/Images/bell.svg";
import history from "../../Routes/history";
import Portal from "../Portal/Portal";
import ReactivateAccount from "../ReActivateAccount/ReActivateAccount";
import { chatOpen } from "../../store/actions/chat";
import sellerhome from "../../Assets/Images/seller-home.svg";
import Button from "../../Components/Button/Button";
import BuyerRequestOffer from "../BuyerRequestOffer/BuyerRequestOffer";
import ForceSignin from "../../Containers/ForceSignin/ForceSignin";
import { translate, localize } from 'react-i18nify';
import { bannerLang } from '../../utils/languages/home'
import { setTranslationsGetter } from 'react-i18nify';
import classNames from "classnames";

setTranslationsGetter(bannerLang);
class Seconadrynav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      togglemenu: false,
      mobilemenu: false,
      showPopup: false,
      requestform: false,
      force: false,
      dropdown:false,
      width: window.innerWidth,
    };
  }

  closeChat = () => {
    this.props.actions.chatOpen(false);
  };

  handlehamburger = () => {
    this.setState({
      togglemenu: !this.state.togglemenu,
      // mobilemenu: !this.state.mobilemenu
    });
  };
  handlehamburgermobile = () => {
    console.log(this.state.mobilemenu, "this.state.mobilemenu");
    this.setState({
      mobilemenu: !this.state.mobilemenu,
    });
  };

  showRequestForm = () => {
    this.setState({
      showRequestForm: true,
    });
  }

  overlay = () => {
    this.setState({
      togglemenu: false,
      mobilemenu: false,
    });
  };
  MobileMenuBarHandler = () => {
    this.setState({
      mobilemenu: !this.state.mobilemenu,
    });
  };
  handleBuyer = () => {
    const { hasAccess } = this.props;
    const { buyer } = this.props;
    if (buyer) {
      const { deactivateAccount } = buyer;
      /* if (deactivateAccount && deactivateAccount.status === true) {
        this.setState({
          showPopup: true
        })
      } else */ if (hasAccess) {
        // this.props.actions.setUserType("buyer");
        this.props.actions.setUserType("seller");
        history.push(rootPath);
      } else {
        // this.props.actions.setUserType("buyer");
        this.props.actions.setUserType("seller");
        history.push(rootPath);
      }
    } else {
      // this.props.actions.setUserType("buyer");
      this.props.actions.setUserType("seller");
      history.push(rootPath);
    }
  };
  closePortal = () => {
    this.setState({
      showPopup: false,
    });
  };

  handleActivationRequest = () => {
    this.setState({
      showPopup: false,
    });
  };

  closeforclose = () => {
    this.setState({
      mobilemenu: false,
    });
  };
  redirectHandling = (e, url) => {
    e.preventDefault();
    // const { seller } = this.props
    if (
      this.props.seller &&
      this.props.seller.deactivateAccount &&
      this.props.seller.deactivateAccount.status
    ) {
      console.log("deactivcate account");
    } else {
      url =
        (this.props.seller &&
          this.props.seller.sellerProductId &&
          this.props.seller.sellerProductId.length &&
          this.props.seller.sellerProductId.filter(
            (value) =>
              !value.isDeleted &&
              value.productDetails &&
              value.productDetails.price &&
              value.productDetails.price.price
          )) ||
        [];
      const path =
        url && url.length
          ? seller
          : this.props.seller.sellerProductId.filter(
            (value) => !value.isDeleted
          ).length
            ? myproduct
            : productinventory;
      history.push(path);
      if (path === myproduct)
        this.props.actions.setAlert("danger", "Required min 1 product details");
      else if (path === productinventory)
        this.props.actions.setAlert("danger", "Required min 1 product");
    }
  };
  requestform = () => {
    // this.setState({
    //   requestform: true,
    //   mobilemenu:false
    // });

    if (this.props.hasAccess)
      this.setState({
        requestform: true,
        mobilemenu:false
      });
    else
      this.setState({
        force: true,
        mobilemenu:false
      });
  };
  BuyerRequestOffer = () => {
    this.setState({
      requestform: false,
    });
  };
  redirectSellerCentral = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.actions.setUserType("seller");
    if (this.props.hasAccess) {
      const { hasAccess } = this.props

      const _seller = this.props.seller
      
      const { busenessId, deactivateAccount, sellerType } = _seller || {}

      if (hasAccess && sellerType && sellerType.length && _seller && _seller.sellerProductId.length) {

        this.props.actions.setUserType("seller")
        history.push(myproduct)

      } else if (hasAccess && sellerType && sellerType.length && _seller && !_seller.sellerProductId.length) {

        this.props.actions.setUserType("seller")
        history.push(productinventory)

      } else if (hasAccess && ((sellerType && !sellerType.length) || !sellerType)) {

        this.props.actions.setUserType("seller")
        history.push(signup)

      }
      // history.push(myproduct);
    }
    else history.push("/signin");

    // this.props.actions.setUserType("seller");
    // if (this.props.hasAccess) history.push(myproduct);
    // else history.push(signin);
  };

  offerHadling = (e) => {
    e.preventDefault();
    this.props.actions.setSearchKeyword(null)
    history.push(offer);
  };
  closemodule = () => {
    this.setState({
      force: false,
    });
  };
  forcein = () => {
    history.push("/signin");
    this.setState({
      force: false,
    });
  };
  closedropdown=()=>{
    this.setState({
      dropdown:true
    })
    this.props.actions.setSearchKeyword(null)
    setTimeout(
      () => this.setState({ dropdown: !this.state.dropdown }), 
      1000
    );
  }
  render() {

    console.log(this.state.mobilemenu, "this.state.mobilemenu")
    const { showPopup, force } = this.state;
    const { seller, userType, buyer } = this.props;
    const status =
      userType === "seller"
        ? seller && seller.sellerType && !seller.sellerType.length
          ? true
          : false
        : buyer && !buyer.name
          ? true
          : false;
    return (
      <div className="Seconadrynav">
        <Conatiner>
          <div className="flbk">
            {this.props.userType !== "seller" && (
              <div className="hamburger-web" onClick={this.handlehamburger}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            )}
            <div className="hamburger-mobile" onClick={this.MobileMenuBarHandler}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            {this.state.togglemenu ? (
              <>
                <WebSidebarleft
                  {...this.props}
                  handleCloseSidebar={this.handlehamburger}
                  onClick={this.overlay}
                />
                <div className="overlay-sidebar" onClick={this.overlay}></div>
              </>
            ) : (
              ""
            )}
            <div className="logo">
              {/* <MediaQuery maxDeviceWidth={768}> */}
              {/* {this.state.mobilemenu ? (
              <>
                <div className="overlay-sidebar" onClick={this.overlay}></div>
                <Sidebar
                  {...this.props}
                  onClick={this.closeforclose}
                  handleClosemobSidebar={this.handlehamburgermobile}
                />
              </>
            ) : (
              ""
            )} */}
            {/* </MediaQuery> */}

            {/* <Link to={rootPath} onClick={() => this.props.actions.setUserType("buyer")}>
              <img src={Logo} alt="logo" />
            </Link> */}
            {/* <div style={{ cursor: "pointer" }} onClick={this.handleBuyer}> */}
              {/* <MediaQuery minDeviceWidth={1025}> */}
                <img onClick={this.handleBuyer} src={Logo} alt="logo" />
              {/* </MediaQuery>
              <MediaQuery maxDeviceWidth={1024}>
                <img src={mobileLogo} alt="logo" />
              </MediaQuery> */}
            {/* </div> */}
          </div>
          </div>
          <div className="search">
            <Search />
          </div>

          <div className={classNames("signin-register "/* , "notranslate" */)}>
            <div className={classNames("notranslate")}>
              <Button
                value={translate('application.oﬀers')}
                parentclass="Offers" 
                id="id-for-offer-btn"
                // click={(e) => this.offerHadling(e)}
              >
                <div className="overlay-dummy" onClick={(e) => this.offerHadling(e)} onTouchStart={(e) => this.offerHadling(e)}></div>
                <ul className="dropdown" style={{ display: `${this.state.dropdown ? 'none' : ''}` }}>
                  <li>
                    <NavLink  onClick={this.state.width > 1100 ? this.closedropdown : ''} to={offer}> {translate('application.browse_all_offers')}</NavLink> 
                  </li>
                  <li>
                    <NavLink 
                      to={offersearch}
                      onClick={(e) => this.redirectSellerCentral(e)}
                    >
                      {translate('application.seller_add_product_oﬀers')}
                    </NavLink >
                  </li>
                  <li onClick={this.requestform}>
                    <a>{translate('application.buyer_add_requirement_oﬀers')}</a>
                  </li>
                </ul>
              </Button>
            </div>
            {this.props.hasAccess ? (
              <>
                {/* {localStorage.getItem('userType') !== "seller" &&
               
              } */}
                <div className="notification">
                  {/* <MediaQuery maxDeviceWidth={768}>
                    <img src={NotifyMob} />
                    <p></p>
                  </MediaQuery> */}
                  {/* <MediaQuery minDeviceWidth={769}> */}
                  <a
                    className="seller-home-icon"
                    style={
                      status
                        ? { pointerEvents: "none", userSelect: "none" }
                        : {}
                    }
                    onClick={(e) =>
                      this.redirectHandling(
                        e,
                        this.props.seller &&
                          this.props.seller.sellerProductId &&
                          this.props.seller.sellerProductId.length
                          ? seller
                          : productinventory
                      )
                    }
                    to={
                      this.props.seller &&
                        this.props.seller.sellerProductId &&
                        this.props.seller.sellerProductId.length
                        ? seller
                        : productinventory
                    }
                  >
                    <img src={sellerhome} />
                  </a>
                  {/* <img src={notify} />
                    <p></p> */}
                  {/* </MediaQuery> */}
                </div>
                <UserPreference closeChat={this.closeChat} />
              </>
            ) : (
              <>
                <Signin />
                <Register clear={this.props.actions.clear} setSearchKeyword={this.props.actions.setSearchKeyword} />
              </>
            )}
          </div>
        </Conatiner>
        {(showPopup && (
          <Portal logout close={this.closePortal}>
            <ReactivateAccount
              handleReActivation={this.handleActivationRequest}
              name="Buyer"
            />
          </Portal>
        )) ||
          null}

        {(this.state.requestform && (
          <BuyerRequestOffer buyerrequestclose={this.BuyerRequestOffer} />
        )) ||
          ""}
        {(force && (
          <ForceSignin
            closemodule={this.closemodule}
            title="Sign-In"
            info="Please sign-in to request an offer!"
            click={this.forcein}
          />
        )) ||
          ""}
        {this.state.mobilemenu ? (
          <>
            <div className="overlay-sidebar" onClick={this.overlay}></div>
            <Sidebar
              mobile={true}
              {...this.props}
              onClick={this.closeforclose}
              handleClosemobSidebar={this.handlehamburgermobile}
              showRequestForm = {this.requestform}
            />
          </>
        ) : (
          ""
        )}

        {/* <BuyerRequestOffer/> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hasAccess: state.app.auth,
  seller: state.common.user.seller,
  buyer: state.common.user.buyer,
  userType: state.common.userType,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setUserType,
      clear,
      chatOpen,
      setAlert,
      setSearchKeyword
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seconadrynav);
