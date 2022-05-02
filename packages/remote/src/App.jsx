import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Remote - statically loading button</div>
    <Button/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
