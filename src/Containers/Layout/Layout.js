import React from 'react'
import { NavLink } from 'react-router-dom'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'
import { connect } from 'react-redux'
import Header from '../Header/Header'
//import RFP from '../RFP/RFP'
//import Footer from '../Footer/Footer'
//import RenewlStrip from '../../Components/RenewlStrip/RenewlStrip'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { chatOpen, chatCategoryHeight } from '../../store/actions/chat'
import { acticateAccount, removemylistingurl } from '../../store/actions/common'


const Layout = (props) => {
    console.log('NavLink', NavLink);
    return (
        <div className="layout" id={props.userType === "seller" ? 'Seller-layout' : ''}>
            <Header />
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
            {props.children}
        
        </div>
    )
}


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