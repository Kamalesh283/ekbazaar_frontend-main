import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button';
import "./RFPStepPassword.scss"

export const RFPStepPassword = (props) => {
    return (
        <div className="RFPStepPassword">
            <Title title="Password" />
            <div className="Module">
                <p>Please enter your password below to submit your requirement.</p>
                <Input type="password"
                    placeholdertext="Password*"
                    value={props.password}
                    onChange={props.onChange}
                    error={props.submitted ? props.errormsg : ""}
                    style={{width: "100%"}}
                    keyDown={props.onPressEnter}
                    error={props.passwordError ? props.passwordError : ""}
                />                   
                <Button parentclass="fetching-data" value="Submit" click={e => props.onSubmit(e)} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({

    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RFPStepPassword)
