import React, { Component } from "react";
import { signin } from "../../Routes/path";
import { Link, NavLink } from "react-router-dom";
import { getAllProducts, setSearchKeyword } from '../../store/actions/categories'
import "./Signin.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { clear } from "../../store/actions/common";
// import history from '../../Routes/history'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
    }
  }
  clearData = () => {

    this.props.actions.setSearchKeyword(null)
    console.log(this.props, "PROPSSSS");
    this.props.actions.clear();
    if (this.state.width <= 1024 && this.props.handleClosemobSidebar) this.props.handleClosemobSidebar();

    // this.props.handleClosemobSidebar();
  };
  render() {
    return (
      <NavLink className="sign-in-btn" to={signin} onClick={()=> {
        this.clearData()
        // history.push(signin)
        }}>
        {" "}
        Sign In{" "}
      </NavLink>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToPRops = (dispatch) => ({
  actions: bindActionCreators(
    {
      clear,
      setSearchKeyword
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToPRops)(Signin);
