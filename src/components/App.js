import React, { Component } from 'react';
import Board from './Board';

import pieces from '../assets/constructors/pieces';

const {
  Bishop,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
} = pieces;

const boardRows = [
  { label: 1, top: 0 * 80 },
  { label: 2, top: 1 * 80 },
  { label: 3, top: 2 * 80 },
  { label: 4, top: 3 * 80 },
  { label: 5, top: 4 * 80 },
  { label: 6, top: 5 * 80 },
  { label: 7, top: 6 * 80 },
  { label: 8, top: 7 * 80 },
];

const boardColumns = [
  { label: 1, left: 0 * 80 },
  { label: 2, left: 1 * 80 },
  { label: 3, left: 2 * 80 },
  { label: 4, left: 3 * 80 },
  { label: 5, left: 4 * 80 },
  { label: 6, left: 5 * 80 },
  { label: 7, left: 6 * 80 },
  { label: 8, left: 7 * 80 },
];

const generateSquares = () => {
  const rows = boardColumns.map((col, index) => {
    return boardRows.map((row, rIndex) => {
      return {
        row: row.label,
        column: col.label,
        top: row.top,
        left: col.left,
        available: false,
      }
    })
  })

  const squares = [];
  rows.forEach(row => squares.push(...row));
  return squares;
}

class App extends Component {
  state = {
    players: [
      {
        castled: false,
        checked: false,
        color: 'black',
        isTurn: true,
        label: 'Player One',
      },
      {
        castled: false,
        checked: false,
        color: 'white',
        isTurn: false,
        label: 'Player Two',
      },
    ],
    pieces: [
      new Pawn('black', 7, 1, -1),
      new Pawn('black', 7, 2, -1),
      new Pawn('black', 7, 3, -1),
      new Pawn('black', 7, 4, -1),
      new Pawn('black', 5, 5, -1),
      new Pawn('black', 7, 6, -1),
      new Pawn('black', 7, 7, -1),
      new Pawn('black', 7, 8, -1),
      new Rook('black', 8, 1),
      new Knight('black', 8, 2),
      new Bishop('black', 8, 3),
      new King('black', 8, 4),
      new Queen('black', 8, 5),
      new Bishop('black', 8, 6),
      new Knight('black', 8, 7),
      new Rook('black', 8, 8),
      new Pawn('white', 2, 1, 1),
      new Pawn('white', 2, 2, 1),
      new Pawn('white', 2, 3, 1),
      new Pawn('white', 2, 4, 1),
      new Pawn('white', 2, 5, 1),
      new Pawn('white', 6, 6, 1),
      new Pawn('white', 2, 7, 1),
      new Pawn('white', 2, 8, 1),
      new Rook('white', 1, 1),
      new Knight('white', 1, 2),
      new Bishop('white', 1, 3),
      new King('white', 1, 4),
      new Queen('white', 1, 5),
      new Bishop('white', 1, 6),
      new Knight('white', 1, 7),
      new Rook('white', 1, 8),
    ],
    squares: generateSquares(),
  }

  clearSquares = () => {
    const { squares } = this.state;
    squares.filter(sq => sq.available).forEach((sq) => {
      sq.available = false;
    })
    this.setState({ squares });
  }

  movePiece = (row, column) => {
    const pieces = this.state.pieces.slice();
    const piece = pieces.find(p => p.selected);
    const newPiece = {
      ...piece,
      column,
      hasMoved: true,
      row,
      selected: false,
    };
    console.log('NEW PIECE', newPiece)
    const index = pieces.indexOf(piece);
    pieces[index] = newPiece;
    this.setState({ pieces }, () => {
      this.clearSquares();
    });
  }

  selectPiece = (piece) => {
    const {
      players,
      squares,
    } = this.state;
    piece.generateCurrentOptions(squares, piece.row, piece.column);
    const activeColor = players.find(p => p.isTurn).color;
    if (piece.color === activeColor) {
      const pieces = this.state.pieces.slice();
      const prevSelection = pieces.find(p => p.selected);
      if (prevSelection) {
        const index = pieces.indexOf(prevSelection);
        const deselected = {
          ...prevSelection,
          selected: false,
        };
        pieces[index] = deselected;
      }
      const newPiece = { ...piece, selected: !piece.selected };
      const index = pieces.indexOf(piece);
      pieces[index] = newPiece;
      this.setState({ pieces }, () => {
        this.setCurrentChoices();
      });
    }
  }

  setCurrentChoices = () => {
    const {
      pieces,
      squares,
    } = this.state;
    const selectedPiece = pieces.find(p => p.selected);
    const currentMoves = selectedPiece ? selectedPiece.currentMoves : null;
    squares.forEach((sq) => {
      sq.available = false;
    });
    if (currentMoves) {
      currentMoves.forEach((move) => {
        const square = squares.find((sq) => {
          return sq.row === move.row && sq.column === move.column;
        })
        square.available = true;
      })
    }
    this.setState({ squares });
  }

  render() {
    const {
      pieces,
      squares,
    } = this.state;

    return (
      <div className="App">
        <Board
          movePiece={this.movePiece}
          pieces={pieces}
          selectPiece={this.selectPiece}
          squares={squares}
          squareWidth={80}
        />
      </div>
    );
  }
}

export default App;
