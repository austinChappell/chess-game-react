import React, { Component } from 'react';
import Board from './Board';

import data from '../assets/data';
import pieces from '../assets/constructors/pieces';

const {
  Bishop,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
} = pieces;

const { icons } = data;

const {
  blackBishop,
  blackKing,
  blackKnight,
  blackPawn,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKing,
  whiteKnight,
  whitePawn,
  whiteQueen,
  whiteRook,
} = icons;

class App extends Component {
  state = {
    playerOne: {
      castled: false,
      checked: false,
      color: 'black',
    },
    playerTwo: {
      castled: false,
      checked: false,
      color: 'white',
    },
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
  render() {
    const {
      pieces,
    } = this.state;

    return (
      <div className="App">
        <Board
          pieces={pieces}
        />
      </div>
    );
  }
}

export default App;
