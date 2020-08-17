import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';
import Results from './results';
import ContactDetails from './contact-details';

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={ContactDetails} />
        <Route exact path="/results" component={Results} />
        <Route path="/results/:id" component={Results} />
      </Switch>
    </div>
  </Router>
);

export default App;
