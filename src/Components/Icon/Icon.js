import React from 'react'

const Icon = (props) => (
  <div className="svg-icon" onClick={props.onClick} title={props.title}>
    <svg
      style={{
        overflow: 'visible'
      }}
      viewBox={props.viewBox}
      transform={props.transform}
      width={props.width}
      height={props.height}
      fill={props.fill}
    >
      {props.children}
    </svg>
  </div>
)

export default Icon