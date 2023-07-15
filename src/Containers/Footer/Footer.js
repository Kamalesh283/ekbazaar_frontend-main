import React, { Component } from 'react'
import FooterGrand from '../FooterGrand/FooterGrand'
import FooterNotifier from '../FooterNotifier/FooterNotifier'
import moment from 'moment'
import './Footer.scss'

export default class Footer extends Component {
    /*shouldComponentUpdate(nextProps, nextState) {
        if (nextProps && nextProps.hasAccess && this.props.hasAccess !== this.props.hasAccess)
            return true
        return true
    } ---kamalesh*/

    render() {
        // const { seller, userType, hasAccess } = this.props
       /* const { seller, userType, hasAccess, buyer } = this.props;
        // let isPartilyRegistorStatus = buyer.isPartilyRegistor === true ? true : false
        let isPartialyRegistorStatus = false;
        if (buyer && buyer.isPartialyRegistor){
            isPartialyRegistorStatus = true;
        }
        const status = userType !== "seller" && !hasAccess
            ?
            1
            :
            _.isEmpty(seller)
                ?
                2
                :
                seller && !seller.planId
                    ?
                    3
                    :
                    seller && seller.planId && seller.planId.planType === "Trail" && (moment(new Date(), 'DD/MM/YYYY HH:MM:SS') > moment(new Date(seller.planId.exprireDate), 'DD/MM/YYYY HH:MM:SS'))
                        ?
                        4
                        :
                        0 ---Kamalesh*/
        return (
            <div className="Footer">
                
                {/* {status !== 0 ? <FooterNotifier status={status} /> : null} */}
                {/*status !== 0 ? <FooterNotifier status={status} isPartilyRegistor={isPartialyRegistorStatus} /> : null---kamalesh*/}
                <FooterNotifier/>
                <FooterGrand />
            </div>
        )
    }
}