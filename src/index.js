import React from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "./context/StateProvider";
import reducer, { initialState } from "./context/reducer";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
