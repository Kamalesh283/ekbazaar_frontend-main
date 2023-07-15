import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { NavLink, Link } from 'react-router-dom' 
import './WebSidebarleft.scss'
import {
  categoryPath,
  signup,
  signin,
  seller,
  myproduct,
  productinventory
} from '../../Routes/path'
import { setUserType } from '../../store/actions/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import history from '../../Routes/history'
import { globalVaraibles } from "../../utils/utils"
const domains = globalVaraibles.domains()

export class WebSidebarleft extends Component {

  constructor(props) {

    super(props)
    this.state = {
      initial: true,
      redirect: ''
    }
  }

  toggle = () => {

    this.setState({
      initial: !this.state.initial
    })

  }

  redirectCategory = (e, id, title) => {
    e.preventDefault()
    this.props.handleCloseSidebar()
    this.props.categoryAction(id)
    const validTitle = title.replace(/ /g, '-')
    history.push({
      pathname: `${categoryPath}/${validTitle}`
    })
  }

  redirectLinks = () => {
    this.props.handleCloseSidebar()
    history.push(signup)
  }

  redirectHost = (path) => {
    window.location.assign(path)
    // if (window.location.hostname.includes("trade.ekbazaar.com") === true) {
    //   localStorage.removeItem("userType")
    //   window.location.assign('https://www.ekbazaar.com/home')
    // } else {
    //   localStorage.removeItem("userType")
    //   window.location.assign('https://ekbazaar.tech-active.com/home')
    // }
  }
  render() {
    const { menus } = this.props;
    const _seller = this.props.seller
    const { hasAccess } = this.props
    // const { sellerType } = _seller
    const checkProductStatus = _seller && _seller.sellerProductId && _seller.sellerProductId.length && _seller.sellerProductId.filter((value) => !value.isDeleted && value.productDetails && value.productDetails.price && value.productDetails.price.price).length !== 0 ? true : false;
    const isNotDeleted = _seller && _seller.sellerProductId && _seller.sellerProductId.length && _seller.sellerProductId.filter((value) => !value.isDeleted).length !== 0 ? true : false;
    return (
      <div className="side-nav-web">

        <p className="act"><a>Trade Bazaar</a></p>
        <ul className="tender">
          <h4 className="browseby-z" onClick={this.toggle}>Browse by  <FontAwesomeIcon icon={faAngleDown} /></h4>
          {this.state.initial ?

            <div className="list">
              {menus && menus.length && menus.map((cat, index) => {
                return (<li>
                  <NavLink  key={index} onClick={(e) => this.redirectCategory(e, cat._id, cat.name)} to={cat.name.replace(/ /g, '-')} > {cat.name} </NavLink >
                </li>)
              })
              }
            </div>

            : ''}
          <h4>
            <a
              // to={ this.props.hasAccess && this.props.seller && this.props.seller.sellerType && this.props.seller.sellerType.length && this.props.seller.sellerProductId ?
              //   seller : this.props.hasAccess && this.props.seller && this.props.seller.sellerType && this.props.seller.sellerType.length && !this.props.seller.sellerProductId ? productinventory: signup}
              to={
                _seller && _seller.name
                  ? hasAccess && _seller && _seller.sellerType && _seller.sellerType.length && _seller && checkProductStatus
                    ? seller
                    : hasAccess && _seller && _seller.sellerType && _seller.sellerType.length && _seller.sellerProductId.length && isNotDeleted && !checkProductStatus
                      ? myproduct
                      : hasAccess && _seller && _seller.sellerType && _seller.sellerType.length && _seller && (!_seller.sellerProductId.length || !isNotDeleted)
                        ? productinventory
                        : hasAccess && _seller && ((_seller.sellerType && !_seller.sellerType.length) || _seller && !_seller.sellerType)
                          ? signup : signup
                  : hasAccess ? signup : signin
                // this.props.hasAccess && this.props.seller && this.props.seller.sellerType && this.props.seller.sellerType.length && this.props.seller.sellerProductId.length
                //   ? seller
                //   : this.props.hasAccess && this.props.seller.sellerType && this.props.seller.sellerType.length && this.props.seller && !this.props.seller.sellerProductId.length
                //     ? productinventory
                //     : this.props.hasAccess && this.props.seller.sellerType && !this.props.seller.sellerType.length ? signup : signin
              }
              onClick={() => {
                this.props.onClick()
                this.props.actions.setUserType("seller")
                _seller && _seller.name
                  ? hasAccess && _seller && _seller.sellerType && _seller.sellerType.length && _seller && checkProductStatus
                    ? history.push(seller)
                    : hasAccess && _seller && _seller.sellerType && _seller.sellerType.length && _seller.sellerProductId.length && isNotDeleted && !checkProductStatus
                      ? history.push(myproduct)
                      : hasAccess && _seller && _seller.sellerType && _seller.sellerType.length && _seller && (!_seller.sellerProductId.length || !isNotDeleted)
                        ? history.push(productinventory)
                        : hasAccess && _seller && ((_seller.sellerType && !_seller.sellerType.length) || _seller && !_seller.sellerType)
                          ? history.push(signup) : history.push(signup)
                  : hasAccess ? history.push(signup) : history.push(signin)

              }}
              className="sell">
              Sell on EkBazaar
            </a> </h4>
        </ul>
        {/* <p>
          <a onClick={() => this.redirectHost(domains.tender)} style={{ cursor: 'pointer' }}>Tender Bazaar</a>
        </p> */}

        {/* <p><a onClick={() => this.redirectHost(domains.investment)} style={{ cursor: 'pointer' }}>Investment Bazaar</a></p> */}
      </div>
    )

  }

}

const mapStateToProps = state => ({
  hasAccess: state.app.auth,
  seller: state.common.user.seller,
  userType: state.common.userType,
  buyer: state.common.user.buyer,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setUserType
  }, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(WebSidebarleft)
