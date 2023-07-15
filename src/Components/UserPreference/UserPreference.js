import React, { Component } from 'react'
import { connect } from "react-redux";
import SidebarRight from '../../Containers/SidebarRight/SidebarRight'
import UserName from '../UserName/UserName'

export class UserPreference extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false
        }
    }
    UserPrefernceHandler = () => {
        this.props.closeChat()
        this.setState({
            status: true
        })
    }
    overlayHandler = () => {
        this.setState({
            status: false
        })
    }
    hideforno=()=>{
        this.setState({
            status:false
        })
    }
    render() {
        return (
            <div className="UserPreference">
                <UserName onClick={this.UserPrefernceHandler} buyer={this.props.buyer} seller={this.props.seller} /* buyer={this.props.buyer} */ userType={this.props.userType}/>
                {this.state.status ?
                    <SidebarRight onClick={this.hideforno} overlay={this.overlayHandler} /> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    buyer: state.common.user.buyer,
    seller: state.common.user.seller,
    userType: state.common.userType
});

export default connect(mapStateToProps)(UserPreference);
