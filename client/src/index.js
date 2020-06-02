import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";
import "typeface-poppins";
import "typeface-work-sans";

import App from "./App";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root"),
);

serviceWorker.unregister();
