<<<<<<< HEAD
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";

import { Header } from './components/Header';
import { RouteWithSubRoutes } from './components/RouteWithSubRoutes';
import { routes } from './routes';

function App() {
    const { loading } = useAuth0();
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="App">
            <Router>
                <Header/>
                <main>
                    <Container>
                        <Switch>
                            { routes.map((route, i) => (
                                <RouteWithSubRoutes key={ i } { ...route } />
                            )) }
                        </Switch>
                    </Container>
                </main>
            </Router>
        </div>
    );
=======
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NeedHelp } from "./pages/NeedHelp";
import { OfferHelp } from "./pages/OfferHelp";
import { About } from "./pages/About";
import { Medical } from "./pages/Medical";

import FindHelp from "./pages/find-help/FindHelp";
import SymptomsCheck from "./pages/symptoms-check/SymptomsCheck";

import Page1 from "./pages/symptoms-check/pages/Page1";
import Page2 from "./pages/symptoms-check/pages/Page2";
import Page3 from "./pages/symptoms-check/pages/Page3";
import Page4 from "./pages/symptoms-check/pages/Page4";
import Page5 from "./pages/symptoms-check/pages/Page5";
import Page6 from "./pages/symptoms-check/pages/Page6";


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
              <Route path="/find-help">
                <FindHelp />
              </Route>
              <Route path="/symptoms-check">
                <SymptomsCheck />
              </Route>
              <Route path="/page1">
                <Page1 />
              </Route>
              <Route path="/page2">
                <Page2 />
              </Route>
              <Route path="/page3">
                <Page3 />
              </Route>
              <Route path="/page4">
                <Page4 />
              </Route>
              <Route path="/page5">
                <Page5 />
              </Route>
              <Route path="/page6">
                <Page6 />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
>>>>>>> Flesh out the symptoms testing plage, add find-help route
}

export default App;
