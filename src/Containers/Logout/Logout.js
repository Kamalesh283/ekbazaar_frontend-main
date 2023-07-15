import React, { Component } from "react";
import Button from "../../Components/Button/Button";
import Title from "../../Components/Title/Title";
import Portal from "../Portal/Portal";
import "./Logout.scss";
export default class Logout extends Component {
  render() {
    return (
      <div className="Logout">
        {this.props.model ? <Portal logout={true} name={this.props.children} btn="logout-btn" close={() => this.props.cancel(null)}>
          <div className="log-out-blk">
            <Title title="Logout" />

            <p>Are you sure want to logout</p>
            <div className="will">
              <Button value="yes" parentclass="execution" click={(e) => this.props.submit('logout')} />
              <Button value="No" parentclass="execution" click={() => {this.props.cancel(); this.props.overlay && this.props.overlay()}} />
            </div>
          </div>
        </Portal> : null}
      </div>
    );
  }
}
