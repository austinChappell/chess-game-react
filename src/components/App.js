import React, { Component } from 'react';
import Board from './Board';

import pieceConstructors from '../assets/constructors/pieces';
import Helpers from '../assets/helpers';

const helpers = new Helpers();

const {
  findPieceBySquare,
  getSquare,
} = helpers;

const {
  Bishop,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
} = pieceConstructors;

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
  const rows = boardColumns.map(col => boardRows.map(row => ({
    row: row.label,
    column: col.label,
    top: row.top,
    left: col.left,
    available: false,
  })));

  const squares = [];
  rows.forEach(row => squares.push(...row));
  return squares;
};

class App extends Component {
  state = {
    players: [
      {
        castled: false,
        checked: false,
        color: 'black',
        hasBeenCheck: false,
        isTurn: true,
        label: 'Player One',
      },
      {
        castled: false,
        checked: false,
        color: 'white',
        hasBeenCheck: false,
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
    squares: generateSquares(),
    warning: null,
  }

  clearSquares = () => {
    const { squares } = this.state;
    squares.filter(sq => sq.available).forEach((sq) => {
      sq.available = false;
    });
    this.setState({ squares });
  }

  clearWarning = () => {
    this.setState({ warning: null });
  }

  kill = (piece) => {
    const { pieces } = this.state;
    piece.alive = false;
    piece.row = null;
    piece.column = null;
    this.setState({ pieces });
  }

  listenForCheck = (color) => {
    const {
      pieces,
      squares,
    } = this.state;
    // get all living pieces of opposite color
    const livingPieces = pieces.filter(p => p.alive && p.color !== color);
    const king = pieces.find(p => p.isKing && p.color === color);

    // all options for living pieces
    const allMoves = [];
    livingPieces.forEach((piece) => {
      const moves = piece.generateCurrentOptions(piece, squares, piece.row, piece.column);
      allMoves.push(...moves);
    });
    const kingPiece = allMoves.find(square => square.row === king.row && square.column === king.column);
    return kingPiece !== undefined;
  }

  movePiece = (row, column) => {
    const activePlayer = this.state.players.find(p => p.isTurn);
    const { squares } = this.state;
    const { pieces } = this.state;
    const square = getSquare(squares, row, column);

    // get piece where you are going
    const destinationResident = findPieceBySquare(squares, pieces, square);

    const piece = pieces.find(p => p.selected);

    // create new piece to replace old one
    const newPiece = {
      ...piece,
      column,
      hasMoved: true,
      row,
      selected: false,
    };
    const index = pieces.indexOf(piece);
    pieces[index] = newPiece;
    
    this.setState({ pieces }, () => {
      console.log('DESTINATION PIECE', destinationResident);
      const putSelfInCheck = this.listenForCheck(activePlayer.color);
      if (putSelfInCheck) {
        // logic to unde move and notify user
        this.moveBack(piece, index);
        this.warn('This will put yourself in check');
      } else {
        if (destinationResident) {
          this.kill(destinationResident);
        }
        this.switchTurn();
        this.clearWarning();
      }
      this.clearSquares();
    })
  }

  moveBack = (piece, index) => {
    const { pieces } = this.state;
    piece.selected = false;
    pieces[index] = piece;
    this.setState({ pieces });
  }

  revive = (piece, row, column) => {
    const { pieces } = this.state;
    piece.alive = true;
    piece.row = row;
    piece.row = column;
    this.setState({ pieces });
  }

  selectPiece = (piece) => {
    const {
      players,
      squares,
    } = this.state;
    const moves = piece.generateCurrentOptions(piece, squares, piece.row, piece.column);
    piece.currentMoves = moves;
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
        const square = getSquare(squares, move.row, move.column);
        square.available = true;
      });
    }
    this.setState({ squares });
  }

  switchTurn = () => {
    const { players } = this.state;
    players.forEach((p) => {
      if (p.isTurn) {
        p.isTurn = false;
      } else {
        p.isTurn = true;
      }
    });
    this.setState({ players });
  }

  warn = (warning) => {
    this.setState({ warning }, () => {
      setTimeout(() => {
        this.clearWarning();
      }, 2000);
    });
  }

  render() {
    const {
      pieces,
      squares,
    } = this.state;

    const warning = this.state.warning ?
      <h1>{this.state.warning}</h1>
      : null;

    return (
      <div className="App">
        <div className="warning">
          {warning}
        </div>
        <Board
          kill={this.kill}
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
