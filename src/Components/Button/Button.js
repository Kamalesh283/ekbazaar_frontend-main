import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Button extends Component {

  render() {

    return (
      <div style={this.props.parent} className={this.props.parentclass} id={this.props.id} /*  onClick={this.props.click} */>
        <button
          disabled={this.props.disabled}
          value={this.props.value}
          onClick={this.props.click}
          className={this.props.class}
        >

          {this.props.children}
          {this.props.value}
        </button>
      </div>
    )

  }

}
Button.propTypes = {
  style: PropTypes.object,
  parent: PropTypes.object,
  disabled: PropTypes.string,
  value: PropTypes.any,
  click: PropTypes.func,
  class: PropTypes.string,
  favorite: PropTypes.bool
}
