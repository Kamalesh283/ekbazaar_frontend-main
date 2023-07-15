/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Register from "../Register/Register";
import Signin from "../Signin/Signin";
// import { UserPreference } from "../UserPreference/UserPreference";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import bluelanguage from '../../Assets/Images/language-blue.svg'
import {
  rootPath,
  signup,
  seller,
  categoryPath,
  buyerpreference,
  offer,
  offersearch,
  myproduct,
  pricingPath,
} from "../../Routes/path";
// import history from "../../Routes/history";
import UserNameCard from "../UserNameCard/UserNameCard";
import { setUserType } from "../../store/actions/common";
import BuyerRequestOffer from "../../Containers/BuyerRequestOffer/BuyerRequestOffer";
import ForceSignin from "../../Containers/ForceSignin/ForceSignin";
import { globalVaraibles } from "../../utils/utils";
import Cookies from "js-cookie";
import classNames from "classnames";
import { siteLanguagesList } from '../../utils/utils'
import { setSiteLanguage } from '../../store/actions/app'

const domains = globalVaraibles.domains();
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: Cookies.get("googtrans"),
      initial: true,
      redirect: "",
      offertoggle: false,
      requestform: false,
      force: false,
      changelanguage: false,
      flag: false
    };
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forcein = () => {
    // history.push('/signin')
    this.setState({
      force: false
    })
    this.props.handleClosemobSidebar();

  }
  // googleTranslateElementInit = () => {
  //   new google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       layout: google.translate.TranslateElement.InlineLayout,
  //       includedLanguages: "en,hi,ta,te,kn,pa,sd,ml,ur,mr,gu,or,bn",
  //       multilanguagePage: true,
  //     },
  //     "side-bar-left"
  //   );
  // }

  // componentDidMount() {
  //   let addScript = document.createElement('script');
  //   addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = this.googleTranslateElementInit;
  //   document.body.classList.add("variablewidth")
  //   // setLang(true)
  //   return () => {
  //     document.body.classList.remove("variablewidth")
  //   }
  // }


  // useEffect(() => {

  //   setTimeout(() => {

  //     let addScript = document.createElement('script');
  //     addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //     document.body.appendChild(addScript);
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  //     document.body.classList.add("variablewidth")
  //     setLang(true)
  //     return () => {
  //       document.body.classList.remove("variablewidth")
  //     }
  //   }, 2000)
  // }, [])

  toggle = () => {
    this.setState({
      initial: !this.state.initial,
    });
  };
  offertoggle = () => {
    this.setState({
      offertoggle: !this.state.offertoggle,
    });
  };
  redirectCategory = (e, id, title) => {
    e.preventDefault();
    this.props.handleClosemobSidebar();
    this.props.categoryAction(id);
    const validTitle = title.replace(/ /g, "-");
    // history.push({
    //   pathname: `${categoryPath}/${validTitle}`,
    // });
  };

  redirectHost = (path) => {
    window.location.assign(path)
    // if (window.location.hostname.includes("trade.ekbazaar.com") === true) {
    //   localStorage.removeItem("userType");
    //   window.location.assign("https://www.ekbazaar.com");
    // } else {
    //   localStorage.removeItem("userType");
    //   window.location.assign("https://ekbazaar.tech-active.com/home");
    // }
  };
  redirectLinks = () => {
    this.props.handleCloseSidebar();
    // history.push(signup);
  };
  buyerpreference = () => {
    // history.push(buyerpreference);
  };

  redirectSellerCentral = (e) => {
    // e.preventDefault();

    // this.props.actions.setUserType("seller");
    // if (this.props.hasAccess) history.push(myproduct);
    // else history.push("/signin");
    // this.props.handleClosemobSidebar();


    e.preventDefault();

    this.props.actions.setUserType("seller");
    if (this.props.hasAccess) {
      const { hasAccess } = this.props

      const _seller = this.props.seller

      const { busenessId, deactivateAccount, sellerType } = _seller || {}

      if (hasAccess && sellerType && sellerType.length && _seller && _seller.sellerProductId.length) {

        this.props.actions.setUserType("seller")
        // history.push(myproduct)

      } else if (hasAccess && sellerType && sellerType.length && _seller && !_seller.sellerProductId.length) {

        this.props.actions.setUserType("seller")
        // history.push(productinventory)

      } else if (hasAccess && ((sellerType && !sellerType.length) || !sellerType)) {

        this.props.actions.setUserType("seller")
        // history.push(signup)

      }
      // history.push(myproduct);
    }
    else{
      // history.push("/signin");
    }
    this.props.handleClosemobSidebar();
  };
  requestform = () => {
    if (this.props.hasAccess)
      this.setState({
        requestform: true,
      });
    else
      this.setState({
        force: true,
      });
  };
  BuyerRequestOffer = () => {

    console.log(this.props, "AAAA");
    this.setState({
      requestform: false,
    });
  };
  closemodule = () => {
    this.setState({
      force: false,
    });
  };
  languagetoggle = () => {
    this.setState({
      changelanguage: !this.state.changelanguage,
    });
  };

  popupOpen = () => {
            // this.props.handleClosemobSidebar()
    this.props.showRequestForm()
    // this.setState({
    //   requestform: true,
    // });

    console.log(this.state.requestform, "REE");
    // console.log(this.props, "MY PROPS");
  }

  changeLanguageByButtonClick = (e, language, texttodisplay) => {
    e.preventDefault()
    // if (language !== 'en') {
      var selectField = document.querySelector("#google_translate_element select");
      for (var i = 0; i < selectField.children.length; i++) {
        var option = selectField.children[i];
        // find desired langauge and change the former language of the hidden selection-field
        if (option.value == language) {
          this.setState({
            flag: !this.state.flag
          })
          selectField.selectedIndex = i;
          // trigger change event afterwards to make google-lib translate this side
          selectField.dispatchEvent(new Event('change'));
          break;
        }
      }
    // } else {
    //   Cookies.remove('googtrans')
    //   // window.location.reload()
    // }
    this.props.actions.setSiteLanguage(texttodisplay || '')
    setTimeout(() => {
      location.reload();
    }, 1000)
  }


  forceUpdateHandler() {
    this.forceUpdate();
  };


  render() {
    const lan = Cookies.get('googtrans') && Cookies.get('googtrans').split("/");
    const { menus, siteLang } = this.props;
    return (
      <>
        <div className="sidebar">
          <div className="card">
            {this.props.hasAccess ? (
              <>
                {/* <UserPreference sidebar={true}  /> */}
                <UserNameCard
                  handleClosemobSidebar={this.props.handleClosemobSidebar}
                  buyer={this.props.buyer}
                  onClick={this.buyerpreference}
                  mobile={this.props.mobile}
                />
              </>
            ) : (
              <>
                <Signin handleClosemobSidebar={this.props.handleClosemobSidebar}  />
                <Register handleClosemobSidebar={this.props.handleClosemobSidebar} />
              </>
            )}
          </div>
          <div className="Menu-options">
            <h4 className={classNames("notranslate")} style={{
              color: '#3225A7',
              fontFamily: 'OpenSans-Semibold',
              justifyContent: 'flex-start',
              position: 'relative',
              height: '46px',
              backgroundColor: `${this.state.changelanguage && '#F7F9FC' || ''}`

            }} onClick={this.languagetoggle}>
              <img style={{
                width: '15px',
                height: '15px',
                marginRight: '14px',
              }}
                src={bluelanguage} />
              {/* Select Language{" "} */}
              {(lan && lan.length && lan[2] && lan[2] ? siteLanguagesList.filter((v) => v.value === lan[2])[0].label : "English")}
              <FontAwesomeIcon
                style={{
                  color: '#3225A7',
                  position: 'absolute',
                  right: '16px',
                  top: '16px',
                  transform: `${(this.state.changelanguage && "rotate(180deg)") ||
                    "rotate(0deg)"
                    }`
                }}
                icon={faAngleDown}
              />
            </h4>
            {/* <div id="side-bar-left"></div> */}
            {this.state.changelanguage &&
              <div className={classNames("list", "translation-links notranslate")}>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "en", "English")} data-lang="English">English</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "hi", "हिंदी")} data-lang="Hindi">हिंदी</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "gu", "ગુજરાતી")} data-lang="Gujrati">ગુજરાતી</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "bn", "বাংলা")} data-lang="Bengali">বাংলা</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "kn", "ಕನ್ನಡ")} data-lang="Kannada">ಕನ್ನಡ</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "ml", "മലയാളം")} data-lang="Malayalam">മലയാളം</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "mr", "मराठी")} data-lang="Marathi">मराठी</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "ta", "தமிழ்")} data-lang="Tamil">தமிழ்</a></li>
                <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "te", "తెలుగు")} data-lang="Telugu">తెలుగు</a></li>
              </div>
              || ''}

            <p className="bazaar actve">
              <a>Trade Bazaar</a>
            </p>
            <ul className="trade">
              <h4 onClick={this.props.handleClosemobSidebar}>
                {" "}
                <Link to={rootPath}>Home</Link>
              </h4>
              {this.props.userType !== "seller" ? (
                <h4 onClick={this.props.handleClosemobSidebar}>
                  <Link
                    to={
                      this.props.hasAccess &&
                        this.props.seller &&
                        this.props.seller.busenessId
                        ? seller
                        : signup
                    }
                    onClick={() => {
                      history.push(seller);
                      this.props.actions.setUserType("seller");
                    }}
                    className="sell"
                  >
                    Sell on EkBazaar
                  </Link>{" "}
                </h4>
              ) : null}
              {this.props.userType == "seller" ? (
                <h4>
                  <NavLink onClick={this.props.handleClosemobSidebar} to={pricingPath}>Pricing</NavLink>
                </h4>
              ) : null}
              <h4 onClick={this.offertoggle}>
                Offers{" "}
                <FontAwesomeIcon
                  style={{
                    transform: `${(this.state.offertoggle && "rotate(180deg)") ||
                      "rotate(0deg)"
                      }`,
                  }}
                  icon={faAngleDown}
                />
              </h4>
              {(this.state.offertoggle && (
                <div className="list">
                  <li>
                    <NavLink onClick={this.props.handleClosemobSidebar} to={offer}>Browse All Offers</NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={offersearch}
                      onClick={(e) => this.redirectSellerCentral(e)}
                    >
                      Seller - Add Product Offers
                    </NavLink>
                  </li>
                  <li onClick={this.popupOpen}>
                    <a>Buyer - Add Requirement Offers</a>
                  </li>
                </div>
              )) ||
                ""}

              <h4 onClick={this.toggle}>
                Browse by{" "}
                <FontAwesomeIcon
                  style={{
                    transform: `${(this.state.initial && "rotate(180deg)") || "rotate(0deg)"
                      }`,
                  }}
                  icon={faAngleDown}
                />
              </h4>
              {this.state.initial ? (
                <div className="list">
                  {menus &&
                    menus.length &&
                    menus.map((cat, index) => {
                      return (
                        <li>
                          <Link
                            key={index}
                            onClick={(e) =>
                              this.redirectCategory(e, cat._id, cat.name)
                            }
                            to={cat.name.replace(/ /g, "-")}
                          >
                            {" "}
                            {cat.name.split(",").join(", ")}{" "}
                          </Link>
                        </li>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </ul>
            {/* <p className="bazaar">
              <a
                onClick={() => this.redirectHost(domains.tender)}
                style={{ cursor: "pointer" }}
              >
                Tender Bazaar
              </a>
            </p> */}

            {/* <p className="bazaar">
              <a
                onClick={() => this.redirectHost(domains.investment)}
                style={{ cursor: "pointer" }}
              >
                Investment Bazaar
              </a>
            </p> */}
          </div>
        </div>

        {
          (this.state.requestform && (
            <BuyerRequestOffer buyerrequestclose={this.BuyerRequestOffer} />
          )) ||
          ""
        }
        {
          (this.state.force && (
            <ForceSignin
              closemodule={this.closemodule}
              title="Sign-In"
              info="Please sign-in to request an offer!"
              click={this.forcein}
            />
          )) ||
          ""
        }
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  hasAccess: state.app.auth,
  seller: state.common.user.seller,
  userType: state.common.userType,
  buyer: state.common.user.buyer,
  siteLang: state.app.siteLanguage
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setUserType,
      setSiteLanguage
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
