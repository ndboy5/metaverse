import React from "react";

import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle }) => {
  return (
    <div className={Style.box}>
      <a className={`item button ${classStyle}`} onClick={() => handleClick()}>
        {icon} {btnName}
      </a>
    </div>
  );
};

export default Button;
