import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import store from '../store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      let newProps = store.getState();
      const { token } = newProps.userReducer;
      let component;

      if (token) {
        component = <Component {...props} />
      } else {
        component = <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      }
      return (
        component
      )
    }
    } />
  );
}

export default PrivateRoute;
