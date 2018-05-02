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
      new Pawn('black', 7, 5, -1),
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
      new Pawn('white', 2, 6, 1),
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
  }

  movePiece = (piece, row, column) => {
    const pieces = this.state.pieces.slice();
    const newPiece = {
      ...piece,
      column,
      hasMoved: true,
      row,
      selected: false,
    };
    const index = pieces.indexOf(piece);
    pieces[index] = newPiece;
    this.setState({ pieces });
  }

  selectPiece = (piece) => {
    const activeColor = this.state.players.find(p => p.isTurn).color;
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
      this.setState({ pieces });
    }
  }

  render() {
    const {
      pieces,
    } = this.state;

    return (
      <div className="App">
        <Board
          movePiece={this.movePiece}
          pieces={pieces}
          selectPiece={this.selectPiece}
          squareWidth={80}
        />
      </div>
    );
  }
}

export default App;
