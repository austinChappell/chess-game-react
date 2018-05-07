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
        color: 'black',
        hasBeenChecked: false,
        isTurn: true,
        label: 'Player One',
      },
      {
        castled: false,
        color: 'white',
        hasBeenChecked: false,
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

  completeGame = () => {
    console.log('GAME COMPLETE');
  }

  kill = (index) => {
    const { pieces } = this.state;
    const piece = pieces[index]
    piece.alive = false;
    piece.row = null;
    piece.column = null;
    this.setState({ pieces });
  }

  listenForCheck = (color, pieces, destinationIndex, squares) => {
    // get all living pieces of opposite color, omitting the one about to be killed
    const livingPieces = pieces.filter((p, index) => {
      return p.alive && p.color !== color && index !== destinationIndex
    });
    // get current user's king
    const king = pieces.find(p => p.isKing && p.color === color);
    
    // all options for living pieces
    const allMoves = [];
    livingPieces.forEach((piece) => {
      const moves = piece.generateCurrentOptions(piece, squares, piece.row, piece.column, pieces);
      allMoves.push(...moves);
    });
    const kingPiece = allMoves.find(square => square.row === king.row && square.column === king.column);
    return kingPiece !== undefined;
  }

  listenForCheckmate = () => {
    let isCheckMate = true;
    const pieces = this.state.pieces.map(p => ({...p}))
    const activeColor = this.state.players.find(p => p.isTurn).color;
    // get all living pieces of opposite color, omitting the one about to be killed
    const livingPieces = pieces.filter((p, index) => {
      return p.alive && p.color === activeColor
    });

    livingPieces.forEach(piece => {
      const moves = piece.generateCurrentOptions(piece, this.state.squares, piece.row, piece.column, this.state.pieces);
      moves.forEach(move => {
        const putsSelfInCheck = this.prepMove(move.row, move.column, false, piece);
        if (!putsSelfInCheck) {
          isCheckMate = false;
        }
      })
    })
    return isCheckMate;
  }

  completeMove = (pieces, destinationIndex) => {
    const inactivePlayer = this.state.players.find(p => !p.isTurn);
    this.setState({ pieces }, () => {
      // if about to kill a piece
      const squares = this.state.squares.map(sq => ({...sq}));
      if (destinationIndex > -1) {
        this.kill(destinationIndex);
      }
      const check = this.listenForCheck(inactivePlayer.color, pieces, null, squares);
      this.switchTurn(check);
      this.clearWarning();
      this.clearSquares();
    })
  }

  // followThrough if set to true, will actually attempt the move
  // is set to false, it is just checking the result of the move
  prepMove = (row, column, followThrough, preSelectedPiece) => {
    const activePlayer = this.state.players.find(p => p.isTurn);
    const squares = this.state.squares.map(sq => {
      sq.piece = sq.piece ? {...sq.piece} : null;
      return {...sq};
    });
    const pieces = this.state.pieces.map(p => ({...p}));
    const square = getSquare(squares, row, column);
    const newPieces = pieces.map(p => ({ ...p }));

    // get piece where you are going
    const destinationResident = findPieceBySquare(squares, pieces, square);
    const destinationIndex = pieces.indexOf(destinationResident);

    const piece = preSelectedPiece ? preSelectedPiece : pieces.find(p => p.selected);
    // console.log('PIECE', piece);
    square.piece = square.piece ? {...piece} : null;
    const squareIndex = squares.indexOf(square);
    const newSquare = {...square};
    squares[squareIndex] = newSquare;

    // create new piece to replace old one
    const newPiece = {
      ...piece,
      column,
      hasMoved: true,
      row,
      selected: false,
    };
    const oldIndex = pieces.findIndex(p => p.row === row && p.column === column);
    const index = pieces.indexOf(piece);
    if (preSelectedPiece) {
      newPieces[oldIndex] = newPiece;
    } else {
      newPieces[index] = newPiece;
    }
    const putSelfInCheck = this.listenForCheck(activePlayer.color, newPieces, destinationIndex, squares);
    if (!followThrough) {
      return putSelfInCheck;
    } else if (putSelfInCheck) {
      this.warn('This will put yourself in check.')
    } else {
      this.completeMove(newPieces, destinationIndex);
    }
    this.clearSquares();
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
      pieces,
      players,
      squares,
    } = this.state;
    const moves = piece.generateCurrentOptions(piece, squares, piece.row, piece.column, pieces);
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

  switchTurn = (check) => {
    const { players } = this.state;
    players.forEach((p) => {
      if (p.isTurn) {
        p.isTurn = false;
      } else {
        p.isTurn = true;
        if (check) {
          p.hasBeenChecked = true;
        }
      }
    });
    // update players and see if check
    this.setState({
      check,
      players,
    }, () => {
      if (check) {
        const checkmate = this.listenForCheckmate();
        if (checkmate) {
          this.warn('CHECKMATE!');
          this.completeGame();
        } else {
          this.warn('CHECK!')
        }
      }
    });
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
          movePiece={this.prepMove}
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
