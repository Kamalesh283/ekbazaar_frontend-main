import React, { Component } from 'react'
import './Socialinfo.scss'
import fb from '../../Assets/Images/fb.svg'
// import youtube from '../../Assets/Images/youtube.svg'
// import linkedin from '../../Assets/Images/linkedin.svg'
import twitter from '../../Assets/Images/twitter.svg'
export default class Socialinfo extends Component {

  render() {

    return (
      <div className="social">
        <div className="share">
          <ul>
            <li>
              <a href="https://www.facebook.com/EkBazaarIndia/?ref=pages_you_manage" target="_blank">
                <img src={fb} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/EkBazaarIndia" target="_blank">
                <img src={twitter} />
              </a>
            </li>
            {/* <li>
              <a>
                <img src={linkedin} />
              </a>
            </li>
            <li>
              <a>
                <img src={youtube} />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    )

  }

}
