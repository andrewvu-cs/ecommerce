import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

import store from './redux/store';

ReactDOM.render(
    // to access the redux store, must wrap our entire app with Provider from react-redux pkg
    // allows the store to be accessible through the app
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
