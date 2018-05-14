import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AuthAPI from '../assets/api/auth';

const authAPI = new AuthAPI();

const {
  login,
} = authAPI;

class Login extends Component {
  state = {
    error: null,
    signingIn: false,
    signingUp: false,
    password: '',
    username: '',
  };

  handleChange = (evt, key) => {
    const o = {};
    o[key] = evt.target.value;
    this.setState(o);
  }

  handleRes = (res) => {
    this.setState({ signingIn: false }, () => {
      if (res.username && this.state.signingUp) {
        this.setState({ signingUp: false }, () => {
          this.signIn();
        });
      } else if (res.token) {
        this.setUser(res);
      } else if (res.error) {
        if (res.error.detail) {
          this.setState({ error: res.error.detail });
        } else {
          this.setState({ error: 'Invalid credentials' });
        }
      }
    });
  }

  setUser = (user) => {
    this.props.setUser(user);
  }

  signIn = () => {
    this.setState({ error: null, signingIn: true }, () => {
      login(this.state, this.handleRes, this.state.signingUp);
    });
  }

  toggleAuth = () => {
    this.setState({ signingUp: !this.state.signingUp });
  }

  render() {
    const {
      password,
      signingIn,
      signingUp,
      username,
    } = this.state;

    const {
      token,
    } = this.props;

    const switchMessage = this.state.signingUp ?
      (
        <p>Have an account? <span onClick={this.toggleAuth}>Login</span></p>
      )
      :
      (
        <p>Need an account? <span onClick={this.toggleAuth}>Sign Up</span></p>
      );

    const authRedirect = token ?
      <Redirect to={{
        pathname: "/",
        state: { from: this.props.location }
      }} />
      :
      null;

    const signingInMessage = this.state.signingIn ?
      (
        <div>
          <p>Please wait. Signing in to free Heroku server. This could take up to 15 seconds.</p>
        </div>
      )
      :
      null;

    const errorMessage = this.state.error ?
      (
        <div className="error">
          <p>{this.state.error}</p>
        </div>
      )
      :
      null;

    return (
      <div className="Login">
        {authRedirect}
        <div className="form-wrapper">
          <div>
            <label>username</label>
          </div>
          <div>
            <input
              disabled={signingIn}
              onChange={e => this.handleChange(e, 'username')}
              value={username}
            />
          </div>
          <div>
            <label>password</label>
          </div>
          <div>
            <input
              disabled={signingIn}
              onChange={e => this.handleChange(e, 'password')}
              type="password"
              value={password}
            />
          </div>
          {errorMessage}
          <button
            disabled={signingIn}
            onClick={this.signIn}
          >
            {signingUp ? 'Sign Up' : 'Login'}
          </button>
          {switchMessage}
          {signingInMessage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userReducer.token,
});

const mapDispatchToProps = dispatch => ({
  setUser: (data) => {
    const action = {
      type: 'SET_USER',
      data,
    };
    return dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
