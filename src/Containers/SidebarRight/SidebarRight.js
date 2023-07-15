import React, { Component } from 'react'
import AsideBuyerPreference from '../AsideBuyerPreference/AsideBuyerPreference'
import AsideSellerPreference from '../AsideSellerPreference/AsideSellerPreference'
import './SidebarRight.scss'
export default class SidebarRight extends Component {
    render() {
        return (
            <div className="SidebarRight">
                <div className="overlay-for-sidebar" onClick={this.props.overlay}></div>
                {localStorage.getItem('userType') != "seller" ? <AsideBuyerPreference onClick={this.props.onClick}  overlayHandler={this.props.overlay} /> : <AsideSellerPreference overlayHandler={this.props.overlay}/>}
                
            </div>
        )
    }
}
