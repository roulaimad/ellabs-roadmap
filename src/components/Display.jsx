import React from "react";
import "./display.css";

function display({ id, description, position, title }) {
  // console.log(description);
  console.log(id);
  console.log(position);

  return (
    <div className={`display-container display-${position}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default display;
