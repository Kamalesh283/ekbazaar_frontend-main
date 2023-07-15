import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Conatiner.scss'

class Conatiner extends Component {

  render() {

    return <div className="conatiner" id={this.props.hasAccess? "hidetabs" : null} style={this.props.style} >{this.props.children}</div>

  }

}

Conatiner.propTypes = {
  children: PropTypes.node
}

export default Conatiner
