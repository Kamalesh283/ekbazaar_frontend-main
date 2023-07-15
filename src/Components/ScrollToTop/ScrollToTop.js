import { Component } from 'react'
// import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
class ScrollToTop extends Component {

  componentDidUpdate(prevProps) {

    if (this.props.location !== prevProps.location) {

      window.scrollTo({
        top: 0,
        left: 100,
        behavior: 'smooth'
      })

    }

  }

  render() {

    return this.props.children

  }

}
ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node
}

export default (ScrollToTop)
