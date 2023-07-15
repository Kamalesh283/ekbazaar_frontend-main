import React from 'react'
import './ReceivedMessages.scss'

export default function ReceivedMessages(props) {
    return (
             <div className = "ReceivedMessages">
            <p className="textReceived">{props.textreceived}</p>
            <p className="receivedDate">{props.receiveddate}</p>
        </div>
    )
}
