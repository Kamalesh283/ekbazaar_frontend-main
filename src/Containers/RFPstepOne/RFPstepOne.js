import React, { Component } from 'react'
import Input from '../../Components/Input/Input'
import Title from '../../Components/Title/Title'
import Select from 'react-select';
import Button from '../../Components/Button/Button';
import arrow from '../../Assets/Images/angledown.svg'
import './RFPstepOne.scss'
const teloptions = [
  { value: '+91', label: '+91', key: '+91' }
];
const customStyles = {
  option: () => ({
    color: 'red',
    fontFamily: 'OpenSans-Regular',
    fontSize: '13px',
    lineHeight: '23px',
    color: '#2B2C33',
    padding: ' 8px',
    cursor: 'pointer'

  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',

  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const width = '100%';
    const fontFamily = 'OpenSans-Regular';
    const fontSize = '13px';
    const lineHeight = '23px';
    const color = '#2B2C33';
    const cursor = 'pointer';
    const backgroundColor = "#F2F2F2";
    const height = '36px';
    const display = 'flex';
    const alignItems = 'center';
    const justifyContent = 'left'
    const border = ' 1px solid #DEE2E4 ';
    const borderRadius = '4px';
    const padding = '12px';
    const backgroundRepeat = 'no-repeat !important';
    const backgroundPosition = '90% !important';
    const backgroundImage = `url(${arrow})`;


    return { ...provided, opacity, backgroundColor, backgroundImage, backgroundRepeat, backgroundPosition, borderRadius, border, padding, transition, width, fontFamily, fontSize, lineHeight, color, cursor, height, display, alignItems, justifyContent };
  }
}

export default class RFPstepOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tel: teloptions[0],
    }
  }
  telChange = tel => {
    this.setState({ tel });
  }
  // tsHandler=(e)=>{
  //   e.preventDefault();
  //   this.props.nextStep()

  // }

  render() {
    // if(this.props.currentStep === 1 && this.props.step1){
    //   this.props.nextStep()
    // }
    const { tel } = this.state;
    return (
      <div className="RFPstepOne">
        <Title title="Verification" />
        <div className="Module">
          <p>Please enter your mobile number below to get a verification code.</p>
          <Input type="tel"
            placeholdertext="Enter mobile number"
            value={this.props.mobile}
            onChange={this.props.onChangeMobile}
            keyDown={this.props.onPressEnter}
            error={this.props.validate(this.props.submitted, this.props.mobile,"mobile")}
            // error={this.props.submitted ? this.props.errormsg : ""}
            maxLength={10}
          >
            <Select
              styles={customStyles}
              value={this.props.countryCode}
              onChange={this.props.onChangeCode}
              options={teloptions}
              className="tel-container"
              isSearchable={false}
              classNamePrefix="custom-select"
              components={
                {
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null
                }
              }
            />
          </Input>
          <Button parentclass="fetching-data" value="Submit" click={e => this.props.onSubmit(e)} />
          {/* click={e=>this.tsHandler(e)} */}
        </div>

      </div>
    )
  }
}
