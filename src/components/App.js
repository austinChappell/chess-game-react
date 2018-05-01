import React, { Component } from 'react';
import Board from './Board';

import data from '../assets/data';

console.log('DATA', data);

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
      {
        label: 'Pawn',
        row: 'G',
        column: '1',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '2',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '3',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '4',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '5',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '6',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '7',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Pawn',
        row: 'G',
        column: '8',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'black',
        icon: blackPawn,
      },
      {
        label: 'Rook',
        row: 'H',
        column: '1',
        alive: true,
        hasMoved: false,
        type: 'rook',
        color: 'black',
        icon: blackRook,
      },
      {
        label: 'Knight',
        row: 'H',
        column: '2',
        alive: true,
        hasMoved: false,
        type: 'knight',
        color: 'black',
        icon: blackKnight,
      },
      {
        label: 'Bishop',
        row: 'H',
        column: '3',
        alive: true,
        hasMoved: false,
        type: 'bishop',
        color: 'black',
        icon: blackBishop,
      },
      {
        label: 'King',
        row: 'H',
        column: '4',
        alive: true,
        hasMoved: false,
        type: 'king',
        color: 'black',
        icon: blackKing,
      },
      {
        label: 'Queen',
        row: 'H',
        column: '5',
        alive: true,
        hasMoved: false,
        type: 'queen',
        color: 'black',
        icon: blackQueen,
      },
      {
        label: 'Bishop',
        row: 'H',
        column: '6',
        alive: true,
        hasMoved: false,
        type: 'bishop',
        color: 'black',
        icon: blackBishop,
      },
      {
        label: 'Knight',
        row: 'H',
        column: '7',
        alive: true,
        hasMoved: false,
        type: 'knight',
        color: 'black',
        icon: blackKnight,
      },
      {
        label: 'Rook',
        row: 'H',
        column: '8',
        alive: true,
        hasMoved: false,
        type: 'rook',
        color: 'black',
        icon: blackRook,
      },



















      {
        label: 'Pawn',
        row: 'B',
        column: '1',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '2',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '3',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '4',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '5',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '6',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '7',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Pawn',
        row: 'B',
        column: '8',
        alive: true,
        hasMoved: false,
        type: 'pawn',
        color: 'white',
        icon: whitePawn,
      },
      {
        label: 'Rook',
        row: 'A',
        column: '1',
        alive: true,
        hasMoved: false,
        type: 'rook',
        color: 'white',
        icon: whiteRook,
      },
      {
        label: 'Knight',
        row: 'A',
        column: '2',
        alive: true,
        hasMoved: false,
        type: 'knight',
        color: 'white',
        icon: whiteKnight,
      },
      {
        label: 'Bishop',
        row: 'A',
        column: '3',
        alive: true,
        hasMoved: false,
        type: 'bishop',
        color: 'white',
        icon: whiteBishop,
      },
      {
        label: 'King',
        row: 'A',
        column: '4',
        alive: true,
        hasMoved: false,
        type: 'king',
        color: 'white',
        icon: whiteKing,
      },
      {
        label: 'Queen',
        row: 'A',
        column: '5',
        alive: true,
        hasMoved: false,
        type: 'queen',
        color: 'white',
        icon: whiteQueen,
      },
      {
        label: 'Bishop',
        row: 'A',
        column: '6',
        alive: true,
        hasMoved: false,
        type: 'bishop',
        color: 'white',
        icon: whiteBishop,
      },
      {
        label: 'Knight',
        row: 'A',
        column: '7',
        alive: true,
        hasMoved: false,
        type: 'knight',
        color: 'white',
        icon: whiteKnight,
      },
      {
        label: 'Rook',
        row: 'A',
        column: '8',
        alive: true,
        hasMoved: false,
        type: 'rook',
        color: 'white',
        icon: whiteRook,
      },

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
