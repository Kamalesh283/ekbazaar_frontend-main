import React, { Component } from 'react'
import Portal from '../../Containers/Portal/Portal'
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import {
  sendOtp,
  setOtp,
  otpVerified,
  changeOtpVerifiedStatus,
  resetUser,
  acticateAccount
} from "../../store/actions/common";

import RFPPopup from '../../Containers/RFPPopup/RFPPopup'
import ReactivateAccount from "../../Containers/ReActivateAccount/ReActivateAccount"
import { account } from "../../Routes/path";
import history from "../../Routes/history"
class RFP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRfp: false,
      mobile: "",
      countryCode: { value: '+91', label: '+91' },
      otp: "",
      submitted: false,
      step1: false,
      step2: false,
      step3: false,
      numbererror: "",
      otperror: ""
    }
  }
  onChangeMobile = (value) => {
    this.setState({
      mobile: value,
      submitted: false
    });
  };

  onChangeCode = (value) => {
    this.setState({
      countryCode: { ...value },
      submitted: false
    });
  }
  onChangeOtp = (value) => {
    this.setState({
      otp: value,
      submitted: false,
      otperror:""
    })
  }

  onSubmitMobile = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
    if (this.state.mobile && this.state.mobile.length === 10) {
      // Sending OTP here-------
      this.props.actions.sendOtp({
        mobile: this.state.mobile,
      });

      this.setState({
        submitted: false,
        step1: true
      });
    } else if (this.state.mobile === "") {
      this.setState({
        numbererror: "Mobile number required",
      });
    } else {
      this.setState({
        numbererror: "Please enter 10 digit valid mobile number",
      });
    }
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    // if (this.state.otp == this.props.otp) {
    if (this.state.otp > 999) {
      // this.props.actions.otpVerified();

      this.props.actions.sendOtp({
        reff: this.props.otp,
        verify: true,
        value: this.state.otp
      })
      this.setState({
        step2: true
      });
    } else {
      // this.props.actions.setAlert("danger", "Please enter valid otp")
      this.setState({
        otperror: "Please enter valid otp",
      });
    }
  };

  closePortal = () => {

    this.setState({
      showRfp: false,
    })
    this.props.actions.changeOtpVerifiedStatus()
    this.props.actions.resetUser()
  }

  checkForAccount = () => {
    const { hasAccess, buyer } = this.props
    if (hasAccess && buyer && buyer.deactivateAccount && buyer.deactivateAccount.status) {
      this.props.actions.acticateAccount(true)
    } else {
      this.setState({ showRfp: true })
    }
  }
  handleActivationRequest = () => {
    history.push(account)
    this.props.actions.acticateAccount(false)
  }

  render() {
    return (
      <>
        {this.props.isAccountActivate &&
          <Portal show logout >
            <ReactivateAccount
              handleReActivation={this.handleActivationRequest}
              name="Buyer"
            />
          </Portal> || null}
        <div className="RFP">
          <div className="Portal">
            <button className="modal-toggle"
              onClick={() => this.checkForAccount()}
            >
              <span>RFQ</span>
            </button>
          </div>
          {this.state.showRfp &&
            <RFPPopup title="One request, many quotes" closePortal={this.closePortal} />
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  otp: state.common.verify.otp,
  otpVerified: state.common.otpVerified,
  hasAccess: state.app.auth,
  buyer: state.common.user.buyer,
  isAccountActivate: state.common.acticateAccount,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      sendOtp,
      setOtp,
      otpVerified,
      changeOtpVerifiedStatus,
      resetUser,
      acticateAccount
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RFP)
