import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Conatiner from '../Conatiner/Conatiner'
import './Browseby.scss'
import {
  categoryPath
} from '../../Routes/path'
import MegaMenu from '../MegaMenu/MegaMenu'
import history from '../../Routes/history'
import { browseByCategories } from '../../utils/utils'

import { translate, localize } from 'react-i18nify';
import { bannerLang } from '../../utils/languages/home'
import { setTranslationsGetter } from 'react-i18nify';
import classNames from 'classnames'
import { setSearchKeyword } from '../../store/actions/categories'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { stringify } from 'query-string'

setTranslationsGetter(bannerLang);

class Browseby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      megamenu: false
    }
  }


  megaMenuHandler = () => {
    this.setState({
      megamenu: !this.state.megamenu
    })


  }

  closeHandler = () => {
    this.setState({
      megamenu: false
    })

  }

  getCategoryStructure = (allcategory) => {
    let { menus, all } = this.props
    if (allcategory)
      menus = all
    const category = menus && menus.length > 0 ? menus.slice(0, 10).map((cat) => {

      return (
        {
          header: cat.name,
          id: cat._id,
          products: cat.primaryCategotyId && cat.primaryCategotyId.length > 0 ? cat.primaryCategotyId.slice(0, 6).map((pri) => {
            return ({
              title: pri.name,
              id: pri._id,
              subproduct: pri.secondaryCategotyId && pri.secondaryCategotyId.length > 0 ? pri.secondaryCategotyId.slice(0, 3).map((sec) => {
                return ({
                  name: sec.name,
                  id: sec._id
                })
              }) : []
            })
          }) : [],
        }
      )
    })
      : []

    return category
  }

  redirectCategory = (e, id, title) => {
    e.preventDefault()
    // this.props.categoryAction(id)
    // const elm = document.getElementById('handlerId').childNodes

    // for (let index = 0; index < elm.length; index++) {
    //   const element = elm[index].firstChild;
    //   element.classList.remove('active')
      
    // }
    // elm.map((e1) => console.log(e1.classList,"$$$$$$$$$$$$$$"))

  
    const validTitle = title.replace(/ /g, '-')
    const qs = stringify({
      ids: id,
      country_id: `${this.props.searchCountry.value}, ${this.props.searchCountry.label}`
    })
    console.log("🚀 ~ file: Browseby.js ~ line 85 ~ Browseby ~ qs", qs)
    
    history.push({
      // pathname: `${categoryPath}/${validTitle}/${id}`
      pathname: `${categoryPath}/${validTitle}`,
      id,
      search: qs
    })
    // e.target.classList.add('active')
    this.props.actions.setSearchKeyword(null)
  }
  render() {
    const { menus, all } = this.props
    return (
      <div className={classNames("Browseby")}>
        <Conatiner>
          <label className={classNames("notranslate")} style={{
            pointerEvents: 'none'
          }}>{translate('application.browse_by')}:</label>
          <ul className="handler" id='handlerId'>

            <li style={{ position: 'relative' }} onClick={() => this.megaMenuHandler()}>
              <a className={classNames("notranslate")} >{translate('application.all_categories')}</a>
              {/* {this.state.megamenu ?
                <>
                  <div onClick={() => this.closeHandler()} className="overlay"></div>
                  <MegaMenu parentRedirect={this.redirectCategory} data={all && all.length > 0 && this.getCategoryStructure("all")} />
                </>
                : ''
              } */}
            </li>
            {menus && menus.length > 0 && menus.slice(0, 5).map((cat, index) => {
              // {browseByCategories && browseByCategories.length > 0 && browseByCategories.map((cat, index) => {
              return (<li key={index}>
                <NavLink
                  to={cat.name.replace(/ /g, '-')}
                  onClick={(e) => this.redirectCategory(e, cat._id, cat.name)}
                  title={cat.name}
                  className={classNames("notranslate")}
                >
                  {/* {cat.name.replace(/,/g, ', ')} */}
                  {
                    cat.name && cat.name.includes('Food') ? translate('application.food') :
                      cat.name && cat.name.includes('Machinery') ? translate('application.machinery') :
                        cat.name && cat.name.includes('Consumables') ? translate('application.consumables') :
                          cat.name && cat.name.includes('Textiles') ? translate('application.textiles') :
                            translate('application.transportation')
                  }
                </NavLink>
              </li>)
            })
            }
          </ul>
          {this.state.megamenu ?
                <div onClick={() => this.megaMenuHandler()}>
                  <div onClick={() => this.closeHandler()} className="overlay"></div>
                  <MegaMenu parentRedirect={this.redirectCategory} data={all && all.length > 0 && this.getCategoryStructure("all")/* menu */} />
                </div>
                : ''
              }
        </Conatiner>
      </div>
    )

  }

}

const mapStateToProps = (state) => ({
  searchCountry: state.app.searchCountry,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSearchKeyword
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browseby);
