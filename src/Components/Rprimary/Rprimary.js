import React, { Component } from "react";
import "./Rprimary.scss";
import profile from "../../Assets/Images/profile-pr.svg";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { pricingPath,/* signup, signin, productinventory, myproduct */} from "../../Routes/path";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { bindActionCreators } from "redux";
import { setUserType } from '../../store/actions/common';
// import history from "../../Routes/history";
// import { seller } from "../../Routes/path"
import Portal from '../../Containers/Portal/Portal'
import ReactivateAccount from "../../Containers/ReActivateAccount/ReActivateAccount"
import { chatOpen, chatResetList } from '../../store/actions/chat'
import SelectYourLang from "../SelectYourLang/SelectYourLang";
import { setSiteLanguage } from '../../store/actions/app'
let count = 0
class Rprimary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prferredLang: props.user && props.user.preferredLanguage && props.user.preferredLanguage.langCode || "en",
      showPopup: false
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.user && nextProps.user.preferredLanguage && nextProps.user.preferredLanguage && this.props.user && this.props.user.preferredLanguage && nextProps.user.preferredLanguage.langCode !== this.props.user.preferredLanguage.langCode) {
      this.setState({
        prferredLang: nextProps.user && nextProps.user.preferredLanguage && nextProps.user.preferredLanguage.langCode || "en"
      })
      return true
    }
    return true
  }

  handleSeller = () => {
    const _seller = this.props.seller
    const { hasAccess } = this.props
    if (_seller && _seller.name) {
      const { sellerType } = _seller
      const checkProductStatus = _seller && _seller.sellerProductId && _seller.sellerProductId.length && _seller.sellerProductId.filter((value) => !value.isDeleted && value.productDetails && value.productDetails.price && value.productDetails.price.price).length !== 0 ? true : false;
      const isNotDeleted = _seller && _seller.sellerProductId && _seller.sellerProductId.length && _seller.sellerProductId.filter((value) => !value.isDeleted).length !== 0 ? true : false;
      /* if (deactivateAccount && deactivateAccount.status === true) {
        this.setState({
          showPopup: true
        })
      if (hasAccess && busenessId && _seller && _seller.sellerProductId.length) {
      } else  */if (hasAccess && sellerType && sellerType.length && _seller && checkProductStatus) {
        this.props.actions.chatOpen(false)
        this.props.actions.chatResetList()
        this.props.actions.setUserType("seller")
        // history.push(seller)
        // }  else if (hasAccess && busenessId && _seller && !_seller.sellerProductId.length) {
      } else if (hasAccess && sellerType && sellerType.length && _seller.sellerProductId.length && isNotDeleted && !checkProductStatus) {
        this.props.actions.chatOpen(false)
        this.props.actions.chatResetList()
        this.props.actions.setUserType("seller")
        // history.push(myproduct)
      }
      else if (hasAccess && sellerType && sellerType.length && _seller && (!_seller.sellerProductId.length || !isNotDeleted)) {
        this.props.actions.chatOpen(false)
        this.props.actions.chatResetList()
        this.props.actions.setUserType("seller")
        // history.push(productinventory)
        // }else if (hasAccess && !busenessId) {
      } else if (hasAccess && ((sellerType && !sellerType.length) || !sellerType)) {
        this.props.actions.setUserType("seller")
        // history.push(signup)
      }
    } else if (hasAccess) {
      this.props.actions.setUserType("seller")
      // history.push(signup)
    } else {
      this.props.actions.setUserType("seller")
      // history.push(signin)
    }
  }
  closePortal = () => {
    this.setState({
      showPopup: false
    })
  }

  handleActivationRequest = () => {
    this.setState({
      showPopup: false
    })
  }

  setSiteLanguageAction = (data) => {
    this.props.actions.setSiteLanguage(data)
  }

  handleBuyer = () => {
    localStorage.setItem("userType", "buyer")
    this.props.actions.setUserType("buyer");
    // history.push('/')
  }

  render() {
    if (count === 4) count = 0
    count += 1;
    const { showPopup } = this.state
    return (
      <div className="primary-r">
        <ul>
          {this.props.userType === "buyer" || this.props.userType === "seller" ?
            <>
              {this.props.hasAccess && this.props.userType == "buyer"
                ? <li onClick={this.handleSeller}> <FontAwesomeIcon style={{ marginRight: '12px' }} icon={faBriefcase} />
                  <div className="sell" /* className={classNames("sell", "notranslate")} */>
                    Go to Seller Portal
                    {/* {translate('application.sell_on_ekBazaar')} */}
                  </div>
                </li>
                : this.props.hasAccess && this.props.userType == "seller" ?
                  <li onClick={this.handleBuyer}> <FontAwesomeIcon style={{ marginRight: '12px' }} icon={faBriefcase} />
                    <div className="sell" /* className={classNames("sell", "notranslate")} */>
                      Go to Buyer Portal
                      {/* {translate('application.sell_on_ekBazaar')} */}
                    </div>
                  </li>
                  : null}
              <li style={{
                display: 'none'
              }} className="lang">
                <div id="google_translate_element"></div>
              </li>
              <SelectYourLang lang={this.props.siteLang} setSiteLanguageAction={this.setSiteLanguageAction} primary={true} /* style={{
                display: this.props.userType === "seller" ? "none" : "block"
              }} */
              />

            </>
            : ""}
          {this.props.userType === "seller" ? (
            <>
              <li> <a to={pricingPath} onClick={() => {/* history.push(pricingPath) */ }}>Pricing</a></li>
              <li className="role">
                <span>
                  <img src={profile} />
                </span>
                {this.props.seller && this.props.seller.sellerType && this.props.seller.sellerType.length && this.props.seller.sellerType[0] && this.props.seller.sellerType[0].name || ""}
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
        {showPopup &&
          <Portal logout close={this.closePortal}>
            <ReactivateAccount
              handleReActivation={this.handleActivationRequest}
              name="Seller"
            />
          </Portal> || null}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userType: state.common.userType,
  seller: state.common.user.seller,
  specific: state.categories.specificCategories.category,
  hasAccess: state.app.auth,
  user: state.common.user.buyer,
  chatOpen: state.chat.chatOpen,
  siteLang: state.app.siteLanguage
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setUserType,
    chatOpen,
    chatResetList,
    setSiteLanguage
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Rprimary);
