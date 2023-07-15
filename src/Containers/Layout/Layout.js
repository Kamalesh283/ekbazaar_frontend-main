import React, { Component } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'
import { NavLink } from 'react-router-dom'
import RFP from '../RFP/RFP'
import { connect } from "react-redux";
import RenewlStrip from '../../Components/RenewlStrip/RenewlStrip'
import moment from 'moment'
import Chatbot from '../Chatbot/Chatbot'
import { bindActionCreators } from 'redux'
import { chatOpen, chatCategoryHeight } from "../../store/actions/chat"
import { acticateAccount, removemylistingurl } from '../../store/actions/common'
import { account } from '../../Routes/path'
import history from '../../Routes/history';
import RemoveListingPopup from '../RemoveListingPopup/RemoveListingPopup'
import close from "../../Assets/Images/close-white.svg";
import { rootPath } from '../../Routes/path'
class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTop: true,
      renew: true
    }
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.wrapperRef = React.createRef();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyPress);
    // window.removeEventListener("scroll", this.handleScroll);

  }


  // handleScroll() {
  //   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   console.log(windowBottom, docHeight, 'jsadjhadasdjaosdj')
  //   if (windowBottom >= (docHeight - 500)) {
  //     document.body.classList.add("remove-list-scenario")
  //     console.log('if statement')

  //   } else {
  //     console.log('else statement')
  //     document.body.classList.remove("remove-list-scenario")

  //   }
  //   console.log(windowBottom, docHeight, 'windowinfo')
  // }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {

    if (this.props.chatOpen && this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.props.actions.chatOpen(false)
      this.props.actions.chatCategoryHeight(false)
    }
  }

  handleKeyPress(event) {
    if (event.keyCode === 27 && this.props.chatOpen) {
      this.props.actions.chatOpen(false)
    }
  }


  componentDidMount() {

    document.addEventListener('scroll', () => {

      const isTop = window.scrollY < 300
      if (isTop !== this.state.isTop) {

        this.setState({
          isTop
        })

      }

    })

    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeyPress);
    // document.addEventListener("scroll", this.handleScroll);
  }
  renewHandler = () => {
    this.setState({
      renew: false
    })
  }
  checkAccount = () => {
    this.props.actions.acticateAccount(true)
  }
  handleActivationRequest = () => {
    this.props.actions.acticateAccount(false)
    history.push(account)
  }
  removelistingHandler=()=>{
    this.props.actions.removemylistingurl(false)
  }
  onSubmit = () => {
    const { userType } = this.props
    // history.push(userType === "seller" ? seller : rootPath);
    history.push(userType === "seller" ? rootPath : rootPath);
    this.props.actions.removemylistingurl(false)
  };
  render() {
    const { hasAccess, userType, seller, removemylisting } = this.props
    let createdDate = moment(new Date()).format();
    let expirationDate = moment(createdDate).add(5, 'd').format('YYYY-MM-DD');

    return (
      <div className="layout" id={this.props.userType === "seller" ? 'Seller-layout' : ''}>
        <Header />
        {this.state.renew &&
          hasAccess &&
          userType === "seller"
          && seller &&
          seller.planId
          && seller.planId.exprireDate
          && moment(expirationDate).isSameOrAfter(moment(seller.planId.exprireDate).format('YYYY-MM-DD'))
          ? <RenewlStrip onClick={this.renewHandler} planDetails={seller.planId} /> : (false)}
        <div className="breadcrumbs">
          <Breadcrumbs
            separator={<b> / </b>}
            item={NavLink}
            finalItem={'b'}
            finalProps={{
              style: {
                color: '#3405B5',
                marginTop: '20px',
                display: 'inline-flex',
                textTransform: 'capitalize',
                fontWeight: 'normal'
              }
            }}
          />
        </div>
        {this.props.children}
        <div ref={this.wrapperRef}>

          <Chatbot hasAccess={this.props.hasAccess} checkAccount={this.checkAccount} handleActivationRequest={this.handleActivationRequest} />
        </div>
        {this.state.isTop ? '' : <RFP />}
        {/* <Rocket /> */}
        <Footer {...this.props} />

        {removemylisting ?
          <div className="layout-for-remove-mylist">
            <RemoveListingPopup  onSubmit={this.onSubmit} onClick={this.removelistingHandler}>
              <img onClick={this.removelistingHandler} src={close} />{" "}
            </RemoveListingPopup>
          </div>
          : ''}
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   seller: state.common.user.seller,
//   userType: state.common.userType,
//   hasAccess: state.app.auth,
//   chatOpen: state.chat.chatOpen,
// })

const mapStateToProps = state => ({
  seller: state.common.user.seller,
  removemylisting: state.common.removemylisting,
  buyer: state.common.user.buyer,
  userType: state.common.userType,
  hasAccess: state.app.auth,
  chatOpen: state.chat.chatOpen,
})

const mapDispachToProps = dispatch => ({
  actions: bindActionCreators({
    chatOpen,
    acticateAccount,
    removemylistingurl,
    chatCategoryHeight
  }, dispatch)
})

export default connect(mapStateToProps, mapDispachToProps)(Layout)
