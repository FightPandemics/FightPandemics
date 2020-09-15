import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
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
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID,
};

TagManager.initialize(tagManagerArgs);

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <GlobalStyles />
      <App />
    </HelmetProvider>
  </Provider>,
  document.getElementById("root"),
);

serviceWorker.unregister();
