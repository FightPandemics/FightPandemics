import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";

import { initAuth } from "./actions/authActions";
import routes from "./routes";
import AppMetaContainer from "components/Meta/AppMetaContainer";
import RouteWithSubRoutes from "./templates/RouteWithSubRoutes";
import history from "./utils/history";

const App = (props) => {
  useEffect(() => {
    props.initAuth();
  }, [props]);

  function getDirection() {
    const systemLang = navigator.languages
      ? navigator.languages[0]
      : navigator.userLanguage || navigator.language;
    if (systemLang == "ar" || systemLang == "he") return "rtl";
    if (
      window.localStorage.getItem("locale") == "ar" ||
      window.localStorage.getItem("locale") == "he"
    )
      return "rtl";
    return "ltr";
  }

  return (
    <ConfigProvider direction={getDirection()}>
      <Router history={history}>
        <AppMetaContainer />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

const mapDispatchToProps = {
  initAuth: initAuth,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
