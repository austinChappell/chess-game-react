import React, { Component } from 'react';

class Login extends Component {
  state = {
    password: '',
    username: '',
  };

  handleChange = (evt, key) => {
    const o = {};
    o[key] = evt.target.value;
    this.setState(o);
  }

  signIn = () => {
    console.log('SIGNING IN');
  }

  render() {
    const {
      password,
      username,
    } = this.state;
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
          Sign In
        </button>
      </div>
    );
  }
}

export default Login;
