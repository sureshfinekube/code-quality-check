import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let rootContent;

window.renderContract = (containerId, history) => {
  if (rootContent) {
    rootContent.unmount();
    rootContent = createRoot(document.getElementById(containerId));
    rootContent.render(<App history={history} />);
  } else {
    rootContent = createRoot(document.getElementById(containerId));
    rootContent.render(<App history={history} />);
  }
};

window.unmountContract = (containerId) => {
  rootContent.unmount();
};

if (!document.getElementById("Contract-container")) {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
