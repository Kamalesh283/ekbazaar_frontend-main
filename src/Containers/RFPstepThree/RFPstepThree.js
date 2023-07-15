import React, { Component } from 'react'
import Title from '../../Components/Title/Title'
import RequirmentForm from '../RequirmentForm/RequirmentForm'
import './RFPstepThree.scss'

export default class RFPstepThree extends Component {
    // tsHandler=(e)=>{
    //     e.preventDefault();
    //     this.props.nextStep()

    //   }
    render() {
        return (
            <div className="RFPstepThree">
                <Title title={this.props.title || "Contact Seller"} />

                <div className="Module">
                    <RequirmentForm {...this.props} title="Get quotes from nationwide suppliers" bodycopy="Enter your requirement and get quotes from multiple suppliers " />
                    {/* onClick={e=>this.tsHandler(e)} */}
                </div>
        
            </div>
        )
    }
}
