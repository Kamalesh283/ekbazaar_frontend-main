import React from 'react'
import './ChatTitle.scss'
export default function ChatTitle(props) {
    return (
        <div className="ChatTitle">
            {props.children}
        </div>
    )
}