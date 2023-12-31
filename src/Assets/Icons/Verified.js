import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Verified extends Component {

  render() {

    const { width, height } = this.props
    return (
      <div className={this.props.class}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" height={height ? height : '24px'} width={width ? width : '24px'} viewBox="0 0 100 125" enableBackground="new 0 0 100 100">
          <path d="M92.6,40.4l-1.9-1.3c-2.1-1.4-3-4.1-2.3-6.5l0.6-2.2c1-3.4-1.3-6.9-4.8-7.5l-2.3-0.4c-2.5-0.4-4.5-2.3-4.9-4.8l-0.4-2.3
                    c-0.6-3.5-4.1-5.7-7.5-4.7l-2.2,0.7c-2.4,0.7-5.1-0.2-6.5-2.2L59,7.2c-2.1-2.9-6.2-3.3-8.8-0.9l-1.7,1.6c-1.9,1.7-4.6,2.1-6.9,0.8
                    l-2-1.1c-3.1-1.7-7-0.3-8.4,3l-0.9,2.2c-0.9,2.4-3.3,3.9-5.8,3.7l-2.3-0.1c-3.6-0.2-6.5,2.8-6.2,6.3l0.2,2.3
                    c0.2,2.5-1.3,4.9-3.6,5.9l-2.1,0.9c-3.3,1.4-4.6,5.3-2.9,8.4l1.2,2c1.3,2.2,1,5-0.7,6.9l-1.5,1.7c-2.4,2.7-1.9,6.8,1.1,8.8l1.9,1.3
                    c2.1,1.4,3,4.1,2.3,6.5L11,69.7c-1,3.4,1.3,6.9,4.8,7.5l2.3,0.4c2.5,0.4,4.5,2.3,4.9,4.8l0.4,2.3c0.6,3.5,4.1,5.7,7.5,4.7l2.2-0.7
                    c2.4-0.7,5.1,0.2,6.5,2.2l1.4,1.9c2.1,2.9,6.2,3.3,8.8,0.9l1.7-1.6c1.9-1.7,4.6-2.1,6.9-0.8l2,1.1c3.1,1.7,7,0.3,8.4-3l0.9-2.2
                    c0.9-2.4,3.3-3.9,5.8-3.7l2.3,0.1c3.6,0.2,6.5-2.8,6.2-6.3L83.9,75c-0.2-2.5,1.3-4.9,3.6-5.9l2.1-0.9c3.3-1.4,4.6-5.3,2.9-8.4
                    l-1.2-2c-1.3-2.2-1-5,0.7-6.9l1.5-1.7C96,46.6,95.5,42.4,92.6,40.4z M52.7,59.3l-8.2,8.1l-8.1-8.2l-7.8-7.9l8.2-8.1l7.8,7.9
                    l18.7-18.6l8.1,8.2L52.7,59.3z" fill="green" />
        </svg>
      </div>
    )

  }

}
Verified.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}
