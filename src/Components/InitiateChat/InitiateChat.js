import open from "../../Assets/Images/chat-open.svg";
import arrow from "../../Assets/Images/chat-arrow-up.svg";
import React from "react";
import close from "../../Assets/Images/chat-close.png";
import "./InitiateChat.scss";
import MediaQuery from "react-responsive";
import { translate, localize } from 'react-i18nify';
import { bannerLang } from '../../utils/languages/home'
import { setTranslationsGetter } from 'react-i18nify';
import classNames from "classnames";

setTranslationsGetter(bannerLang);

export default function InitiateChat(props) {
  return (

    <>
     <div className="chat-tab-xs">
      <div className="chat-crle" id={props.roomid?'room-id':''} onClick={props.onClick}>
        {/* <img src={props.changeicon && close || open} /> */}
        <img src={props.changeicon && props.roomid ? close: open} />
      </div>
      </div>

      <div className="chat-tab-xl">
      <div className="InitiateChat" onClick={props.onClick}>

        {/* <div className={classNames("notranslate")}> */}
        <p className="info">
          <span className={props.hasAccess ? "active" : ""}></span>
          {/* Chat With Seller */}
          {translate('application.chat_with_seller')}
          {props.hasAccess && props.messageCount > 0 && (
            <span className="total-unread-count">{props.messageCount}</span>
          )}
        </p>
        {/* </div> */}
        <img src={arrow} />
        </div>
      </div>
    </>
    // <div className="InitiateChat" onClick={props.onClick}>
    //   <MediaQuery maxDeviceWidth={1024}>
    //     <img src={(props.process && close) || open} />
    //   </MediaQuery>
    //   <MediaQuery minDeviceWidth={1025}>
    //     <div className={classNames("notranslate")}>
    //     <p className="info">
    //       <span className={props.hasAccess ? "active" : ""}></span>{translate('application.chat_with_seller')}
    //       {props.hasAccess && props.messageCount > 0 && (
    //         <span className="total-unread-count">{props.messageCount}</span>
    //       )}
    //     </p>
    //     </div>
    //     <img src={arrow} />
    //   </MediaQuery>
    // </div>
  );
}
