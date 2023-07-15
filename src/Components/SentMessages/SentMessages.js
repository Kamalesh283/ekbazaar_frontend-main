import React from 'react'
import './SentMessages.scss'

export default function SentMessages(props) {
    return (
        <div className = "SentMessages">
            <p className="textSent">{props.textsent}</p>
            <p className="SentDate">{props.sentdate}</p>
        </div>
    )
}
