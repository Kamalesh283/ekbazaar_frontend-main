import React from 'react'
import './MessageDates.scss'

export default function MessageDates(props) {
    return (
        <>
            <p className="chatDate">{props.msgdate}</p>
        </>
    )
}
