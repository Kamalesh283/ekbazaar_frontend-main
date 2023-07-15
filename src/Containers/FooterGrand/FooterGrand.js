import React, { Component } from "react";
import "./FooterGrand.scss";
import { useMediaQuery } from "react-responsive";
import Conatiner from "../../Components/Conatiner/Conatiner";
import Copyright from "../../Assets/Icons/copyright";
import Socialinfo from "../../Components/Socialinfo/Socialinfo";
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
  productinventory,
} from "../../Routes/path";
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
  textOverflow: "ellipsis",
};

export default class FooterGrand extends Component {


  render() {
    return (
      <div className="footer-grand">
        <Conatiner>
          <Mobile>
            <div id="custom-for-mobile">
              <Socialinfo />
            </div>
          </Mobile>
          <div className="copyrights">
            <p>
              <Copyright height="14px" width="14px" />
              Subramanya Infotech Private Limited{" "}
            </p>
            <Socialinfo />
          </div>
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
      removemylistingurl,
    },
    dispatch
  ),
});
