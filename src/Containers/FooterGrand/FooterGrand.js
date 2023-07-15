import React, { Component } from "react";
import Conatiner from "../../Components/Conatiner/Conatiner";
import "./FooterGrand.scss";
import Socialinfo from "../../Components/Socialinfo/Socialinfo";
import close from "../../Assets/Images/close-white.svg";
import { NavLink } from "react-router-dom"; 
import {
  rootPath,
  about,
  privacy,
  disclaimer,
  contactpath,
  faqpath,
  signin,
  signup,
  pricingPath,
  refund,
  seller,
  categoryPath,
  myproduct,
  validTitle,
  productinventory
} from "../../Routes/path";
import CopyRight from "../../Assets/Icons/copyright";
import { useMediaQuery } from "react-responsive";
import RemoveListingPopup from "../RemoveListingPopup/RemoveListingPopup";
import history from "../../Routes/history";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removemylistingurl, setUserType } from "../../store/actions/common";
import { globalVaraibles } from "../../utils/utils";
import { getCategory } from "../../store/actions/categories";

const domains = globalVaraibles.domains();

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });
  return isMobile ? children : null;
};
const _styles = {
  fontFamily: "OpenSans-Regular",
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  transition: "0.2s",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}
export class FooterGrand extends Component {
  constructor(props) {
    super(props);
    this.accessLinks = [
      /* {
        link: " 30 Days Free Trial",
        path:
          this.props.hasAccess && this.props.userType === "buyer"
            ? rootPath
            : this.props.hasAccess && this.props.userType === "seller"
              ? seller
              : signin,
        custome: true,
      }, */
      {
        link: " Register",
        path: signup,
      },
      {
        link: " Sign in",
        path: signin
         /*  this.props.hasAccess && this.props.userType === "buyer"
            ? rootPath
            : this.props.hasAccess && this.props.userType === "seller"
              ? seller
              : signin, */
      },
    ];
    const addresss =``
    this.state = {
      removestatus: false,
      footercontent: [
        {
          title: " EkBazaar",
          links: [
            // {
            //   link: " About Us ",
            //   path: about,
            // },
            // {
            //   link: " Tender Bazaar ",
            //   path: domains.tender, //rootPath,
            // },
            // {
            //   link: " Investment Bazaar ",
            //   path: domains.investment, //rootPath,
            // },

            // {
            //   link: " Trade Bazaar ",
            //   path: rootPath,
            // },
            {
              link: 'addresss',
              path: rootPath,
            },
          ],
        },
        {
          title: 'Subscribe',
          links: []
        },
        {
          title: "Support",
          custom: true,
          links: [
            {
              link: " FAQs",
              path: faqpath,
            },
            {
              link: "  Customer Care ",
              path: contactpath,
            },
            {
              link: " Privacy Policy",
              path: privacy,
            },
            {
              link: " Terms and Conditions",
              path: disclaimer,
            },
            {
              link: "Refund Policy",
              path: refund
            }
          ],
        }
      ],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

    if ((nextProps && nextProps.userType && nextProps.userType !== this.props.userType) || (nextProps && nextProps.hasAccess && nextProps.hasAccess !== this.props.hasAccess)) {
      const { footercontent } = this.state

      // footercontent[1]["links"][2]["path"] = nextProps.hasAccess && nextProps.userType === "buyer" ? rootPath : nextProps.hasAccess && nextProps.userType === "seller" ? seller : signin
      // this.setState({ footercontent })
    }
    return true;
  }
  categoryAction = (id) => {
    this.props.actions.getCategory(id);
  };
  redirectCategory = (e, id, title) => {
    e.preventDefault();
    this.categoryAction(id);
    const validTitle = title.replace(/ /g, "-");
    history.push({
      pathname: `${categoryPath}/${validTitle}`,id
      // pathname: `${categoryPath}/${validTitle}?id=${id}`, id
    })
  };
  removeHandler = () => {
    // this.setState({
    //   removestatus: !this.state.removestatus,
    // });
    this.props.actions.removemylistingurl(true)

  };
  redirectLink = (e, data) => {
    e.preventDefault();
    // const { hasAccess, seller } = this.props;

    if (data.link === "Sell on EkBazaar") {
      // this.props.actions.setUserType("seller");
      // if (this.props.hasAccess) {
      //   const isNotDeleted = _seller && _seller.sellerProductId.filter((value) => !value.isDeleted).length !== 0 ? true : false;
      //   history.push(
      //     _seller &&
      //       _seller.sellerType &&
      //       _seller.sellerType.length &&
      //       !_seller.sellerProductId.length
      //       ? seller//productinventory
      //       : _seller && _seller.sellerType && _seller.sellerType.length && _seller && (!_seller.sellerProductId.length || !isNotDeleted)
      //       ? productinventory
      //       :_seller && _seller.sellerType && !_seller.sellerType.length
      //         ? signup
      //         : data.path
      //   );
      // } else {
      //   history.push(signin);
      // }


      // *******************************
      const _seller = this.props.seller
      const { hasAccess } = this.props
      if (_seller && _seller.name) {
        const { busenessId, deactivateAccount, sellerType } = _seller
        const checkProductStatus = _seller && _seller.sellerProductId && _seller.sellerProductId.length && _seller.sellerProductId.filter((value) => !value.isDeleted && value.productDetails && value.productDetails.price && value.productDetails.price.price).length !== 0 ? true : false;
        const isNotDeleted = _seller && _seller.sellerProductId && _seller.sellerProductId.length && _seller.sellerProductId.filter((value) => !value.isDeleted).length !== 0 ? true : false;
      /* if (deactivateAccount && deactivateAccount.status === true) {
        this.setState({
          showPopup: true
        })
      if (hasAccess && busenessId && _seller && _seller.sellerProductId.length) {
      } else  */if (hasAccess && sellerType && sellerType.length && _seller && checkProductStatus) {

          this.props.actions.setUserType("seller")
          history.push(seller)
          // }  else if (hasAccess && busenessId && _seller && !_seller.sellerProductId.length) {
        } else if (hasAccess && sellerType && sellerType.length && _seller.sellerProductId.length && isNotDeleted && !checkProductStatus) {
          this.props.actions.setUserType("seller")
          history.push(myproduct)
        }
        else if (hasAccess && sellerType && sellerType.length && _seller && (!_seller.sellerProductId.length || !isNotDeleted)) {
          this.props.actions.setUserType("seller")
          history.push(productinventory)
          // }else if (hasAccess && !busenessId) {
        } else if (hasAccess && ((sellerType && !sellerType.length) || !sellerType)) {
          this.props.actions.setUserType("seller")
          history.push(signup)
        }
      } else if (hasAccess) {
        this.props.actions.setUserType("seller")
        history.push(signup)
      } else {
        this.props.actions.setUserType("seller")
        history.push(signin)
      }
      // history.push(this.props.hasAccess ? data.path : signin)
    } else if (
      data.link === " 30 Days Free Trial" ||
      data.link === "30 Days Free Trial"
    ) {
      this.props.actions.setUserType("seller");
      history.push(this.props.hasAccess ? data.path : signin);
    }else{
      history.push(data.path)
    }
  };
  renderFooters() {
    const { categories, allCategories } = this.props;
    let SubscribeVal =
      !this.props.hasAccess
        ? [
          {
            link: " Plans & Pricing",
            path: pricingPath,
          },
          ...this.accessLinks,
          /* {
            link: "Sell on EkBazaar",
            path: seller,
            custome: true,
          } */,
        ]
        : [
          {
            link: " Plans & Pricing",
            path: pricingPath,
          },
          /* {
            link: "Sell on EkBazaar",
            path: seller,
            custome: true,
          } */,
        ]

    let displayCntBsdOnCond = this.state.footercontent && this.state.footercontent.filter((el) => {
      if (el.title === 'Subscribe') {
        el.links = SubscribeVal
      }
      return el;
    });
    return (
      <div className="box">
        {displayCntBsdOnCond.map((content) => {
          return (
            <div key={Math.random()} className="box-container">
               <h1>{content.title}</h1>
               <div
                 className="list"
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                   flexDirection: "column",
                 }}
               >

                {content.custom ? (
                  <li >
                    <a href="/about_us" > About Us </a>
                  </li>
                ) : (
                  ""
                )}
                 {content.custom ? (
                   <li onClick={this.removeHandler}>
                     <a>Remove my Listing</a>
                   </li>
                 ) : (
                   ""
                 )}
                 {content.links.map((link) => {
                   return(
                   <li key={Math.random()}>
                     {link.custome ? (
                       <NavLink 
                         to={`${link.path}`}
                         onClick={(e) => this.redirectLink(e, link)}
                       >
                         {" "}
                         {link.link}
                       </NavLink >
                     ) : link.link.includes("Bazaar") &&
                       !link.link.includes("Trade") ? (
                             <a style={{
                               fontFamily: 'OpenSans - Regular',
                               color: '#fff',
                               textDecoration: 'none',
                               fontSize: '14px'
                            }} onClick={() => window.location.assign(link.path)}>
                         {" "}
                         {link.link}
                       </a>
                       ) : link.link.includes('addresss') ? <p style={{  fontFamily: 'OpenSans - Regular',
                       color: '#fff',
                       textDecoration: 'none',
                             fontSize: '14px',
                             padding:'0px 20px 0px 0px'
                           }} >
                             Subramanya Infotech Private Limited<br/>
                            ,2, 1st Main, 1st Cross<br/>
                             Dollars Colony, RMV 2nd stage, <br/>
                             Bengaluru (Bangalore) Urban <br/>
                             Karnataka, 560094 <br/>
                             Helpline: <a href="tel:+918828802237">8828802237</a>
                     </p> : (
                       <NavLink  to={`${link.path}`}> 
                       {link.link}
                       </NavLink >
                 )}

                    
                 </li>
                )})}
              </div> 
            </div>
          );
        })}
        {/* <Socialinfo /> */}
        <div className="box-container">
          <h1>Browse by</h1>
          <div
            className="list"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {categories && categories.length > 0 && categories.slice(0, 5).map((cat, index) => {
              return (<li key={index}>
                <NavLink 
                  to={cat.name.replace(/ /g, '-')}
                  onClick={(e) => this.redirectCategory(e, cat._id, cat.name)}
                >
                  {cat.name.split(",").join(", ")}
                </NavLink >
              </li>)
            })
            }
          </div>
        </div>
        <div className="box-container"></div>
      </div>
    );
  }
  overlayHandler = () => {
    this.setState({
      removestatus: false,
    });
  };
  closeHandler = () => {
    this.setState({
      removestatus: false,
    });
  };
  onSubmit = () => {
    const { userType } = this.props
    history.push(userType === "seller" ? seller : rootPath);
    this.setState({
      removestatus: false,
    });
  };

  renderCopyText = () => {
    let year = new Date().getFullYear();
    return ` Subramanya Infotech Private Limited`	  
//    return `${year} Subramanya Infotech Private Limited` // Commented on Jan 25, 2023 @sree
  }
  render() {
    return (
      <div className="footer-grand">
        <Conatiner>
          {this.renderFooters()}
          <Mobile>
            <div id="custom-for-mobile">
              {/* <Apps/> */}
              <Socialinfo />
            </div>
          </Mobile>
          {/* <div className="ind-loc">
            <div className="footer-links">
              <h4>Locations</h4>
              <span>
                Andhra Pradesh | Arunachal Pradesh | Assam | Bihar |
                Chhattisgarh | Goa | Gujarat | Haryana | Himachal Pradesh |
                Jammu & Kashmir | Jharkhand | Karnataka | Kerala | Madhya
                Pradesh | Maharashtra | Manipur | Meghalaya | Mizoram | Nagaland
                | Odisha | Punjab | Rajasthan | Sikkim | Tamil Nadu | Telangana
                | Tripura Uttarakhand | Uttar Pradesh | West Bengal
              </span>
            </div>
            <div className="footer-links">
              <h4>Sectors</h4>
              <span>
                Drugs & Pharmaceuticals | Hospital & Diagnostics | Food &
                Beverages | Manufacturing | Industrial Plants | Industrial
                Machinery | Industry Supplies
              </span>
            </div>
          </div> */}
          <div className="copyrights">
            {/* <span>
              <CopyRight height="14px" width="14px" />
            </span> */}
            <p>
              <CopyRight height="14px" width="14px" />
               Subramanya Infotech Private Limited{" "}
            </p>
            <Socialinfo />
          </div>

          {/* {this.state.removestatus ? (
            <>
              {" "}
              <div className="ovelay" onClick={this.overlayHandler}></div>
              <RemoveListingPopup
                onSubmit={this.onSubmit}
                onClick={this.closeHandler}
              >
                <img onClick={this.closeHandler} src={close} />{" "}
              </RemoveListingPopup>{" "}
            </>
          ) : (
            ""
          )} */}
        </Conatiner>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hasAccess: state.app.auth,
  userType: state.common.userType,
  categories: state.categories.specificCategories.category,
  allCategories: state.categories.categories.category,
  seller: state.common.user.seller,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getCategory,
      setUserType,
      removemylistingurl
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterGrand);
