import React, { Component } from 'react';

class Square extends Component {
  state = {}

  render() {
    const {
      dark,
      left,
      top,
      width,
    } = this.props;

    const className = `Square ${dark ? 'dark' : 'light'}`;

    return (
      <div
        className={className}
        style={{
          left,
          top,
          height: width,
          width,
        }}
      />
    )
  }
}

export default Square;
