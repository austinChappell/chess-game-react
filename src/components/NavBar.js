import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = (props) => {
  const {
    token,
  } = props;

  const authPath = token ? '/logout' : '/login';
  const authLabel = token ? 'Logout' : 'Login';

  return (
    <div className="NavBar">
      <div>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/game">
          Single Player
        </NavLink>
      </div>
      <div>
        <NavLink to={authPath}>
          {authLabel}
        </NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(NavBar);