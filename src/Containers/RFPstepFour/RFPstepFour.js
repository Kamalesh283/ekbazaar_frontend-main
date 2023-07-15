import React, { Component } from 'react'
import Button from '../../Components/Button/Button'
import Title from '../../Components/Title/Title'
import './RFPstepFour.scss'

import history from "../../Routes/history";
export default class RFPstepFour extends Component {
    submitHandler() {
        history.push('/');
    }
    render() {
        return (
            <div className="RFPstepFour">
                 <Title title={this.props.removal ? 'Remove my Listing' : 'Message Sent'} />
                <div className="Module" style={{ padding: `${this.props.page ? '90px' : ''}` }}>
                    <h4>{this.props.page ? 'Request Sent' : 'Thank You!'}</h4>
                    {this.props.removal ?
                        <p>We will get back to you soon.</p>
                        :
                        <p>Thank you for submitting your requirement.<br /> We’ll get back to you soon. </p>
                    }
                    <Button 
                        click={() => this.props.removal 
                            ? this.props.onSubmit() 
                            : this.props.from 
                                ?this.props.submitHome()
                                : this.submitHandler()
                            } 
                        parentclass="fetching-data" 
                        value="Back to Home Page" 
                    />
                </div>

            </div>
        )
    }
}
