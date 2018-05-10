import React, { Component } from 'react';

import AuthAPI from '../assets/api/auth';

const authAPI = new AuthAPI();

const {
  login,
} = authAPI;

class Login extends Component {
  state = {
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
    console.log('RESPONSE', res);
    if (res.username && this.state.signingUp) {
      this.setState({ signingUp: false }, () => {
        this.signIn();
      });
    } else if (res.token) {
      this.setUser(res);
    }
  }

  setUser = (user) => {
    console.log('SETTING USER', user);
  }

  signIn = () => {
    console.log('SIGNING IN');
    login(this.state, this.handleRes, this.state.signingUp);
  }

  toggleAuth = () => {
    this.setState({ signingUp: !this.state.signingUp });
  }

  render() {
    const {
      password,
      username,
    } = this.state;

    const switchMessage = this.state.signingUp ?
      (
        <p>Already have an account? <span onClick={this.toggleAuth}>Login</span></p>
      )
      :
      (
        <p>Need an account? <span onClick={this.toggleAuth}>Sign Up</span></p>
      )

    return (
      <div className="Login">
        <div>
          <label>username</label>
        </div>
        <div>
          <input
            onChange={e => this.handleChange(e, 'username')}
            value={username}
          />
        </div>
        <div>
          <label>password</label>
        </div>
        <div>
          <input
            onChange={e => this.handleChange(e, 'password')}
            value={password}
          />
        </div>
        <button
          onClick={this.signIn}
        >
          {this.state.signingUp ? 'Sign Up' : 'Login'}
        </button>
        {switchMessage}
      </div>
    );
  }
}

export default Login;
