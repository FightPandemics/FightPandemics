import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { initAuth } from "./actions/authActions";
import routes from "./routes";
import RouteWithSubRoutes from "./templates/RouteWithSubRoutes";
import history from "./utils/history";
import TagManager from 'react-gtm-module';


const App = (props) => {
  useEffect(() => {
    props.initAuth();
  }, [props]);

  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
};

const tagManagerArgs = {
  gtmId: 'GTM-TT348T3'
}

TagManager.initialize(tagManagerArgs)


const mapDispatchToProps = {
  initAuth: initAuth,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
