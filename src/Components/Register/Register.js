/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { signup } from '../../Routes/path'
import { Link } from 'react-router-dom'
import './Register.scss'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setOtp, setMobile } from '../../store/actions/common'
// import Tooltip from "react-tooltip-lite";
import { Tooltip } from '@mui/material';
// import history from '../../Routes/history'


export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      btnClass: ''
    }

    this.myInput = React.createRef()

  }
  clearData = () => {
    this.props && this.props.clear && this.props.clear();
    this.props && this.props.clear && this.props.setSearchKeyword(null)

    if (this.state.width <= 1024) this.props.handleClosemobSidebar()

  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        btnClass: this.myInput.current.offsetWidth <= 117 ? "" : "trimText"
      })
    }, 10000);
  }

  render() {
    return (
      <a to={signup} onClick={() => {
        this.clearData()
        // history.push(signup)
      }} onTouchStart={() => {
        this.clearData()
        // history.push(signup)
      }}>
        {
          this.myInput && this.myInput.current && this.myInput.current.offsetWidth <= 117 ? (
            <button ref={this.myInput} className={`modal-toggle-button Register ${this.state.btnClass}`} > Register </button>
          ) : (
            <Tooltip className="target"
              title="Register"
              placement="right"
            >
              <button ref={this.myInput} className={`modal-toggle-button Register ${this.state.btnClass}`}> Register </button>
            </Tooltip>
          )
        }

      </a>

    )

  }

}