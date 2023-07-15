import React, { Component } from "react";
import "./RemoveListingPopup.scss";
import StepWizard from "react-step-wizard";
import RFPstepFour from "../RFPstepFour/RFPstepFour";
import RemovalRequest from "../RemovalRequest/RemovalRequest";
let custom = {
  transition: "none",
};
export default class RemoveListingPopup extends Component {
  componentDidMount() {
    document.body.classList.add("for-scroll-removal")
  }
  componentWillUnmount() {
    document.body.classList.remove("for-scroll-removal")
  }
  render() {
    return (
      <div className="RemoveListingPopup">
        <div className="Slide">
            
          {this.props.children}
          <StepWizard transitions={{custom}}>
            <RemovalRequest onCancel={this.props.onClick}/>
            <RFPstepFour onSubmit ={this.props.onSubmit} removal="Have a query? Fill up this form and we will get back to you soon"/>
          </StepWizard>
        </div>
        </div>
    );
  }
}
