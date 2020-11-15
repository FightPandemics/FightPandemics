import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { initAuth } from "./actions/authActions";
import routes from "./routes";
import AppMetaContainer from "components/Meta/AppMetaContainer";
import RouteWithSubRoutes from "./templates/RouteWithSubRoutes";
import history from "./utils/history";
import ScrollToTop from "components/Scroll/ScrollTop";

const App = (props) => {
  useEffect(() => {
    props.initAuth();
  }, [props]);

  return (
    <Router history={history}>
      <AppMetaContainer />
      <ScrollToTop />
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
