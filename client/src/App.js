import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { useAuth0 } from "./react-auth0-spa";
import { RouteWithSubRoutes } from "./templates/RouteWithSubRoutes";
import { routes } from "./routes";
import history from "./utils/history";

function App() {
  const { loading } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log({ loading });
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
