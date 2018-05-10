import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => (
  <div className="NavBar">
    <NavLink to="/">
      Home
    </NavLink>
    <NavLink to="/login">
      Login
    </NavLink>
    <NavLink to="/game">
      Play
    </NavLink>
  </div>
);

export default NavBar;