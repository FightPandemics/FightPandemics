import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NeedHelp } from './pages/NeedHelp';
import { About } from './pages/About';
import { Medical } from './pages/Medical';

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
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/medical">
                            <Medical />
                        </Route>
                    </Switch>
                </Container>
            </main>
        </Router>
    </div>
  );
}

export default App;
