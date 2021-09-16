import React from "react";

import '../../styles/grid-items/grid-item-home.css';
// const jesus = require("../../../assets/jesus-categories.jpg");
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
    <li onClick={props.onClick} className='home-grid-list-item' >
      <div className="home-grid-icon-container">
        <img src={image} alt="grid item icon" />
      </div>
      <p className='home-grid-title' >{props.title}</p>
    </li >
  );
};

export default GridItemHome;
