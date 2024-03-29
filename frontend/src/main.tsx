import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Store from "./redux/Store";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";

const container: any = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
