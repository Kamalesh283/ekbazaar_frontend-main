import React, { Component } from 'react'
import './FormCheckbox.scss'
export default class FormCheckbox extends Component {
    render() {
        return (
            <div className="FormCheckbox" id={this.props.id} key={this.props.key}>
                <label className="box">{this.props.name}
                    <input type="checkbox" name={this.props.inputname} checked={this.props.checked} onChange={this.props.onChange} />
                    <span className="checkmark-x"></span>

                </label>
                {this.props.children}
            </div>
        )
    }
}
