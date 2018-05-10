import React, { Fragment } from 'react';

import NavBar from './NavBar';

const BaseLayout = props => (
  <Fragment>
    <NavBar />
    {props.children}
  </Fragment>
);

export default BaseLayout;