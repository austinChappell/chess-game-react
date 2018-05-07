import React, { Component } from 'react';

class Square extends Component {
  state = {}

  handleClick = () => {
    const {
      available,
      column,
      movePiece,
      row,
      selectedPiece,
    } = this.props;
    if (available) {
      movePiece(selectedPiece, row, column, true)
    }
  }

  render() {
    const {
      available,
      dark,
      left,
      top,
      width,
    } = this.props;

    const className = `Square ${dark ? 'dark' : 'light'}`;

    return (
      <div
        className={className}
        onClick={this.handleClick}
        style={{
          border: available ? '3px solid white' : '1px solid black',
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
