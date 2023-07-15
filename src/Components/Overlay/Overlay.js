import React, { Component } from 'react'
import './Overlay.scss'

export default class Overlay extends Component {
    render() {
        return (
            <div className="overlay-cmpt">
                <div className="content-inner-overlay">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
