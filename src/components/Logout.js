import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    this.logout();
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    const authRedirect = this.props.token ?
      null
      :
      <Redirect to="/" />;

    return (
      <div className="Logout">
        {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userReducer.token,
});

const mapDispatchToPrps = dispatch => ({
  logout: () => {
    const action = {
      type: 'LOGOUT',
    };
    return dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToPrps)(Logout);
