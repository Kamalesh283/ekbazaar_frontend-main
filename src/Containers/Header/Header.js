/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Primarynav from '../Primarynav/Primarynav'
import Seconadrynav from '../Seconadrynav/Seconadrynav'
//import Browseby from '../../Components/Browseby/Browseby'
import './Header.scss'
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop'
import { getAllCategories, getCategory, getSpecificCategories } from '../../store/actions/categories'
import SelectYourLang from '../../Components/SelectYourLang/SelectYourLang'
import { setSiteLanguage } from '../../store/actions/app'
class Header extends Component {

  state = {
    isTop: true
  }

  categoryAction = (id) => {
    this.props.actions.getCategory(id)
  }

  get = () => {
    this.props.actions.getSpecificCategories()
    this.props.actions.getAllCategories()
  }

  componentDidMount() {
    this.get()
    document.addEventListener('scroll', () => {

      const isTop = window.scrollY < 200
      if (isTop !== this.state.isTop) {

        this.setState({
          isTop
        })

      }

    })

    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
      if (screen.width < 400) {
      document.addEventListener('scroll', () => {
        const isTop = window.scrollY < 300
        if (isTop !== this.state.isTop) {
          this.setState({
            isTop
          })
        }
      })
    }
    }

  }

  setSiteLanguageAction  = (data) => {
    this.props.actions.setSiteLanguage(data)
  }

  render() {
    const name =
      (this.props.buyer &&
        this.props.buyer.name &&
        this.props.buyer.name.split(" ")) ||
      "";
      
    return (
      <div
        className="Header"
        id={this.state.isTop || (this.props.hasAccess ?? name != "") ? 'not-active-head' : 'active-head'}
      >
        <ScrollToTop>
          <Primarynav />
          { <Seconadrynav signedin={true} menus={this.props.categories} categoryAction={this.categoryAction} /> }
          {/* <Browseby menus={this.props.categories} all={this.props.allCategories} categoryAction={this.categoryAction} />*/ }
          <SelectYourLang lang={this.props.siteLang} setSiteLanguageAction={this.setSiteLanguageAction}/>
        </ScrollToTop>
      </div>
    )

  }

}

const mapStateToProps = (state) => ({
  // categories: state.categories.categories.category
  categories: state.categories.specificCategories.category,
  allCategories: state.categories.categories.category,
  siteLang: state.app.siteLanguage,
  hasAccess: state.app.auth,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getSpecificCategories,
      getAllCategories,
      getCategory,
      setSiteLanguage
    },
    dispatch
  )
})

Header.propTypes = {
  actions: PropTypes.object,
  categories: PropTypes.array,
}

// export default Header
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
