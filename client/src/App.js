import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { RouteWithSubRoutes } from "./templates/RouteWithSubRoutes";
import { routes } from "./routes";
import history from "./utils/history";

function App(props) {
  console.log({ props });
  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
