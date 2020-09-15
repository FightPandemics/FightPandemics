import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { initAuth } from "./actions/authActions";
import routes from "./routes";
import AppMetaContainer from "components/Meta/AppMetaContainer";
import RouteWithSubRoutes from "./templates/RouteWithSubRoutes";
import history from "./utils/history";
import i18n from "./i18n";
import { rtlLanguages } from "constants/languages";

const App = (props) => {
  const [direction, setDirection] = useState("ltr");

  const setLanguageDirection = (lng) => {
    if (rtlLanguages.includes(lng)) {
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  };

  useEffect(() => {
    props.initAuth();
  }, [props]);

  i18n.on("initialized", () => {
    setLanguageDirection(i18n.language);
  });

  i18n.on("languageChanged", (lng) => {
    setLanguageDirection(lng);
  });

  const routesWithDirection = routes.map((route) => ({
    ...route,
    props: { ...route.props, direction },
  }));

  return (
    <Router history={history}>
      <AppMetaContainer />
      <Switch>
        {routesWithDirection.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = {
  initAuth: initAuth,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
