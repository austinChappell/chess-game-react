import React, { Component } from 'react';

class Square extends Component {
  state = {}

  render() {
    const {
      dark,
      piece,
    } = this.props;

    const chessPiece = piece ? (
      <img
        className="chess-piece"
        src={piece.icon}
        alt={piece.label}
      />
    ) : null;

    console.log('CHESS PIECE', piece)
    const className = `Square ${dark ? 'dark' : 'light'}`;
    const color = piece ? piece.color : '';

    return (
      <div
        className={className}
        style={{
          color,
        }}
      >
        {chessPiece}
      </div>
    )
  }
}

export default Square;
