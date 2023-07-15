import React, { Component } from 'react'
import './Input.scss'

export default class Input extends Component {
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate111111');
        }
    }

    render() {
        return (
            <div className={this.props.className ? "custom" : "input"} id={this.props.id}>
                <input autocomplete="new-password" disabled={this.props.disabled} maxLength={this.props.maxLength} type={this.props.type} placeholder={this.props.placeholdertext} value={this.props.value} onChange={(e) => this.props.onChange ? this.props.onChange(e.target.value) : console.log()} style={this.props.style} autoFocus={this.props.autoFocus || false} tabindex={this.props.tabIndex} onKeyDown={(e) => this.props.keyDown ? this.props.keyDown(e): console.log()} />
                {this.props.children}
                {this.props.error ? <span className="error" > {this.props.error}</span> : ''}
            </div>
        )
    }
}