import React, { useState,useEffect } from "react";
import "./ChatTabs.scss";
import QuestionIcon from "../../Assets/Images/question.svg";
import ColQuestionIcon from "../../Assets/Images/colquestion.svg";
import DROPARROW from "../../Assets/Images/downarrow1.svg";
import menuunclicked from "../../Assets/Images/unclickedmenu.svg";
import menuclicked from "../../Assets/Images/greymenu.svg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChatSelectCategory from "../ChatSelectCategory/ChatSelectCategory";
import ChatQuestions from "../ChatQuestions/ChatQuestions";

export default function ChatTabs(props) {
  const [secHeight, setSecHeight] = useState(true);
  const [rotate, setRotate] = useState(true);
  const [LightMode, setLightMode] = useState(true);
  const [menuImg, setMenuImg] = useState(0);
  const [categoryclicked, setCategoryclicked] = useState(0)
  const [categorysearch, setcategorysearch] = useState('');

  const ImgCategoryHandler = () => {
    setLightMode((prevMode) => !prevMode);
  };
  const categorySearchHandler = (value) => {
  console.log("🚀 ~ file: ChatTabs.js ~ line 25 ~ categorySearchHandler ~ value", value)
    setcategorysearch(value)
  }

  // const ImgQuestionHandler = () => {
  //   setLightMode((prevMode) => !prevMode);
  // };
  const heightHandler = () => {
    const value = !props.chatCategoryHeight || false
    // if (!secHeight) {
    setSecHeight(value);
    props.categoryHeighthandler(value)
    // } else {
    //   setSecHeight(false);
    //   props.categoryHeighthandler(false)

    // }
  };
  const rotateHandler = () => {
    if (!rotate) setRotate(true);
    else setRotate(false);
  };
  const heightRotateHandler = () => {
    heightHandler();
    rotateHandler();
    setcategorysearch('')
  };
  // const categoryClickHandler = () => {

  //   (setCategoryclicked = !categoryclicked);


  // };
  const selectTab = () => {
    setLightMode((prevMode) => !prevMode);
  }

  const selectCategoryFun = (value) => {
    props.setChatCategoryFun(value)
    props.getQuestion(value)
  }
  const changeTab = (index) => {
    setSecHeight(true)
    props.categoryHeighthandler(true)
    props.changeTab(index)
  }
  let heightIncrm = /* secHeight */props.chatCategoryHeight ? "maximum" : "minimum";
  let rotateDiv = /* rotate */props.chatCategoryHeight ? "normalButton" : "rotatingButton";
  const { activeTab, /* changeTab, */ getQuestion, catQuestion, chatTemplates, selecteCat, catEnglish } = props
  useEffect(() => {
    if (selecteCat !== 'General') {
      const selectedTemp = chatTemplates.filter((temp) => {
        return temp._id == selecteCat
      }).map((val) => {
        return {
          ...val,
          english: val && val.questions && val.questions['en']
        }
      });
      if (selectedTemp && selectedTemp.length){
        selectCategoryFun(selectedTemp[0])
      }
    }
  },[])
  
  return (
    <div className={props.className}>
      <span
        onClick={() => {
          heightRotateHandler();
        }}
        className={rotateDiv}
      >
        <img src={DROPARROW} />
      </span>
      <div className="chatOuter">
        <div id="chatTabs" className={heightIncrm}>
          <Tabs className="custom-mobile-tab-offer" selectedIndex={activeTab} onSelect={index => changeTab(index)} >
            <TabList>
              <Tab onClick={ImgCategoryHandler}>
                {" "}
                <img
                  className="tabIcon"
                  src={
                    activeTab
                      ? menuclicked
                      : menuunclicked
                  }
                  alt="lightning-bolt"
                />
                CATEGORY
              </Tab>
              <Tab onClick={ImgCategoryHandler}>
                {" "}
                <img className="tabIcon" src={
                  activeTab
                    ? ColQuestionIcon
                    : QuestionIcon
                } />
                QUESTIONS
              </Tab>
            </TabList>

            <TabPanel>
              <ChatSelectCategory categorySearchText={categorysearch} categorySearchHandler={categorySearchHandler} onSelect={selectCategoryFun} chatTemplates={chatTemplates} selecteCat={selecteCat} />
            </TabPanel>
            <TabPanel>
              <ChatQuestions catQuestion={catQuestion} sendMessage={props.sendMessage} heightRotateHandler={heightRotateHandler} catEnglish={catEnglish} />
            </TabPanel>
          </Tabs>
          <span></span>
        </div>
      </div>
    </div>
  );
}
