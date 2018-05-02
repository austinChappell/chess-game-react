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
      new Pawn('black', 'G', '1'),
      new Pawn('black', 'G', '2'),
      new Pawn('black', 'G', '3'),
      new Pawn('black', 'G', '4'),
      new Pawn('black', 'G', '5'),
      new Pawn('black', 'G', '6'),
      new Pawn('black', 'G', '7'),
      new Pawn('black', 'G', '8'),
      new Rook('black', 'H', '1'),
      new Knight('black', 'H', '2'),
      new Bishop('black', 'H', '3'),
      new King('black', 'H', '4'),
      new Queen('black', 'H', '5'),
      new Bishop('black', 'H', '6'),
      new Knight('black', 'H', '7'),
      new Rook('black', 'H', '8'),
      new Pawn('white', 'B', '1'),
      new Pawn('white', 'B', '2'),
      new Pawn('white', 'B', '3'),
      new Pawn('white', 'B', '4'),
      new Pawn('white', 'B', '5'),
      new Pawn('white', 'B', '6'),
      new Pawn('white', 'B', '7'),
      new Pawn('white', 'B', '8'),
      new Rook('white', 'A', '1'),
      new Knight('white', 'A', '2'),
      new Bishop('white', 'A', '3'),
      new King('white', 'A', '4'),
      new Queen('white', 'A', '5'),
      new Bishop('white', 'A', '6'),
      new Knight('white', 'A', '7'),
      new Rook('white', 'A', '8'),
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
