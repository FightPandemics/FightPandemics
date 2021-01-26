import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";
import Zendesk, { ZendeskAPI } from "react-zendesk";

import { initAuth } from "./actions/authActions";
import routes from "./routes";
import AppMetaContainer from "components/Meta/AppMetaContainer";
import RouteWithSubRoutes from "./templates/RouteWithSubRoutes";
import history from "./utils/history";
import ScrollToTop from "components/Scroll/ScrollTop";
import { getLang } from "i18n";

const App = (props) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    props.initAuth();
  }, [props]);

  useEffect(() => {
    const { language, systemLang } = getLang();
    TagManager.dataLayer({
      dataLayer: {
        systemLang,
        language,
      },
    });
  }, []);
  
  useEffect(() => {
    ZendeskAPI("webWidget", "setLocale", `${i18n.language}`);
  }, [i18n.language]);

  return (
    <Router history={history}>
      <AppMetaContainer />
      <ScrollToTop />
      <Zendesk zendeskKey={"95ac876b-8717-438b-ac57-7a2239714c9b"} />
      <Switch>
        {routes.map((route, i) => (
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
