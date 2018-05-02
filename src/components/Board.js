import React, { Component, Fragment } from 'react';

import Helpers from '../assets/helpers';

import Piece from './Piece';
import Square from './Square';

const helpers = new Helpers();

const {
  findPieceBySquare,
  findSquareByPiece,
} = helpers;

class Board extends Component {
  state = {}

  render() {    
    const {
      movePiece,
      pieces,
      selectPiece,
      squares,
      squareWidth,
    } = this.props;

    const boardWidth = squareWidth * 8;

    console.log('PIECES', pieces);

    return (
      <Fragment>
        <div
          className="Board"
          style={{
            height: boardWidth,
            width: boardWidth,
          }}
        >
          {pieces.map((piece, index) => {
            // find the square that the piece is on
            const foundSquare = findSquareByPiece(pieces, squares, piece);

            return (
              <Piece
                key={index}
                top={foundSquare.top}
                left={foundSquare.left}
                piece={piece}
                selected={piece.selected}
                selectPiece={selectPiece}
                width={squareWidth}
              />
            )
          })}
          {squares.map((square, index) => {
            const {
              top,
              left,
            } = square;

            // mark a square as occupied
            const foundPiece = findPieceBySquare(squares, pieces, square);
            square.piece = foundPiece;

            const evenRow = top % (squareWidth * 2) === 0;
            const evenColumn = left % (squareWidth * 2) === 0;
            const dark = evenRow === evenColumn;
            return (
              <Square
                key={index}
                dark={dark}
                left={left}
                top={top}
                width={squareWidth}
              />
            )
          })}
        </div>
        <button
          onClick={() => movePiece(pieces[2], 4, 2)}
        >
          Move
        </button>
      </Fragment>
    )
  }
}

export default Board;
