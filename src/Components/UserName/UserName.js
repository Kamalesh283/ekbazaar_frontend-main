import React, { Component } from "react";
import './UserName.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import MediaQuery from "react-responsive";
import iconic from '../../Assets/Images/profile_mob.svg'
export default class UserName extends Component {
  render() {
    const {seller, userType, buyer} = this.props
    const status = userType === "seller" 
                        ? seller && seller.sellerType && !seller.sellerType.length 
                          ? true 
                          : false
                        : buyer && !buyer.mobile 
                          ? true 
                          : false
    const name = this.props.buyer && this.props.buyer.name && this.props.buyer.name.split(" ") || ''
    return (
      <div className="UserName">
        <h4 onClick={this.props.onClick} style={status ? {pointerEvents: 'none',userSelect: 'none'} :{}}>
          <MediaQuery minDeviceWidth={993}>
            Hi<span className="comma">,</span> <span className="id">{name && name.length && name[0] && name[0].charAt(0).toUpperCase() + name[0].slice(1) || ""}</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </MediaQuery>

          <MediaQuery maxDeviceWidth={992}>
            <img src={iconic} />
          </MediaQuery>
        </h4>
      </div>
    );
  }
}
