import React, { Component } from "react";

export default class Form extends Component {
  render() {
    return (
      <div className="Form">
        <form className={this.props.formclass}>
          {this.props.children}
          <div className="form-footer">
          

            {this.props.multi ? (
              <input type="reset" value={this.props.resetvalue} onClick={this.props.reset ? this.props.reset : ""} />
            ) : (
              ""
            )}
              <>
              {this.props.submitname &&
                <input
                  type="submit"
                  value={this.props.submitname}
                  onClick={this.props.onClick}
                  disabled={this.props.submitDisabled || false}
                />
              }
            </>
          </div>
        </form>
      </div>
    );
  }
}