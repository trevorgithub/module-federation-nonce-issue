import React, { button } from "react";

import "./button.css";

const Button = () => {
  const [buttonClickCount, setButtonClickCount] = React.useState(0);

  const handleClick = () => {
    const newCount = buttonClickCount + 1;
    setButtonClickCount(newCount);
  };

  return (
    <button
      onClick={handleClick}
      className="button"
    >{`Click to increment counter.  Current: ${buttonClickCount}`}</button>
  );
};
export default Button;
