import React, { Component, Fragment } from 'react';

import NavBar from './NavBar';

class BaseLayout extends Component {
  componentDidMount() {
    console.log('BASE LAYOUT MOUNTED');
  }

  render() {
    const {
      children,
    } = this.props;
    return (
      <Fragment>
        <NavBar />
        {children}
      </Fragment>
    );
  }
}

export default BaseLayout;
