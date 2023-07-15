import React, { Component } from 'react'
import './ReceivedText.scss'
export default class ReceivedText extends Component {
    render() {
        const { message, roomId, time } = this.props
        return (
            <div className="ReceivedText">
                <p className="mesage">{message}</p>
                <p className='texted-time'>{time}</p>
            </div>
        )
    }
}
