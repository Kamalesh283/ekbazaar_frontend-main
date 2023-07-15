import React, { Component } from 'react'
import bluelanguage from '../../Assets/Images/language-blue.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import './SelectYourLang.scss'
import classNames from "classnames";
import language from '../../Assets/Images/language.svg'
import Cookies from 'js-cookie'
import { siteLanguagesList } from '../../utils/utils'

export default class SelectYourLang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changelanguage: false,
      texttodisplay: ''
    };
  }
  languagetoggle = () => {
    this.setState({
      changelanguage: !this.state.changelanguage,
    });
  };
  overlayHandler = () => {
    this.setState({
      changelanguage: !this.state.changelanguage,
    });
  };


  changeLanguageByButtonClick = (e, language, texttodisplay) => {
    e.preventDefault()
    // if (language !== 'en') {
    var selectField = document.querySelector("#google_translate_element select");
    for (var i = 0; i < selectField.children.length; i++) {
      var option = selectField.children[i];
      // find desired langauge and change the former language of the hidden selection-field
      if (option.value == language) {
        selectField.selectedIndex = i;
        selectField.dispatchEvent(new Event('change'));
        break;
      }
    }
    this.setState({
      changelanguage: !this.state.changelanguage,
      texttodisplay: texttodisplay
    })
    this.props.setSiteLanguageAction && this.props.setSiteLanguageAction(texttodisplay)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }


  render() {
    const { lang } = this.props
    const lan = Cookies.get('googtrans') && Cookies.get('googtrans').split("/");
    return (
      <div className={classNames("SelectYourLang", "notranslate")}/* className="SelectYourLang" */ style={this.props.style}>
        <h4 onClick={this.languagetoggle}>
          <img src={this.props.primary ? language : bluelanguage} />
          {/* Choose Language{" "} */}
          {(lang && lang) || (lan && lan.length && lan[2] && lan[2] ? siteLanguagesList.filter((v) => v.value === lan[2])[0].label : "English")}
          {/* {this.state.texttodisplay === "" ?"Choose Language":this.state.texttodisplay} */}

          <FontAwesomeIcon icon={this.props.primary ? faCaretDown : faCaretDown}
          />
        </h4>

        {this.state.changelanguage &&
          <>
            <div className="overlay-language" onClick={this.overlayHandler}></div>
            <div className={classNames("list", "translation-links notranslate")}>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "en", "English")} data-lang="English">English</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "hi", "हिंदी")} data-lang="Hindi">हिंदी</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "gu", "ગુજરાતી")} data-lang="Gujrati">ગુજરાતી</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "bn", "বাংলা")} data-lang="Bengali">বাংলা</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "kn", "ಕನ್ನಡ")} data-lang="Kannada">ಕನ್ನಡ</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "ml", "മലയാളം")} data-lang="Malayalam">മലയാളം</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "mr", "मराठी")} data-lang="Marathi">मराठी</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "ta", "தமிழ்")} data-lang="Tamil">தமிழ்</a></li>
              <li><a href="#" onClick={(e) => this.changeLanguageByButtonClick(e, "te", "తెలుగు")} data-lang="Telugu">తెలుగు</a></li>

            </div>
          </>
          || ''}

      </div>
    )
  }
}
