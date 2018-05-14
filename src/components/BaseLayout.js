import React, { Fragment } from 'react';

import NavBar from './NavBar';

const BaseLayout = (props) => {
  const {
    children,
  } = props;
  return (
    <Fragment>
      <NavBar />
      {children}
    </Fragment>
  );
};

export default BaseLayout;
