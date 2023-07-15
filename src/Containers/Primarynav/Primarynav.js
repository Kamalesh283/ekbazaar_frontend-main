import React, { Component } from 'react'
import './Primarynav.scss'
import Conatiner from '../../Components/Conatiner/Conatiner'
import Rprimary from '../../Components/Rprimary/Rprimary'
import Lprimary from '../../Components/Lprimary/Lprimary'

export default class Primarynav extends Component {

  render() {

    return (
      <div className="primary-nav">
        <Conatiner>
          <Lprimary />
          <Rprimary />
        </Conatiner>
      </div>
    )

  }

}
