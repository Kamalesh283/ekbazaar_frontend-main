import React, { useState } from "react";
import "./CategoryList.scss";

export default function CategoryList(props) {
  // const [select, setSelect] = useState(props.selected ? false : true);
  // const [defaultSelect, setdefaultSelect] = useState(props.selected ? props.selected : false);
  // const slotClicked = () => {
  //   if (!select) setSelect(true);
  //   else setSelect(false);
  // };


  // let catgClass = select ? "CatgList" : "CatgListSelected";
  // // let catgClass = !select || props.selected ? "CatgListSelected" : "CatgList";
  // console.log(catgClass);
  return (
    // <span
    //   onClick={() => {
    //     slotClicked();
    //   }}
    //   className={props.className}
    // >
    <span>
      <div className={`CatgList ${props.selecteCat === props.value._id.toString() ? 'CatgListSelected' : ''}`} onClick={() => props.categoryClickHandler(props.value || '')}>
        <p>{props.list}</p>
      </div>
    </span>
  );
}
