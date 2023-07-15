import React from 'react'
import Icon from '../../Components/Icon/Icon'
const Person = (props) => (
  <Icon
    fill={props.fill}
    viewBox="0 0 18 18"
    transform="translate(-4.5 -4.5)"
    width={18}
    height={18}
  >
    <path d="M13.5,13.5A4.5,4.5,0,1,0,9,9,4.513,4.513,0,0,0,13.5,13.5Zm0,2.25c-2.981,0-9,1.519-9,4.5V22.5h18V20.25C22.5,17.269,16.481,15.75,13.5,15.75Z" />
  </Icon>
)
export default Person
