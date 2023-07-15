import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { pricingPath } from '../../Routes/path'
import './RenewlStrip.scss'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import close from '../../Assets/Images/xclose.svg'
import Conatiner from '../Conatiner/Conatiner'
export default function RenewlStrip(props) {
    const { planDetails } = props
    const currentDate = moment().format('YYYY-MM-DD')
    const expireDate = moment(planDetails.exprireDate).format('YYYY-MM-DD')
    return (
        <div className="RenewlStrip">
            <Conatiner>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {
                        planDetails && planDetails.expireStatus === true || moment(currentDate).isSameOrAfter(expireDate)
                            ? (planDetails.isTrial ? "your free trial has expired on ekbazaar " : 'Your plan has expired on ekbazaar ')
                            : planDetails.isTrial
                                ? `Your subscription is expiring on  ${planDetails && moment(planDetails.exprireDate).format('DD/MM/YYYY')}. `
                                : `Your subscription expired on ${planDetails && moment(planDetails.exprireDate).format('DD/MM/YYYY')}.`
                    }
                    <Link to={pricingPath} >Upgrade now!</Link><img onClick={props.onClick} src={close} />
                </p>
            </Conatiner>

        </div>
    )
}
