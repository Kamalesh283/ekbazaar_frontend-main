import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Conatiner from "../../Components/Conatiner/Conatiner";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";
import "./RequirmentForm.scss";
// import arrow from "../../Assets/Images/angledown.svg";
import Select from "react-select";
import { postRFP } from "../../store/actions/buyers";
import RFPstepFour from "../RFPstepFour/RFPstepFour";
import { getAllCities } from "../../store/actions/location";
import { searchQuery } from "../../store/actions/search";
import { getSuggestionDataStruct } from "../../utils/helpers";
import RFPPopup from "../../Containers/RFPPopup/RFPPopup";
import Portal from "../../Containers/Portal/Portal";
import ReactivateAccount from "../../Containers/ReActivateAccount/ReActivateAccount";
import { account } from "../../Routes/path";
import history from "../../Routes/history";
import { bannerLang } from '../../utils/languages/home'
import { translate } from 'react-i18nify';
import { setTranslationsGetter } from 'react-i18nify';
import {
  sendOtp,
  // setOtp,
  checkUserExist,
  otpVerified,
  changeOtpVerifiedStatus,
  resetUser,
  acticateAccount,
} from "../../store/actions/common";

setTranslationsGetter(bannerLang);


const options = [
  { value: "Banglore", label: "Banglore" },
  { value: "Mysore", label: "Mysore" },
  { value: "SilkBoard", label: "SilkBoard" },
];
const weightoptions = [
  { value: "Bags", label: "Bags" },
  { value: "Kgs", label: "Kgs" },
  { value: "Litres", label: "Litres" },
  { value: "Packs", label: "Packs" },
  { value: "Pieces", label: "Pieces" },
  { value: "Tons", label: "Tons" },
];
const teloptions = [
  { value: "+91", label: "+91" }
];

