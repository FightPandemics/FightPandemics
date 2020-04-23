import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";
import "typeface-poppins";
// import "typeface-work-sans";

import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import zIndex from "@material-ui/core/styles/zIndex";
const store = createStore(rootReducer, applyMiddleware(thunk));

const footerStyle = {
  backgroundColor: "#fff",
  fontSize: "10px",
  boxShadow: "0 2px 6px #bababa",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  zIndex: "3",
};
const links = {
  color: "silver",
  padding: "6px",
  textDecoration: "underline",
};
// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

const Footer = () => (
  <footer style={footerStyle}>
    <span style={{ fontWeight: "bold" }}>
      Copyright 2020 Fight Pandemic. All rights reserved.
    </span>
    <br />
    <a href="http://www.fightpandemics.com/terms-conditions" style={links}>Terms &amp; conditions</a>|
    <a href="http://www.fightpandemics.com/privacy-policy" style={links}>Privacy Policy</a>|<a href="http://www.fightpandemics.com/cookies-policy" style={links}>Cookies Policy</a>
  </footer>
);

const withFooter = (WrappedComponent) => () => [
  <WrappedComponent key="1" />,
  <Footer key="2" />,
];
const Wrapper = () => (
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </Provider>
);
const WrapperWithFooter = withFooter(Wrapper);
ReactDOM.render(<WrapperWithFooter />, document.getElementById("root"));

serviceWorker.unregister();
