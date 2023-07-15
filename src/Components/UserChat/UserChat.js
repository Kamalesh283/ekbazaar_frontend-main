import React, { Component } from 'react'
import './UserChat.scss'
export default class UserChat extends Component {
    render() {
        const filterData = this.props.information && this.props.information.length ? this.props.information.filter(v => v.usernames[0] !== localStorage.getItem('chatUsername')) : []
        return (
            <>
                {this.props.information && this.props.information.length && this.props.information.map((data, index) =>
                    // {filterData && filterData ? filterData.map((data, index) =>

                    <div className="UserChat" onClick={() => this.props.getChatHistory(data)} key={index}>

                        <div className="products-info">
                            <div className="status-chat">
                                <p className="dot" id={data.status}  ></p>
                            </div>
                            <div className="info">
                                <h5 >{data.name}</h5>
                                {/* <h6>{data.product}</h6> */}
                                {/* <p>{data.description}</p> */}

                            </div>
                        </div>
                        <div className="unread-time">
                            {data.unread > 0 && <span className="no-of-unread">{data.unread}</span>}
                            <span className="time">{data.time}</span>
                        </div>

                    </div>
                ) || false}
            </>

        )
    }
}
