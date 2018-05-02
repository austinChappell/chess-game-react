import React from 'react';

const Piece = (props) => {
  const {
    left,
    piece,
    selected,
    selectPiece,
    top,
    width,
  } = props;

  const style = {
    border: selected ? '3px solid red' : 'none',
    left,
    top,
    height: width,
    width,
  }

  return (
    <div
      className="Piece"
      onClick={() => selectPiece(piece)}
      style={style}
    >
      <img
        className="chess-piece"
        src={piece.icon}
        alt={piece.label}
      />
    </div>
  )
}

export default Piece;