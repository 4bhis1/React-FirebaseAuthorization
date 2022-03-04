import React from "react";

import "../Pages/Search.css";

let Card = (props) => {
  return (
    <div className="container">
      <img src={props.src} height={props.height} width={props.width} />
      {/* <h4 className="text">{props.description}</h4> */}
    </div>
  );
};

export default Card;
