import React, { useState } from "react";
import QuestionTemplate from "../../Components/QuestionTemplate/QuestionTemplate";
import DROPARROW from "../../Assets/Images/downarrow1.svg";
import "./ChatQuestions.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function ChatQuestions(props) {
  // const [secHeight, setSecHeight] = useState(true);
  // const [rotate, setRotate] = useState(true);

  // const heightHandler = () => {
  //   if (!secHeight) setSecHeight(true);
  //   else setSecHeight(false);
  // };
  // const rotateHandler = () => {
  //   if (!rotate) setRotate(true);
  //   else setRotate(false);
  // };
  // let heightIncrm = secHeight ? "QuestionContainer" : "QuestionContainerIncrm";
  // let rotateDiv = rotate ? "normalButton" : "rotatingButton";

  // const heightRotateHandler = () => {
  //   heightHandler();
  //   rotateHandler();
  // };
  const { catEnglish, catQuestion } = props
  return (
    <div className="MainContainer">


      <div>
        {/* <h3 className="QuestionTitle">Please select a question</h3> */}
        <div className="QustionCt">
          {props.catQuestion && props.catQuestion.length ? props.catQuestion.map((val, index) => {
            // const data = {
            //   ...val,
            //   english: val && val.questions && val.questions['en']
            // }
            return (

              <QuestionTemplate question={val} sendMessage={props.sendMessage} heightRotateHandler={props.heightRotateHandler} eng={catEnglish && catEnglish[index] && catEnglish[index] || val} />
            )
          }) : false}
          {/* <QuestionTemplate question="What is the place of origin of rice ?" />
        <QuestionTemplate question="What is the minimum and maximum quantity that you can deliver each month" />
        <QuestionTemplate question="How many days do you take to deliver" /> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  catQuestion: state.chat.chatCategoryData.questions,
  
});

export default connect(mapStateToProps, null)(ChatQuestions);
