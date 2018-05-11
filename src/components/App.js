import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/';

import BaseLayout from './BaseLayout';
import Game from './Game';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';

console.log('ENVIRONMENT', process.env.NODE_ENV);

class App extends Component {
  state = {}

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <BaseLayout>
              <Switch>
                <PrivateRoute component={Home} exact path="/" />
                <PrivateRoute component={Game} path="/game/:id" />
                <Route component={Game} path="/game" />
                <Route component={Login} path="/login" />
                <Route component={Logout} path="/logout" />
              </Switch>
            </BaseLayout>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
