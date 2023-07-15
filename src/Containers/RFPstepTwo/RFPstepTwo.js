import React, { Component } from 'react'
import Title from '../../Components/Title/Title'
import OtpInput from 'react-otp-input';
import Button from '../../Components/Button/Button';
import './RFPstepTwo.scss'
// import OTPInput, { ResendOTP } from "otp-input-react";

export default class RFPstepTwo extends Component {
    // state = { otp: '' };
    // handleChange = otp => this.setState({ otp });
    // backHandler=(e)=>{
    //     e.preventDefault();
    //     this.props.previousStep()
    //   }
    //   tsHandler=(e)=>{
    //     e.preventDefault();
    //     this.props.nextStep()
    //   }
    render() {
        // if(this.props.currentStep === 2 && this.props.step2){
        //     this.props.nextStep()
        //   }
        return (
            <div className="RFPstepTwo">

                <Title title={this.props.title ? this.props.title : 'OTP Confirmation'} />

                <div className="Module">
                    <p>Enter the 4-digit OTP sent to  <span>{this.props.countryCode && this.props.countryCode + "-"}{this.props.mobile && this.props.mobile}</span></p>
                    <OtpInput
                        className="otp"
                        value={this.props.otp}
                        onChange={this.props.onChange}
                        numInputs={4}
                        separator={false}
                        isInputSecure={true}
                    >
                    </OtpInput>
                    {/* <OTPInput
                        className="otp"
                        value={this.props.otp}
                        onChange={this.props.onChange}
                        autoFocus
                        OTPLength={4}
                        otpType="number"
                        disabled={false}
                        secure
                    /> */}
                    {this.props.errormsg ? <span className="error" style={{ color: "red" }} > {this.props.errormsg}</span> : ''}
                    <Button
                        parentclass="fetching-data"
                        value="Submit"
                        click={e => this.props.onSubmit(e)}
                    // click={e=>this.tsHandler(e)}
                    />
                    <span className="resend">Didn’t receive OTP? <a style={!this.props.resendOtpStatus ? { cursor: 'default' } : { cursor: 'pointer' }} onClick={() => this.props.resendOtp()}>Resend OTP</a></span>
                </div>
            </div>
        )
    }
}
