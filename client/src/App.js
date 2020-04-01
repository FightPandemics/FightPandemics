import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

import { RouteWithSubRoutes } from "./components/RouteWithSubRoutes";
import { routes } from "./routes";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NeedHelp } from "./pages/NeedHelp";
import { OfferHelp } from "./pages/OfferHelp";
import { About } from "./pages/About";
import { Medical } from "./pages/Medical";
import { SymptomsCheck } from "./pages/SymptomsCheck";

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
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/need-help">
                <NeedHelp />
              </Route>
              <Route path="/offer-help">
                <OfferHelp />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/medical">
                <Medical />
              </Route>
              <Route path="/symptoms-check">
                <SymptomsCheck />
              </Route>
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
