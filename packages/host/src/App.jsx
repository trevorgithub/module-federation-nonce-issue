import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const MyButton = React.lazy(() => import("button-remote/Button"));

const App = () => (
  <div className="container">
    <div>Host - dynamically loading button</div>
    <Suspense fallback="Loading remote button">
      <MyButton />
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
