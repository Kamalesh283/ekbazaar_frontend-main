import React, { Component } from 'react'
import './FooterNotifier.scss'
import Button from '../../Components/Button/Button'
import Conatiner from '../../Components/Conatiner/Conatiner'
import history from "../../Routes/history";
import { bannerLang } from '../../utils/languages/home'
import { translate, localize } from 'react-i18nify';
import { setTranslationsGetter } from 'react-i18nify';
import classNames from "classnames";

setTranslationsGetter(bannerLang);

export default class FooterNotifier extends Component {

  // openCategory() {
  //     history.push('/pricing');
    
  // }

  openCategory() {
    const { isPartilyRegistor } = this.props
    // if (this.props.status === 1){

    if (isPartilyRegistor) {
      history.push('/profile')
    } else {
      history.push('/pricing')
    }
  }

  render() {
    return (
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
