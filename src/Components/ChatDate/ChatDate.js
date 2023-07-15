import React from 'react'
import './ChatDate.scss'
export default function ChatDate(props) {
    return (
        <div className="ChatDate">
            <label>{props.chatDate}</label>
        </div>
    )
}
