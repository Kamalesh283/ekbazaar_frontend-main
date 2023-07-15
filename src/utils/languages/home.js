import { Translate, Localize, setTranslations, setLocale } from 'react-i18nify';
import Cookies from 'js-cookie'
import englng from './english'
import hndlng from './hindi'
import asamilng from './assamese'
import bnglng from './bengali'
import malaylng from './malayalam'
import kannlang from './kannada'
import marlang from './marathi'
import tamillang from './tamil'
import teluglang from './telugu'
import gujaratlang from './gujarati'

const localeLang = Cookies.get('googtrans') && Cookies.get('googtrans').split("/")[2] || 'en'
// const  localeLang = (lan === 'hi' || lan === 'en') ? lan: 'en'
export const bannerLang = () => {
  setTranslations({
    en: {
      application: englng.homePageLang
    },
    hi: {
      application: hndlng.homePageLang
    },
    as:{
      //assamese lang
      application : asamilng.homePageLang
    },
    bn:{
       //bengali lang
       application : bnglng.homePageLang
    },
    kn:{
      //kannada lang
      application : kannlang.homePageLang
    },
    ml:{
      //Malayalam lang
      application : malaylng.homePageLang
    },
    mr:{
      //Marathi
      application: marlang.homePageLang
    },
    ta:{
      //tamil lang
      application: tamillang.homePageLang
    },
    te:{
      //telugu lang
      application: teluglang.homePageLang
    },
    gu:{
      //gujarathi lang
      application: gujaratlang.homePageLang
    }
  });
  setLocale(localeLang);
}
