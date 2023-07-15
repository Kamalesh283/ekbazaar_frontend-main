import React, { Component } from 'react'
import { globalVaraibles } from "../../utils/utils"
import './Lprimary.scss'
import { translate, localize } from 'react-i18nify';
import { bannerLang } from '../../utils/languages/home'
import { setTranslationsGetter } from 'react-i18nify';
import classNames from "classnames";

setTranslationsGetter(bannerLang);
const domains = globalVaraibles.domains()
export default class Lprimary extends Component {

  render() {
    return (
      <div className={classNames("primary-l", "notranslate")}>
        <li className="active">{translate('application.portal1')}</li>       
      </div>
    )

  }

}
