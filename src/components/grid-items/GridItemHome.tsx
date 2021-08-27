import React from "react";

import '../../styles/UI/grid-items/grid-item-home.scss';
// const jesus = require("../../../assets/jesus-for-categories.jpg");
const theotokos = "assets/glykofilousa-categories.jpg";
const john = "assets/john-for-categories.jpg";

const GridItemHome = (props: any) => { //{ id, playHandler, style, title }
  let image = null;
  switch (props.id) {
    case "Multi":
      image = theotokos;
      break;
    case "TrueFalse":
      image = john;
      break;
    default:
      image = theotokos;
      break;
  }




  return (
    <li onClick={props.onClick} className='grid-icon-container' >
      <div className="grid-icon">
        <img src={image} alt="grid item icon" />
      </div>
      <p className='grid-title' >{props.title}</p>
    </li >
  );
};

export default GridItemHome;
