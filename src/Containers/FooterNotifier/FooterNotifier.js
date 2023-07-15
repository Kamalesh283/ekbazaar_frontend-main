import React, { Component } from 'react'
import './FooterNotifier.scss'
import { bannerLang } from '../../utils/languages/home';
import Conatiner from '../../Components/Conatiner/Conatiner';
import { translate, localize } from 'react-i18nify';
import { setTranslationsGetter } from 'react-i18nify';
import classNames from "classnames";

setTranslationsGetter(bannerLang);

export default class FooterNotifier extends Component {
   
    
   render()
   {
    return(
        <div className={classNames("FooterNotifier", "notranslate")}>
        <Conatiner>
          <div className="notifier-layout">
            <h3>{translate('application.footerNotifier')}</h3>
            {/* <Button value={this.props.status === 4 ? translate('application.footerNotifierBtn2') : translate('application.footerNotifierBtn1')} click={() => this.openCategory()} /> */}
          </div>
          </Conatiner>
      </div>
    )
   }
}