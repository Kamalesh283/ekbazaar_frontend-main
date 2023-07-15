import React, { Component } from 'react'
import './Title.scss'

export default class Title extends Component {
    render() {
        return (
            <div className="Title">
                <h3>{this.props.title}</h3>
                {this.props.children}
            </div>
        )
    }
}
