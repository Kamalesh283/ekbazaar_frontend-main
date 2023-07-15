import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import Portal from '../../Containers/Portal/Portal'
import RFPStepOne from "../../Containers/RFPstepOne/RFPstepOne";
import RFPPassword from "../RFPStepPassword/RFPStepPassword"
import RFPstepTwo from '../../Containers/RFPstepTwo/RFPstepTwo';
import RFPstepThree from '../../Containers/RFPstepThree/RFPstepThree'
import {
    sendOtp,
    setOtp,
    otpVerified,
    changeOtpVerifiedStatus,
    rfpLogin,
    resetUser
} from "../../store/actions/common";
import { resendOtpCount,validateMobile } from '../../utils/utils'
import RFPstepFour from '../RFPstepFour/RFPstepFour';
import Loading from "../../Components/Loading/Loading"
let count = 1
class RFPPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isClick: false,
            mobile: props.multiMobile && props.multiMobile || "",
            countryCode: props.multiCountryCode && props.multiCountryCode || { value: '+91', label: '+91' },
            password: "",
            otp: "",
            submitted: false,
            step1: false,
            step2: false,
            step3: false,
            numbererror: "",
            otperror: "",
            resendOtp: 0,
            resendOtpStatus: true,
            rfpPassword: false,
            passwordError: ""
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

    onSubmitMobile = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true,
        });
        if (this.state.mobile && validateMobile(this.state.mobile)) {
            // Sending OTP Here--------
            this.props.actions.sendOtp({
                mobile: this.state.mobile,
                rfp: true
            });

            this.setState({
                submitted: false,
                step1: true
            });
        } 
        // else if (this.state.mobile === "") {
        //     this.setState({
        //         numbererror: "Mobile number required",
        //     });
        // } else {
        //     this.setState({
        //         numbererror: "Please enter 10 digit valid mobile number",
        //     });
        // }
    };
    onPressEnterMob = (e) => {
        if (e.key === 'Enter'){
            this.onSubmitMobile(e)
        }
    }

    onChangePassword = (password) => {
        this.setState({
            passwordError: "",
            password
        })
    }

    onSubmitPassword = (e) => {
        e.preventDefault()
        const { mobile, password } = this.state
        if (password && password.trim().length) {
            if (this.props.isMultiRfp) {
                count++
                this.setState({
                    rfpPassword: true
                })
                this.props.actions.rfpLogin({ mobile, password, remember: false, userType: "buyer" })
                // this.props.submitRfp(e)
                // this.props.closePortal()
            } else
                this.props.actions.rfpLogin({ mobile, password, remember: false, userType: "buyer" })
        } else {
            this.setState({
                passwordError: "Password is Required"
            })
        }

    }
    onPressEnterPass = (e) => {
        if(e.key === 'Enter'){
            this.onSubmitPassword(e);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps && nextProps.success && this.props.success !== nextProps.success) {
            if (this.props.isMultiRfp) {
                count++
                this.setState({
                    rfpPassword: true
                })
                // this.props.actions.rfpLogin({ mobile, password, remember: false, userType: "buyer" })
                this.props.submitRfp()
                this.props.closePortal()
            }
        } else if(nextProps && nextProps.loginErrorMessage && nextProps.loginErrorMessage !== this.props.loginErrorMessage) {
            this.setState({
                passwordError: nextProps.loginErrorMessage
            })
            this.props.actions.resetUser({set: true})
            return true
        } 
        return true
    }
    

    onChangeOtp = (value) => {
        this.setState({
            otp: value,
            submitted: false,
            otperror: ""
        })
    }

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
            if (this.props.isMultiRfp) {
                count++
                this.props.submitRfp(e)
                this.props.closePortal()
            }
        } else {
            // this.props.actions.setAlert("danger", "Please enter valid otp")
            this.setState({
                otperror: "Please enter valid otp",
            });
        }
    };

    closePortal = () => {

        this.setState({
            mobile: '',
            otp: ''
        })
        this.props.closePortal()
    }

    resendOtp = () => {
        if (this.state.resendOtp < resendOtpCount) {

            if (this.state.mobile && this.state.mobile.length === 10) {
                this.setState({
                    resendOtp: this.state.resendOtp + 1,
                    resendOtpStatus: this.state.resendOtp === (resendOtpCount - 1) ? false : true
                })
                // Sending OTP Here-----------------
                this.props.actions.sendOtp({
                    mobile: this.state.mobile,
                });

            }

        } else {

        }
    }

    validate = (submitted, value, key ) => {
        if (!submitted) return ""
        else {
            if (key === "mobile" && !value) {
                return 'Mobile number is a required field'
            }
            if (key === "mobile" && value && !validateMobile(value)) {
                return 'Invalid mobile number' 
            }
        }
    }

    render() {
        const { requestType, step4, isMultiRfp, multiMobile, multiCountryCode, loader } = this.props
        return (
            <div className="RegisterPopup">
                {loader && <Loading /> ||
                <Portal logout close={() => this.props.closePortal()}>
                    {!this.props.hasAccess && !this.props.otp && !step4 && !this.props.userExist
                        && <RFPStepOne
                            mobile={this.state.mobile}
                            countryCode={this.state.countryCode}
                            onChangeMobile={this.onChangeMobile}
                            onChangeCode={this.onChangeCode}
                            onPressEnter={this.onPressEnterMob}
                            onSubmit={this.onSubmitMobile}
                            otp={this.props.otp}
                            errormsg={this.state.numbererror}
                            submitted={this.state.submitted}
                            step1={this.state.step1}
                            validate={this.validate}
                        /> || null}
                    {this.props.errorMessage && !this.props.hasAccess && this.props.userExist &&
                        <RFPPassword
                            password={this.state.password}
                            onChange={this.onChangePassword}
                            onPressEnter={this.onPressEnterPass}
                            onSubmit={this.onSubmitPassword}
                            errormsg={this.state.numbererror}
                            submitted={this.state.submitted}
                            passwordError={this.state.passwordError}
                        /> || null
                    }
                    {!this.props.hasAccess && this.props.otp && !this.props.otpVerified && !step4 &&
                        <RFPstepTwo
                            mobile={this.state.mobile}
                            countryCode={this.state.countryCode.value}
                            otp={this.state.otp}
                            onChange={this.onChangeOtp}
                            onSubmit={this.onSubmitOtp}
                            errormsg={this.state.otperror}
                            step2={this.state.step2}
                            resendOtp={this.resendOtp}
                            resendOtpStatus={this.state.resendOtpStatus}
                        /> || null}
                    {((!isMultiRfp && !this.props.hasAccess && this.props.otpVerified) || (this.props.hasAccess && !this.state.rfpPassword)) && !step4 &&
                        <RFPstepThree oneToOne={this.props.oneToOne} bodycopy={this.props.bodycopy} product={this.props.product} title={this.props.title} requestType={requestType || null} sellerId={this.props.sellerId} mobile={this.state.mobile} closePortal={this.props.closePortal} isSingleRfp={true} /> || null}
                    {step4 && !isMultiRfp ? <RFPstepFour /> : ""}
                </Portal>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    otp: state.common.verify.otp,
    otpVerified: state.common.otpVerified,
    hasAccess: state.app.auth,
    errorMessage: state.common.verify.errorMessage,
    userExist: state.common.userExist,
    loginErrorMessage: state.common.loginErrorMessage,
    success: state.common.success,
    loader: state.common.pending
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            rfpLogin,
            sendOtp,
            setOtp,
            otpVerified,
            changeOtpVerifiedStatus,
            resetUser
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RFPPopup)