const individualselect = {
  menuList: base => ({
    ...base,
    maxHeight: "178px" // your desired height
}),
  option: () => ({
    color: "red",
    fontFamily: "OpenSans-Regular",
    fontSize: "14px",
    lineHeight: "23px",
    color: "#2B2C33",
    padding: " 8px",
    cursor: "pointer",
    textTransform: "capitalize",
  }),
  singleValue: (provided, state) => {
    const fontFamily = "OpenSans-Regular";
    const fontSize = "14px";
    const lineHeight = "23px";
    const color = "#16181D";
    const cursor = "pointer";
    // const backgroundImage = `url(${arrow})`;
    // const backgroundRepeat = "no-repeat !important";
    // const backgroundPosition = "90% !important";
    const width = "80%";
    const textTransform = "capitalize";

    return {
      ...provided,
      width,
      fontFamily,
      fontSize,
      lineHeight,
      color,
      cursor,
      // backgroundImage,
      // backgroundRepeat,
      // backgroundPosition,
      textTransform,
    };
  },
  control: () => ({
    // none of react-select's styles are passed to <Control />
    height: "48px",
    height: "48px",
    fontFamily: "OpenSans-Regular",
    fontSize: "14px",
    lineHeight: "10px",
    border: "1px solid #ADB7BA",
    borderRadius: "4px",
    background: "#fff",
    opacity: ".46",
  }),
};
const customStyles = {
  option: () => ({
    color: "red",
    fontFamily: "OpenSans-Regular",
    fontSize: "14px",
    lineHeight: "23px",
    color: "#2B2C33",
    padding: " 8px",
    cursor: "pointer",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const width = "100%";
    const fontFamily = "OpenSans-Regular";
    const fontSize = "14px";
    const lineHeight = "23px";
    const color = "#2B2C33";
    const cursor = "pointer";
    const backgroundColor = "#F2F2F2";
    const height = "36px";
    const display = "flex";
    const alignItems = "center";
    const justifyContent = "left";
    const border = " 1px solid #DEE2E4 ";
    const borderRadius = "4px";
    const padding = "12px";
    // const backgroundImage = `url(${arrow})`;
    // const backgroundRepeat = "no-repeat !important";
    // const backgroundPosition = "90% !important";

    return {
      ...provided,
      opacity,
      backgroundColor,
      // backgroundRepeat,
      // backgroundPosition,
      borderRadius,
      border,
      padding,
      transition,
      width,
      fontFamily,
      fontSize,
      lineHeight,
      color,
      cursor,
      // backgroundImage,
      height,
      display,
      alignItems,
      justifyContent,
    };
  },
};

export class RequirmentForm extends Component {
  state = {
    weight: weightoptions[0],
    tel: teloptions[0],
    location: "", // this.props.cities[0],
    product: "",
    quantity: "",
    name: (this.props.buyer && this.props.buyer.name) || "",
    mobile:
      (this.props.buyer && this.props.buyer.mobile) || this.props.mobile || "",
    email: (this.props.buyer && this.props.buyer.email) || "",
    submitted: false,
    error: false,
    exist: false,
    errors: {
      product: "",
      email: "",
      mobile: "",
      name: "",
      location: "",
    },
    step1: false,
    step2: false,
    numbererror: "",
    otperror: "",
    otp: "",
    isMultiRfp: false,
  };

  onChange = (key, value) => {
    switch (key) {
      case "product": {
        this.setState({
          product: value,
          "errors.product": "",
        });
        break;
      }
      case "quantity": {
        const regex = /^[0-9]*$/;
        this.setState({
          quantity: regex.test(value) ? value : this.state.quantity,
          // "errors.product": ""
        });
        break;
      }
      case "weight": {
        this.setState({
          weight: value,
        });
        break;
      }
      case "name": {
        const regex = /^[a-zA-Z0-9 ]*$/gm;
        this.setState({
          name: regex.test(value) ? value : this.state.name,
          "errors.name": "",
        });
        break;
      }
      case "countryCode": {
        this.setState({
          tel: value,
        });
        break;
      }
      case "mobile": {
        const regex = /[ `a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const condition = regex.test(value);
        if (value.length <= 10)
          this.setState({
            mobile: !condition ? value : this.state.mobile || "",
            "errors.mobile": "",
          });
        break;
      }
      case "email": {
        this.setState({
          email: value,
          "errors.email": "",
        });
        break;
      }
      case "location": {
        this.setState({
          location: value,
          "errors.location": "",
        });
        break;
      }
      default:;
      
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.buyer && nextProps.buyer !== this.props.buyer) {
      this.setState({
        name: (nextProps.buyer && nextProps.buyer.name) || this.state.name,
        mobile:
          (nextProps.buyer && nextProps.buyer.mobile) || this.state.mobile,
        email: (nextProps.buyer && nextProps.buyer.email) || this.state.email,
      });
      return true;
    }
    if (
      nextProps.getProducts &&
      this.props.getProducts &&
      nextProps.getProducts.length !== this.props.getProducts &&
      nextProps.getProducts.length === 1 &&
      this.props.getProducts.length !== 1
    ) {
      const { getProducts } = nextProps;
      this.setState({
        product:
          getProducts.length === 1
            ? {
              label: getProducts[0]["_source"]["name"],
              value: getProducts[0]["_source"]["id"],
              ...getProducts[0]["_source"],
            }
            : this.state.product,
        exist: true,
      });
      return true;
    }
    return true;
  }

  validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobileRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const quantityRegx = /[0-9]/;
    const productRegex = /^[A-Za-z]+[\s&()0-9A-Za-z]*?$/i;
    const nameRegex = /^[a-zA-Z0-9 ]*$/gm;
    if (!values.email) {
      errors.email = "email cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "invalid email format";
    } else if (values.email && regex.test(values.email)) errors.email = "";
    if (!values.product) {
      errors.product = "product cannot be blank";
      // } else if (!productRegex.test(values.product) && values.product.length !== 0) {
    } else if (!values.product) {
      errors.product = "invalid product name";
    } else if (values.product) {
      errors.product = "";
    }
    if (this.props.hasAccess === false && !values.mobile) {
      errors.mobile = "mobile number cannot be blank";
    } else if (!mobileRegx.test(values.mobile) && values.mobile.length !== 0) {
      errors.mobile = "invalid mobile number";
    } else if (
      this.props.hasAccess === false &&
      values.mobile &&
      mobileRegx.test(values.mobile) &&
      values.mobile.length !== 0
    )
      errors.mobile = "";
    if (!quantityRegx.test(values.quantity)) {
      errors.quantity = "Quantity is required ";
    }
    if (quantityRegx.test(values.quantity)) {
      errors.quantity = "";
    }
    if (!values.name) {
      errors.name = "name is required";
    } else if (!nameRegex.test(values.name) && values.name.length !== 0) {
      errors.name = "invalid name";
    } else if (values.name) {
      errors.name = "";
    }
    if (!values.location) errors.location = "Please Select Location";
    if (values.location) errors.location = "";
    return errors;
  };

  validateLogin = async (e) => {
    e.preventDefault();
    await this.setState({ errors: this.validate(this.state) });

    const {
      name,
      email,
      product,
      quantity,
      weight,
      location,
      tel,
      errors,
      error,
    } = this.state;
    const mobile =
      (this.state && this.state.mobile) || (this.props && this.props.mobile);

    const _location = location && location.value.split(",");
    const city = _location && _location[0];
    const state = _location && _location[1];
    if (
      name &&
      mobile &&
      email &&
      product &&
      quantity &&
      Object.values(this.state.errors).filter(Boolean).length === 0
    ) {
      if (!this.props.hasAccess) {
        this.props.actions.checkUserExist({ mobile, rfp: true });
        this.setState({
          isMultiRfp: true,
        });
      }
    }
  };

  multiRfpSubmit = (e) => {
    // e.preventDefault();

    const {
      name,
      email,
      product,
      quantity,
      weight,
      location,
      tel,
      errors,
      error,
    } = this.state;
    const mobile =
      (this.state && this.state.mobile) || (this.props && this.props.mobile);
    this.setState({
      submitted: false,
    });
    const _location = location && location.value.split(",");
    const city = _location && _location[0];
    const state = _location && _location[1];
    if (
      name &&
      mobile &&
      email &&
      product &&
      quantity &&
      Object.values(this.state.errors).filter(Boolean).length === 0
    ) {
      const postData = {
        name,
        email,
        mobile: {
          countryCode: tel.value || "+91",
          mobile,
        },
        location: {
          city: city,
          state: state,
        },
        productDetails: {
          name: product,
          quantity,
          weight: weight.value,
        },
        requestType: this.props.requestType || 2,
        sellerId: this.props.sellerId || null,
      };
      this.props.actions.postRFP(postData);
      this.setState({
        submitted: true,
      });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { hasAccess, buyer } = this.props;
    if (
      hasAccess &&
      buyer &&
      buyer.deactivateAccount &&
      buyer.deactivateAccount.status
    ) {
      this.props.actions.acticateAccount(true);
    } else {
      await this.setState({ errors: this.validate(this.state) });

      const {
        name,
        email,
        product,
        quantity,
        weight,
        location,
        tel,
        errors,
        error,
      } = this.state;
      const mobile =
        (this.state && this.state.mobile) || (this.props && this.props.mobile);
      this.setState(
        {
          submitted: false,
        },
        () => {
          const _location = location && location.value.split(",");
          const city = _location && _location[0];
          const state = _location && _location[1];
          if (
            name &&
            mobile &&
            email &&
            product &&
            quantity &&
            Object.values(this.state.errors).filter(Boolean).length === 0
          ) {
            const postData = {
              name,
              email,
              mobile: {
                countryCode: tel.value || "+91",
                mobile,
              },
              location: {
                city: city,
                state: state,
              },
              productDetails: {
                name: product,
                quantity,
                weight: weight.value,
              },
              requestType: this.props.requestType || 2,
              sellerId: this.props.sellerId || null,
            };
            this.props.actions.postRFP(postData);
            this.setState({
              submitted: true,
            });
          }
        }
      );
    }
  };

  getRelavent = (val, key) => {
    const { product, sellerId } = this.props;
    let query = {
      limit: 50,
      search: val,
    };
    switch (key) {
      case "cityId":
        this.props.actions.getAllCities(query);
        break;

      case "product":
        let query1 = {
          product: true,
          skip: 0,
          limit: 50,
          search: val,
          sellerId: (!product && sellerId) || "",
          restrictl1: true
        };
        this.props.actions.searchQuery(query1);
        break;

      default:
        break;
    }
  };

  closePortal = () => {
    this.setState({
      step1: false,
      step2: false,
      isMultiRfp: false,
    });
    this.props.actions.resetUser();
    this.props.actions.changeOtpVerifiedStatus();
  };

  handleActivationRequest = () => {
    history.push(account);
    this.props.actions.acticateAccount(false);
  };

  submitHome = () => {
    history.push('/');
    this.setState(
      {
        location: "", 
        product: "",
        quantity: "",
        submitted: false,
      }
    );
  }

  render() {
    const { location, weight, tel, product, quantity, step1, step2, exist } =
      this.state;
    const { cities, getProducts, hasAccess, isSingleRfp, buyer } = this.props; // isSingleRfp sending from RfpPopup
    let filteredProducts =
      (getProducts &&
        getProducts.length &&
        getProducts.map((prod) => getSuggestionDataStruct(prod))) ||
      [];
    if (exist) filteredProducts = [product] || filteredProducts;
    const width = window.screen.width;

    return (
      <div
        className="RequirmentForm"
        style={(this.props.zindex && { zIndex: "unset" }) || {}}
      >
        {(this.props.isAccountActivate && (
          <Portal show logout>
            <ReactivateAccount
              handleReActivation={this.handleActivationRequest}
              name="Buyer"
            />
          </Portal>
        )) ||
          null}
        <Conatiner>
          <div className="info-image">
            <h4>{translate('application.glbMrketTitle')}</h4>
            <p>{translate('application.glbMrketBody')}</p>
            <ul>
              <li>
                <span className="count">{translate('application.activeSupplierCount')}</span>
                <span className="role">{translate('application.activeSupplier')}</span>
              </li>
              <li>
                <span className="count">{translate('application.countriesCount')}</span>
                <span className="role">{translate('application.countries')}</span>
              </li>
              <li>
                <span className="count">{translate('application.categoriesCount')}</span>
                <span className="role">{translate('application.categories')}</span>
              </li>
              <li>
                <span className="count">{translate('application.languagesCount')}</span>
                <span className="role">{translate('application.languages')}</span>
              </li>
            </ul>
          </div>
          <div className="requirment">
            {this.state.submitted && !this.state.error ? (
              <>
                {this.props.form ? (
                  <RFPstepFour submitHome={this.submitHome} from={true} page={true} step4={true} />
                ) : (
                  <RFPPopup
                    closePortal={
                      this.props.closePortal
                        ? this.props.closePortal
                        : this.closePortal
                    }
                    title="Message Sent"
                    page={true}
                    step4={true}
                  />
                )}
              </>
            ) : (
              <>
                <h2>{this.props.title}</h2>
                <p>
                  {/* An easy way to send buying requests to suppliers and getting
                  quotes quickly. */}
                  {this.props.bodycopy}
                </p>
                <Form
                  formclass="client-info"
                  // submitname={width < 768 ? "Submit " : "Submit Requirement"}
                  submitname="Submit Requirement"
                  onClick={
                    isSingleRfp || hasAccess
                      ? this.onSubmit
                      : this.validateLogin
                  }
                  multi={false}
                  submit={true}
                >
                  <div className="cities" style={{ width: "48%" }}>
                    <Select
                      value={product}
                      onChange={(value) => this.onChange("product", value)}
                      options={filteredProducts}
                      className="custom-city"
                      isSearchable={true}
                      styles={individualselect}
                      classNamePrefix="location-select"
                      // placeholder="Product/Service Name"
                      placeholder="Product name*"
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      onInputChange={(value) =>
                        this.getRelavent(value, "product")
                      }
                    />
                    <span
                      style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: "10px",
                        lineHeight: "10px",
                        color: "red",
                        textTransform: "capitalize",
                      }}
                    >
                      {this.state.errors && this.state.errors.product}
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholdertext="Quantity"
                    value={quantity}
                    onChange={(value) => this.onChange("quantity", value)}
                    error={
                      this.state.errors && this.state.errors.quantity
                        ? this.state.errors.quantity
                        : ""
                    }
                  >
                    <Select
                      styles={customStyles}
                      value={weight}
                      onChange={(value) => this.onChange("weight", value)}
                      className="Quantity-container"
                      options={weightoptions}
                      classNamePrefix="custom-select"
                      isSearchable={false}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Input>
                  <Input
                    type="text"
                    placeholdertext="Buyer’s name"
                    id="name"
                    value={this.state.name}
                    style={
                      this.props.hasAccess
                        ? {
                          pointerEvents: "none",
                          userSelect: "none",
                          background: "#f6f6f6",
                          color: '#000'
                        }
                        : {}
                    }
                    onChange={(value) => this.onChange("name", value)}
                    error={(this.state.errors && this.state.errors.name) || ""}
                    tabIndex={"-1"}
                  />
                  <Input
                    style={
                      this.props.hasAccess
                        ? {
                          pointerEvents: "none",
                          userSelect: "none",
                          background: "#f6f6f6",
                          color: '#000'
                        }
                        : {}
                    }
                    type="tel"
                    placeholdertext="Mobile number*"
                    id="contact-no"
                    value={this.state.mobile}
                    onChange={(value) => this.onChange("mobile", value)}
                    maxLength={10}
                    tabIndex={"-1"}
                    error={
                      this.state.errors && this.state.errors.mobile
                        ? this.state.errors.mobile
                        : ""
                    }
                  >
                    <Select
                      styles={customStyles}
                      value={tel}
                      onChange={(value) => this.onChange("countryCode", value)}
                      options={teloptions}
                      className="tel-container"
                      isSearchable={false}
                      classNamePrefix="custom-select"
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Input>
                  <div className="cities" style={{ width: "48%" }}>
                    <Select
                      value={location}
                      onChange={(value) => this.onChange("location", value)}
                      options={cities}
                      className="custom-city"
                      isSearchable={true}
                      styles={individualselect}
                      classNamePrefix="location-select"
                      placeholder="Location"
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      onInputChange={(value) =>
                        this.getRelavent(value, "cityId")
                      }
                    />
                    <span
                      style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: "10px",
                        lineHeight: "10px",
                        color: "red",
                        textTransform: "capitalize",
                      }}
                    >
                      {this.state.errors && this.state.errors.location}
                    </span>
                  </div>
                  <Input
                    type="email"
                    style={
                      this.props.hasAccess && buyer && buyer.email
                        ? {
                          pointerEvents: "none",
                          userSelect: "none",
                          backgroundColor: '#f6f6f6'
                        }
                        : {}
                    }
                    placeholdertext="Email ID"
                    value={this.state.email}
                    onChange={(value) => this.onChange("email", value)}
                    tabIndex={"-1"}
                    error={
                      this.state.errors && this.state.errors.email
                        ? this.state.errors.email
                        : ""
                    }
                  ></Input>
                </Form>
              </>
            )}
          </div>
        </Conatiner>
        {this.state.isMultiRfp && (
          <RFPPopup
            title="Contact Seller"
            closePortal={this.closePortal}
            requestType={2}
            isMultiRfp={true}
            submitRfp={this.multiRfpSubmit}
            multiMobile={this.state.mobile}
            multiCountryCode={this.state.tel}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    const { product, sellerId, oneToOne } = this.props;
    const query = {
      skip: 0,
      limit: 50,
      search: (product && product.label) || "",
      sellerId: (!product && sellerId) || "",
      productId: (product && product.value) || "",
      oneToOne,
      restrictl1: true
    };
    this.props.actions.searchQuery(query);
    // document.body.classList.add('sold');
  }
}

const mapStateToProps = (state) => ({
  buyer: state.common.user.buyer,
  cities: state.location.cities.cities,
  hasAccess: state.app.auth,
  getProducts: state.search.products.product,
  otp: state.common.verify.otp,
  otpVerified: state.common.otpVerified,
  isAccountActivate: state.common.acticateAccount,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      postRFP,
      getAllCities,
      searchQuery,
      sendOtp,
      changeOtpVerifiedStatus,
      otpVerified,
      checkUserExist,
      resetUser,
      acticateAccount,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequirmentForm);
