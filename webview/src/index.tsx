import React from "react";
import ReactDOM from "react-dom";
import { Row } from "antd";
import Drag from "./pages/drag";
import Antd from "./pages/antd";
import reportWebVitals from "./reportWebVitals";
import "./index.less";

ReactDOM.render(
  <React.StrictMode>
    <Row>
      <Drag />
    </Row>
    <Row>
      <Antd />
    </Row>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
