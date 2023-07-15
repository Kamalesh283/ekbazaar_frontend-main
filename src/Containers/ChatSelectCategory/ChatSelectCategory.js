import React, { useState, useEffect } from "react";
import Input from "../../Components/Input/Input";
import CrossMark from "../../Assets/Images/Cross.svg";
// import Input from "react-select/src/components/Input";
import "./ChatSelectCategory.scss";
import CategoryList from "../../Components/CategoryList/CategoryList";


export default function ChatSelectCategory(props) {
  const [crossClicked, setIsCrossClicked] = useState(false);
  const [categoryData, setCategoryData] = useState(props.chatTemplates || []);
  useEffect(() => {
    if (props.chatTemplates.length !== categoryData) {
      setCategoryData(props.chatTemplates)
    }
  }, [props.chatTemplates])

  useEffect(() => {
    if(props.selecteCat){
      let formatedChatTemp = props.chatTemplates;
      formatedChatTemp =  formatedChatTemp.reduce((acc,cur) => {
        if (cur._id == props.selecteCat){
          acc.unshift(cur)
        }else{
          acc.push(cur)
        }
        return acc
      },[])
      setCategoryData(formatedChatTemp)
    }
  },[])

  const toggleButton = () => {
    setIsCrossClicked(!crossClicked);
  };
  const filterCategory = (str) => {
    const fil = props.chatTemplates
    const data = str && fil.length ? fil.filter(val => val.name.toLowerCase().includes(str.toLowerCase())) : props.chatTemplates
    setCategoryData(data)
  }

  const { chatTemplates, selecteCat } = props
  const lang = localStorage.getItem('chatLanguage') || 'en'
  return (
    <>
      {crossClicked ? null : (
        <div className={props.className}>
          <div className="selectCategorySecInner">

            <Input
              className="SelectCatogerySearch"
              placeholdertext="Search"
              onChange={(e) => filterCategory(e)}
            />
            <div className="CatgMainCt">
              {
                categoryData && categoryData.length ? categoryData.map((val, index) => {
                  const data = {
                    ...val,
                    english: val && val.questions && val.questions['en']
                  }
                  return (
                    <CategoryList list={val.categoryNames[lang] ? val.categoryNames[lang] : val.categoryNames['en']} value={/* val */data}/* selected={true} */ categoryClickHandler={props.onSelect} selecteCat={selecteCat} eng={val.questions['en'][index]} />
                  )
                }) : <h4 className="notAval">Category not available</h4>
              }
            </div>

          </div>
        </div>
      )}
    </>
  );
}
