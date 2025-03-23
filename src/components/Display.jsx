import React from "react";
import "./display.css";

function display({ description, position, title }) {
  // console.log(description);

  return (
    <div className={`display-container display-${position}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default display;
