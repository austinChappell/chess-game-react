import React, { Component, Fragment } from 'react';

import Piece from './Piece';
import Square from './Square';

class Board extends Component {
  state = {
    boardRows: [
      { label: 'A', top: 0 * 80 },
      { label: 'B', top: 1 * 80 },
      { label: 'C', top: 2 * 80 },
      { label: 'D', top: 3 * 80 },
      { label: 'E', top: 4 * 80 },
      { label: 'F', top: 5 * 80 },
      { label: 'G', top: 6 * 80 },
      { label: 'H', top: 7 * 80 },
    ],
    boardColumns: [
      { label: '1', left: 0 * 80 },
      { label: '2', left: 1 * 80 },
      { label: '3', left: 2 * 80 },
      { label: '4', left: 3 * 80 },
      { label: '5', left: 4 * 80 },
      { label: '6', left: 5 * 80 },
      { label: '7', left: 6 * 80 },
      { label: '8', left: 7 * 80 },
    ]
  }

  render() {
    const {
      boardColumns,
      boardRows,
    } = this.state;

    const {
      movePiece,
      pieces,
      selectPiece,
      squareWidth,
    } = this.props;

    const boardWidth = squareWidth * 8;

    const rows = boardColumns.map((col, index) => {
      return boardRows.map((row, rIndex) => {
        return {
          row: row.label,
          column: col.label,
          top: row.top,
          left: col.left,
        }
      })
    })

    const squares = [];
    rows.forEach(row => squares.push(...row));

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
            const {
              column,
              row,
            } = piece;

            // find the square that the piece is on
            const foundSquare = squares.find(sq => {
              return sq.row === row && sq.column === column;
            });

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
          onClick={() => movePiece(pieces[2], 'D', '2')}
        >
          Move
        </button>
      </Fragment>
    )
  }
}

export default Board;
