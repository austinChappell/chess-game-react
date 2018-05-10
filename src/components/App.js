import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BaseLayout from './BaseLayout';
import Game from './Game';
import Home from './Home';
import Login from './Login';

console.log('ENVIRONMENT', process.env.NODE_ENV);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <BaseLayout>
            <Switch>
              <Route component={Home} exact path="/" />
              <Route component={Game} path="/game" />
              <Route component={Login} path="/login" />
            </Switch>
          </BaseLayout>
        </Router>
      </div>
    );
  }
}

export default App;
