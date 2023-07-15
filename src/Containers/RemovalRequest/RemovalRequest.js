import React, { Component } from "react";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";
import Title from "../../Components/Title/Title";
import "./RemovalRequest.scss";
import arrow from "../../Assets/Images/angledown.svg";
import { validateMobile, validateUrl, validateEmail } from "../../utils/utils"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { addRemoveListing } from "../../store/actions/removeListing"
import Select from "react-select";


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
    const backgroundImage = `url(${arrow})`;
    const backgroundRepeat = "no-repeat !important";
    const backgroundPosition = "90% !important";

    return {
      ...provided,
      opacity,
      backgroundColor,
      backgroundRepeat,
      backgroundPosition,
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
      backgroundImage,
      height,
      display,
      alignItems,
      justifyContent,
    };
  },
};
const teloptions = [
  { value: "+91", label: "+91" },
  // { value: "+92", label: "+92" },
  // { value: "+93", label: "+93" },
];
class RemovalRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      isSubmitted: false,
      removeList: {
        name: "",
        url: "",
        company: "",
        email: "",
        mobile: {
          mobile: "",
          countryCode: teloptions[0]
        },
        reason: ""
      }
    }
  }

  // handleChange = (key, value) => {
  //   const keyVal = key
  //   var tempObject = {};
  //   var container = tempObject;
  //   let Obj = keyVal.split('.').map((k, i, values) => {
  //     container = (container[k] = (i == values.length - 1 ? value : {}))
  //   });
  //   this.setState(prevState => ({
  //     submitted: false,
  //     removeList: {
  //       ...prevState.removeList,
  //        ...tempObject
  //     }
  //   }))
  // }

  handleChange(key, value) {
    switch (key) {
      case "name": {
        this.setState(prevState => ({
          removeList: {
            ...prevState.removeList,
            name: value
          }
        }))
        break
      }
      case "url": {
        this.setState(prevState => ({
          // isSubmitted: false,
          removeList: {
            ...prevState.removeList,
            url: value
          }
        }))
        break
      }
      case "company": {
        this.setState(prevState => ({
          // isSubmitted: false,
          removeList: {
            ...prevState.removeList,
            company: value
          }
        }))
        break
      }
      case "mobile": {
        this.setState(prevState => ({
          // isSubmitted: false,
          removeList: {
            ...prevState.removeList,
            mobile: {
              ...prevState.removeList.mobile,
              mobile: value
            }
          }
        }))
        break
      }
      case "countryCode": {
        this.setState(prevState => ({
          removeList: {
            ...prevState.removeList,
            mobile: {
              ...prevState.removeList.mobile,
              countryCode: value
            }
          }
        }))
        break
      }
      case "email": {
        this.setState(prevState => ({
          // isSubmitted: false,
          removeList: {
            ...prevState.removeList,
            email: value
          }
        }))
        break
      }
      case "reason": {
        this.setState(prevState => ({
          // isSubmitted: false,
          removeList: {
            ...prevState.removeList,
            reason: value
          }
        }))
        break
      }
      default: 
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.status !== this.props.status) {
      this.setState({ status: nextProps.status })
      return true
    }
    return true
  }
  formsubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true })
    const { company, mobile, reason, url, name, email } = this.state.removeList;
    let checkurl = url ? (url && validateUrl(url)) : true
    if (company && (mobile && mobile.mobile && validateMobile(mobile.mobile)) && (email && validateEmail(email)) && reason && checkurl && !this.props.loader) {
      let tempMyObj =(this.state.removeList);
      tempMyObj.mobile.countryCode = tempMyObj.mobile.countryCode.value;
      this.props.actions.addRemoveListing(tempMyObj);
    }
  };

  validate = (submitted, value, key) => {
    if (!submitted) return ""
    else {
      if (key === "company" && !value) {
        return 'Company name is a required field'
      }
      if (key === "mobile" && !value) {
        return 'Mobile Number is a required field'
      }
      if (key === "mobile" && (value && !validateMobile(value))) {
        return 'Invalid mobile'
      }
      if (key === "reason" && !value) {
        return 'This is a required field'
      }
      if (key === "url" && (value && !validateUrl(value))) {
        return 'Invalid URL'
      }
      if (key === "email" && !value) {
        return 'Email is a required field'
      }
      if (key === "email" && (value && !validateEmail(value))) {
        return 'Invalid email'
      }
    }
  }


  render() {
    if (this.state.status === true) {
      this.props.nextStep();
    }
    const { removeList, isSubmitted } = this.state
    return (
      <div className="RemovalRequest">
        <Title title="Remove my Listing" />
        <div className="module">
          <Form
            multi={true}
            submitname={this.props.loader ? 'Loading..': "Submit" }
            resetvalue="Cancel"
            reset={(e) => this.props.onCancel()}
            onClick={e => this.formsubmit(e)}
            onSubmit={e => this.formsubmit(e)}
            submitDisabled={this.props.loader ? true: false }
          >
            <Input placeholdertext="Company Name*" type="text"
              onChange={(value) => this.handleChange('company', value)}
              value={removeList && removeList.company}
              error={this.validate(isSubmitted, removeList.company, 'company')}
              autoFocus={true} />

            <Input placeholdertext="EK Bazaar URL" type="url"
              onChange={(value) => this.handleChange('url', value)}
              value={removeList && removeList.url}
              error={this.validate(isSubmitted, removeList.url, 'url')}
            />
            <Input placeholdertext="Contact Name" type="text"
              onChange={(value) => this.handleChange('name', value)}
              value={removeList && removeList.name}
              error={this.validate(isSubmitted, removeList.name, 'name')}
            />
            <Input
               placeholdertext="Mobile*" 
              type="tel"
              maxLength={10}
              onChange={(value) => this.handleChange('mobile', value)}
              value={removeList && removeList.mobile && removeList.mobile.mobile}
              error={this.validate(isSubmitted, removeList.mobile.mobile, 'mobile')}
            >
              <Select
                styles={customStyles}
                value={removeList && removeList.mobile && removeList.mobile.countryCode}
                onChange={(value) => this.handleChange("countryCode", value)}
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
            <Input placeholdertext="Email*" type="text" className={true}
              onChange={(value) => this.handleChange('email', value)}
              value={removeList && removeList.email}
              error={this.validate(isSubmitted, removeList.email, 'email')}
            />
            <textarea placeholder="Reason for Removal*" onChange={(value) => this.handleChange('reason', value.target.value)} value={removeList && removeList.reason} onKeyPress={e => {
              if (e.key === 'Enter') {

                e.preventDefault()
                this.formsubmit(e)
              }
            }} />
            <span className="error" style={{ float: "left" }}> {this.validate(isSubmitted, removeList.reason, 'reason')}</span>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  status: state.removeListing.removeListing.success,
  loader: state.removeListing.removeListing.pending
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      addRemoveListing
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RemovalRequest)
