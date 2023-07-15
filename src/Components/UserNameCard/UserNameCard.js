import React, { Component } from "react";
import { Link } from "react-router-dom";
import user from "../../Assets/Images/user.svg";
import { connect } from "react-redux";
import './UserNameCard.scss'
class UserNameCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const name =
      (this.props.buyer &&
        this.props.buyer.name &&
        this.props.buyer.name.split(" ")) ||
      "";
    return (
<>
        {console.log("Hari" + this.myElement)}
        <div className="UserNameCard" onClick={this.props.onClick} >
          <Link style={{ cursor: "none" }} onClick={this.props.handleClosemobSidebar}>
            <div className="img">
              <img src={user} />
            </div>
            <div>
              <div className="info" style={{ display: "flex" }}>
                <p>
                  Hi
                </p>
                <h1> {`,  ${name && name.length && name[0] || ""}`}</h1>
              </div>
              {this.props.userType === "seller" && this.props.mobile ? <span className="user-role">{`(${this.props.seller && this.props.seller.sellerType && this.props.seller.sellerType.length && this.props.seller.sellerType[0] && this.props.seller.sellerType[0].name || ""})`}</span> : ''}
            </div>
          </Link>
        </div>
</>
    );
  }
}

const mapStateToProps = (state) => ({
  userType: state.common.userType,
  seller: state.common.user.seller,
});
export default connect(mapStateToProps, null)(UserNameCard);