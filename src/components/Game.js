import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import data from '../assets/data';

import Board from './Board';

import pieceConstructors from '../assets/constructors/pieces';
import Helpers from '../assets/helpers';

const { baseAPI } = data;
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

const generateSquares = (reverse) => {
  const boardRows = [
    { label: 1, top: reverse ? 7 * 80 : 0 * 80 },
    { label: 2, top: reverse ? 6 * 80 : 1 * 80 },
    { label: 3, top: reverse ? 5 * 80 : 2 * 80 },
    { label: 4, top: reverse ? 4 * 80 : 3 * 80 },
    { label: 5, top: reverse ? 3 * 80 : 4 * 80 },
    { label: 6, top: reverse ? 2 * 80 : 5 * 80 },
    { label: 7, top: reverse ? 1 * 80 : 6 * 80 },
    { label: 8, top: reverse ? 0 * 80 : 7 * 80 },
  ];
  
  const boardColumns = [
    { label: 1, left: reverse ? 7 * 80 : 0 * 80 },
    { label: 2, left: reverse ? 6 * 80 : 1 * 80 },
    { label: 3, left: reverse ? 5 * 80 : 2 * 80 },
    { label: 4, left: reverse ? 4 * 80 : 3 * 80 },
    { label: 5, left: reverse ? 3 * 80 : 4 * 80 },
    { label: 6, left: reverse ? 2 * 80 : 5 * 80 },
    { label: 7, left: reverse ? 1 * 80 : 6 * 80 },
    { label: 8, left: reverse ? 0 * 80 : 7 * 80 },
  ];
  
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

// randomly assign mutli players by who has the lower id
// will either be 1 or 0
const playerOneLower = Math.floor(Math.random() * 2) === 0;

class Game extends Component {
  state = {
    gameOver: false,
    players: [
      {
        castled: false,
        color: 'black',
        hasBeenChecked: false,
        isTurn: false,
        label: 'Player One',
      },
      {
        castled: false,
        color: 'white',
        hasBeenChecked: false,
        isTurn: true,
        label: 'Player Two',
      },
    ],
    pieces: [
      new Pawn('white', 7, 1, -1),
      new Pawn('white', 7, 2, -1),
      new Pawn('white', 7, 3, -1),
      new Pawn('white', 7, 4, -1),
      new Pawn('white', 7, 5, -1),
      new Pawn('white', 7, 6, -1),
      new Pawn('white', 7, 7, -1),
      new Pawn('white', 7, 8, -1),
      new Rook('white', 8, 1),
      new Knight('white', 8, 2),
      new Bishop('white', 8, 3),
      new Queen('white', 8, 4),
      new King('white', 8, 5),
      new Bishop('white', 8, 6),
      new Knight('white', 8, 7),
      new Rook('white', 8, 8),
      new Pawn('black', 2, 1, 1),
      new Pawn('black', 2, 2, 1),
      new Pawn('black', 2, 3, 1),
      new Pawn('black', 2, 4, 1),
      new Pawn('black', 2, 5, 1),
      new Pawn('black', 2, 6, 1),
      new Pawn('black', 2, 7, 1),
      new Pawn('black', 2, 8, 1),
      new Rook('black', 1, 1),
      new Knight('black', 1, 2),
      new Bishop('black', 1, 3),
      new Queen('black', 1, 4),
      new King('black', 1, 5),
      new Bishop('black', 1, 6),
      new Knight('black', 1, 7),
      new Rook('black', 1, 8),
    ],
    squares: generateSquares(),
    warning: null,
  }

  componentDidMount() {
    const gameId = this.props.match.params.id;
    const query = this.props.location.search;
    const whiteId = query.split('=')[1];
    this.setMutliPlayer(gameId, whiteId);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setMutliPlayer = (gameId, whiteId) => {
    this.setState({ gameId }, () => {
      this.socket = io(baseAPI);

      const room = gameId;

      this.socket.on('connect', () => {
        const userId = this.props.user.id;
        this.socket.emit('ROOM', { room, userId });
      });

      this.socket.on('RECEIVE_ID', (userId) => {
        console.log('RECEIVED AN ID', userId);
      });

      this.socket.on('PUSH_MOVE', ({
        row,
        column,
        followThrough,
        oldPiece,
        userId,
      }) => {
        // came from opponent
        // preents recursion
        if (userId !== this.props.user.id) {
          const self = this.state.players.find(p => p.id === this.props.user.id);
          const selectedPiece = this.state.pieces.find((p) => {
            return p.row === oldPiece.row && p.column === oldPiece.column;
          });
          if (selectedPiece) {
            selectedPiece.selected = true;
          }

          // opponent is moving
          // selectedPiece will be undefined when it comes back from the server
          if (selectedPiece && self.color !== selectedPiece.color) {
            this.prepMove(row, column, followThrough, false);
          }
        }
      });

      this.socket.on('PUSH_SELECT_PIECE', ({ piece, userId }) => {
        if (this.props.user.id !== userId) {
          const newPiece = this.state.pieces.find((p) => {
            return p.row === piece.row && p.column === piece.column;
          });
          this.selectPiece(newPiece, true);
        }
      });

      // assign user ids to players
      this.socket.on('RECEIVE_IDS', ({ whiteId, blackId }) => {
        const { players } = this.state;
        const blackPlayer = players.find(p => p.color === 'black');
        const whitePlayer = players.find(p => p. color === 'white');
        blackPlayer.id = blackId;
        whitePlayer.id = Number(whiteId);
        this.setState({ players });
      });
  
      if (this.props.user.id !== Number(whiteId)) {
        this.socket.emit('SET_IDS', { whiteId, blackId: this.props.user.id });
        // flipboard
        const squares = generateSquares(true);
        this.setState({ squares });
      }
    });
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
    this.setState({ gameOver: true });
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
    const pieces = this.state.pieces.map(p => ({ ...p }))
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
      const squares = this.state.squares.map(sq => ({ ...sq }));
      if (destinationIndex > -1) {
        this.kill(destinationIndex);
      }
      const check = this.listenForCheck(inactivePlayer.color, pieces, null, squares);
      this.switchTurn(check);
      this.clearWarning();
      this.clearSquares();
    });
  }

  // followThrough if set to true, will actually attempt the move
  // is set to false, it is just checking the result of the move
  prepMove = (row, column, followThrough, preSelectedPiece) => {
    const activePlayer = this.state.players.find(p => p.isTurn);
    const squares = this.state.squares.map(sq => {
      sq.piece = sq.piece ? { ...sq.piece } : null;
      return { ...sq };
    });
    const pieces = this.state.pieces.map(p => ({ ...p }));
    const square = getSquare(squares, row, column);
    const newPieces = pieces.map(p => ({ ...p }));

    // get piece where you are going
    const destinationResident = findPieceBySquare(squares, pieces, square);
    const destinationIndex = pieces.indexOf(destinationResident);

    const piece = preSelectedPiece ? preSelectedPiece : pieces.find(p => p.selected);

    // get old copy to send to server
    const oldPiece = { ...piece };

    square.piece = square.piece ? { ...piece } : null;
    const squareIndex = squares.indexOf(square);
    const newSquare = { ...square };
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

    const isTwoOver = Math.abs(piece.column - column) === 2;
    const isCastling = piece.isKing && isTwoOver;
    if (isCastling) {
      const isLeft = column < piece.column;
      const rookColumn = isLeft ? 1 : 8;
      const rook = findPieceBySquare(squares, pieces, { row: piece.row, column: rookColumn })
      const rookIndex = pieces.findIndex(p => p.row === row && p.column === rookColumn);

      // move the rook for the castle
      rook.column = isLeft ? column + 1 : column - 1;
      newPieces[rookIndex] = rook;
      activePlayer.castled = true;
    }

    const putSelfInCheck = this.listenForCheck(activePlayer.color, newPieces, destinationIndex, squares);
    if (!followThrough) {
      return putSelfInCheck;
    } else if (putSelfInCheck) {
      this.warn('This will put yourself in check.', true)
    } else {
      if (this.state.gameId) {
        const userId = this.props.user.id;
        this.socket.emit('MOVE_PIECE', {
          row,
          column,
          followThrough,
          oldPiece,
          userId,
        });
      }
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

  selectPiece = (piece, fromSocket) => {
    const userId = this.props.user.id;
    const activeUser = this.state.players.find(p => p.isTurn);
    if (userId === activeUser.id || !this.state.gameId) {
      // if (!fromSocket) {
      //   this.socket.emit('SELECT_PIECE', { piece, userId });
      // }
      const {
        gameOver,
        pieces,
        players,
        squares,
      } = this.state;
      const activePlayer = players.find(p => p.isTurn);
      const activeColor = activePlayer.color;
      const moves = piece.generateCurrentOptions(piece, squares, piece.row, piece.column, pieces, activePlayer);
      piece.currentMoves = moves;
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
        if (!gameOver) {
          this.setState({ pieces }, () => {
            this.setCurrentChoices();
          });
        }
      }
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
          this.warn('CHECKMATE!', false);
          this.completeGame();
        } else {
          this.warn('CHECK!', true)
        }
      }
    });
  }

  warn = (warning, clear) => {
    this.setState({ warning }, () => {
      if (clear) {
        setTimeout(() => {
          this.clearWarning();
        }, 2000);
      }
    });
  }

  render() {
    const {
      gameId,
      pieces,
      players,
      squares,
    } = this.state;

    const { user } = this.props;

    const warning = this.state.warning ?
      <h1>{this.state.warning}</h1>
      : null;

    const myTurn = gameId ? players.find(p => p.isTurn).id === user.id : null;
    const turnNotification = myTurn ? (
      <h2>Your move. Click piece and square to select and move.</h2>
    )
    :
    null;
    const instructions = gameId ?
      turnNotification
      :
      <h2>Click piece and square to select and move.</h2>;

    return (
      <div className="Game">
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
        <div style={{ height: 100 }}>
          {instructions}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Game);
