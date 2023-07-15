import React, { Component } from 'react'
import './SendedText.scss'
export default class SendedText extends Component {
    render() {
        const { message, roomId, time } = this.props
        return (
            <div className="SendedText">
                <p className="mesage">{message}</p>
                <p className='texted-time'>{time}</p>
            </div>
        )
    }
}
