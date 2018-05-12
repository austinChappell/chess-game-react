class Helpers {
  findPieceBySquare = (squares, pieces, square) => {
    const piece = pieces.find(p => p.row === square.row && p.column === square.column);
    return piece || null;
  }

  findSquareByPiece = (pieces, squares, piece) => {
    const square = squares.find(sq => sq.row === piece.row && sq.column === piece.column);
    return square || null;
  }

  findCurrentBishopMoves = (bishop, squares, pieceRow, pieceCol, pieces) => {
    if (pieceRow === 4 && pieceCol === 8) {
      console.log('BISHOP PIECES', pieces);
      console.log('BISHOP SQUARES', squares);
    }
    // console.log('BISHOP', bishop);
    let maxQ1 = 8;
    let maxQ2 = 8;
    let maxQ3 = 8;
    let maxQ4 = 8;

    const options = squares.filter((square) => {
      // const currentPiece = this.findPieceBySquare(squares, pieces, square);
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);
      const occupied = currentPiece !== undefined;
      const {
        column: squareCol,
        row: squareRow,
      } = square;

      const rowDiff = squareRow - pieceRow;
      const colDiff = squareCol - pieceCol;
      const isDiag = Math.abs(rowDiff) === Math.abs(colDiff);
      const self = squareRow === pieceRow && squareCol === pieceCol;
      const isQuadrant1 = rowDiff > 0 && colDiff > 0;
      const isQuadrant2 = rowDiff < 0 && colDiff > 0;
      const isQuadrant3 = rowDiff < 0 && colDiff < 0;
      const isQuadrant4 = rowDiff > 0 && colDiff < 0;
      const numOfSteps = Math.abs(rowDiff);

      if (isDiag && occupied) {
        if (isQuadrant1 && numOfSteps < maxQ1) {
          maxQ1 = numOfSteps;
        } else if (isQuadrant2 && numOfSteps < maxQ2) {
          maxQ2 = numOfSteps;
        } else if (isQuadrant3 && numOfSteps < maxQ3) {
          maxQ3 = numOfSteps;
        } else if (isQuadrant4 && numOfSteps < maxQ4) {
          maxQ4 = numOfSteps;
        }
      }

      return isDiag && !self;
    });

    return options.filter((square) => {
      // console.log('BISHOP SQUARES', squares);
      // const currentPiece = this.findPieceBySquare(squares, pieces, square);
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);

      const occupiedBySelf = currentPiece ? currentPiece.color === bishop.color : false;
      
      const {
        column: squareCol,
        row: squareRow,
      } = square;
      
      const rowDiff = squareRow - pieceRow;
      const colDiff = squareCol - pieceCol;
      const isQuadrant1 = rowDiff > 0 && colDiff > 0;
      const isQuadrant2 = rowDiff < 0 && colDiff > 0;
      const isQuadrant3 = rowDiff < 0 && colDiff < 0;
      const isQuadrant4 = rowDiff > 0 && colDiff < 0;
      const numOfSteps = Math.abs(rowDiff);
      let isValid = false;
      
      // block off bishop if piece is in the way
      if (isQuadrant1) {
        isValid = numOfSteps <= maxQ1 && !occupiedBySelf;
      } else if (isQuadrant2) {
        isValid = numOfSteps <= maxQ2 && !occupiedBySelf;
      } else if (isQuadrant3) {
        isValid = numOfSteps <= maxQ3 && !occupiedBySelf;
      } else if (isQuadrant4) {
        isValid = numOfSteps <= maxQ4 && !occupiedBySelf;
      }
      return isValid;
    });
  }

  findCurrentKingMoves = (king, squares, pieceRow, pieceCol, pieces, player) => {
    // only get this value if it is passed in.
    // otherwise, we do not want to get castle options, as we are then looking for "check-escapes"
    const hasBeenChecked = player ? player.hasBeenChecked : true;
    const { hasMoved } = king;
    const columns = [1,2,3,4,5,6,7,8];

    // getting the corner rooks for castling
    const rightCornerPiece = this.findPieceBySquare(squares, pieces, { row: pieceRow, column: 8 });
    const leftCornerPiece = this.findPieceBySquare(squares, pieces, { row: pieceRow, column: 1 });

    // return array of numbers for columns to right and left of king, not including the outer columns
    const rightSideColumns = columns.filter(col => col < 8 && col > pieceCol);
    const leftSideColumns = columns.filter(col => col > 1 && col < pieceCol);

    // get squares directly to right or left of king using filtered columns
    const rightSideSquares = squares.filter(sq => sq.row === pieceRow && rightSideColumns.includes(sq.column));
    const leftSideSquares = squares.filter(sq => sq.row === pieceRow && leftSideColumns.includes(sq.column));

    // determine if there are any pieces in these columns
    const rightSideOpen = rightSideSquares.every(sq => !sq.piece);
    const leftSideOpen = leftSideSquares.every(sq => !sq.piece);

    return squares.filter((square) => {
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);

      const occupiedBySelf = currentPiece ? currentPiece.color === king.color : false;
      const {
        column: squareCol,
        row: squareRow,
      } = square;

      let castleMove = false;
      const rowDiff = Math.abs(squareRow - pieceRow);
      const colDiff = Math.abs(squareCol - pieceCol);
      const isRight = squareCol - pieceCol > 0;
      const isLeft = squareCol - pieceCol < 0;
      const isOneStep = rowDiff <= 1 && colDiff <= 1;
      const canCastle = !hasBeenChecked && !hasMoved;
      const isTwoToSide = rowDiff === 0 && colDiff === 2;
      if (isTwoToSide) {
        if (isRight && rightCornerPiece) {
          const rook = rightCornerPiece;
          if (!rook.hasMoved && rightSideOpen) {
            castleMove = true;
          }
        } else if (isLeft && leftCornerPiece) {
          const rook = leftCornerPiece;
          if (!rook.hasMoved && leftSideOpen) {
            castleMove = true;
          }
        }
      }
      const castleAllowed = canCastle && castleMove;
      const isValid = isOneStep && !occupiedBySelf;
      
      return isValid || castleAllowed;
    });
  }

  findCurrentKnightMoves = (knight, squares, pieceRow, pieceCol, pieces) => {
    return squares.filter((square) => {
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);

      const occupiedBySelf = currentPiece ? currentPiece.color === knight.color : false;
      const {
        column: squareCol,
        row: squareRow,
      } = square;

      const rowDiff = Math.abs(squareRow - pieceRow);
      const colDiff = Math.abs(squareCol - pieceCol);
      const upAndOver = rowDiff === 2 && colDiff === 1;
      const overAndUp = rowDiff === 1 && colDiff === 2;
      const isValid = upAndOver || overAndUp;

      return !occupiedBySelf && isValid;
    });
  }

  findCurrentPawnMoves = (pawn, squares, maxRow, minRow, maxCol, minCol, pieces) => {
    const {
      hasMoved,
      orientation,
    } = pawn;

    // eslint-disable-next-line
    return squares.filter((square) => {
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);

      const occupied = currentPiece !== undefined;
      const occupiedByOpp = currentPiece ? currentPiece.color !== pawn.color : false;

      // if opponent, expand column range to allow for diagonal movement
      const realMaxCol = occupiedByOpp ? maxCol : maxCol - 1;
      const realMinCol = occupiedByOpp ? minCol : minCol + 1;

      // determine front-to-back limits
      const lessThanMaxRow = square.row <= maxRow;
      const moreThanMinRow = square.row >= minRow;

      // determine side-to-side limits
      const lessThanMaxCol = square.column <= realMaxCol;
      const moreThanMinCol = square.column >= realMinCol;

      const inRowRange = lessThanMaxRow && moreThanMinRow;
      const inColRange = lessThanMaxCol && moreThanMinCol;

      // is two rows in front or in back
      const isTwoSquares = Math.abs(square.row - pawn.row) === 2;
      const isLateral = square.column !== pawn.column;
      const sameRow = square.row === pawn.row;
      const inRange = inRowRange && inColRange;

      if (!sameRow) {
        if (occupiedByOpp && !isTwoSquares && inRange) {
          return isLateral;
        } else if (isTwoSquares) {
          const squareInFront = squares.find((sq) => {
            const {
              column,
              row,
            } = pawn;
            return sq.row === row + orientation && sq.column === column;
          });
          const pieceInFront = this.findPieceBySquare(squares, pieces, squareInFront);
          const blocked = pieceInFront !== null;
          return !isLateral && !hasMoved && !occupied && !blocked;
        } else if (!sameRow && inRange) {
          return !occupied;
        }
      }
    });
  }

  findCurrentRookMoves = (rook, squares, pieceRow, pieceCol, pieces) => {
    // initialize limits
    let maxRow = 8;
    let minRow = -8;
    let maxCol = 8;
    let minCol = -8;
    
    // get all options, and resize limits as needed
    const options = squares.filter((square) => {
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);

      const occupied = currentPiece !== undefined;
      const {
        column: squareCol,
        row: squareRow,
      } = square;

      const sameRow = pieceRow === squareRow;
      const sameCol = pieceCol === squareCol;
      const straight = sameRow || sameCol;
      const self = sameRow && sameCol;
      const rowDiff = squareRow - pieceRow;
      const colDiff = squareCol - pieceCol;
      const isValid = straight && !self;

      if (isValid && occupied) {
        // if going front or back
        if (colDiff === 0) {
          // if going toward top of board
          if (rowDiff < 0 && rowDiff > minRow) {
            minRow = rowDiff;
          // if going toward back of board
          } else if (rowDiff > 0 && rowDiff < maxRow) {
            maxRow = rowDiff;
          }
        // if going side to side
        } else if (rowDiff === 0) {
          // if moving to left
          if (colDiff < 0 && colDiff > minCol) {
            minCol = colDiff;
          // if moving to right
          } else if (colDiff > 0 && colDiff < maxCol) {
            maxCol = colDiff;
          }
        }
      }

      return isValid;
    });

    return options.filter((square) => {
      // const currentPiece = square.piece ? square.piece : null;
      const currentPiece = pieces.find(p => p.row === square.row && p.column === square.column);

      const occupiedBySelf = currentPiece ? currentPiece.color === rook.color : false;
      const {
        column: squareCol,
        row: squareRow,
      } = square;
      
      const rowDiff = squareRow - pieceRow;
      const colDiff = squareCol - pieceCol;
      const inColRange = colDiff <= maxCol && colDiff >= minCol;
      const inRowRange = rowDiff <= maxRow && rowDiff >= minRow;
      let isValid = false;

      // block off rook if piece is in the way
      if (rowDiff === 0 && inColRange) {
        isValid = !occupiedBySelf;
      } else if (colDiff === 0 && inRowRange) {
        isValid = !occupiedBySelf;
      }

      return isValid;
    });
  }

  getSquare = (squares, row, col) => squares.find(sq => sq.row === row && sq.column === col)
}

export default Helpers;
