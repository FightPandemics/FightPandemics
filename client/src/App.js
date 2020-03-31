import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { useAuth0 } from "./react-auth0-spa";
import { Header } from "./components/Header";
import { RouteWithSubRoutes } from "./components/RouteWithSubRoutes";
import { routes } from "./routes";

function App() {
  const { loading } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Container>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;
