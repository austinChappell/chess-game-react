class Helpers {
  findPieceBySquare = (squares, pieces, square) => {
    const piece = pieces.find(p => p.row === square.row && p.column === square.column);
    return piece || null;
  }

  findSquareByPiece = (pieces, squares, piece) => {
    const square = squares.find(sq => sq.row === piece.row && sq.column === piece.column);
    return square || null;
  }

  findCurrentBishopMoves = (rook, squares, pieceRow, pieceCol) => {
    let maxQ1 = 8;
    let maxQ2 = 8;
    let maxQ3 = 8;
    let maxQ4 = 8;

    const options = squares.filter((square) => {
      const occupied = square.piece !== null;
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
      const occupiedBySelf = square.piece && square.piece.color === rook.color;

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

  findCurrentKingMoves = (king, squares, pieceRow, pieceCol) => {
    return squares.filter((square) => {
      const occupiedBySelf = square.piece && square.piece.color === king.color;
      const {
        column: squareCol,
        row: squareRow,
      } = square;

      const rowDiff = Math.abs(squareRow - pieceRow);
      const colDiff = Math.abs(squareCol - pieceCol);
      const isOneStep = rowDiff <= 1 && colDiff <= 1;
      
      return isOneStep && !occupiedBySelf;
    });
  }

  findCurrentKnightMoves = (knight, squares, pieceRow, pieceCol) => {
    return squares.filter((square) => {
      const occupiedBySelf = square.piece && square.piece.color === knight.color;
      const {
        column: squareCol,
        row: squareRow,
      } = square;

      const rowDiff = Math.abs(squareRow - pieceRow);
      const colDiff = Math.abs(squareCol - pieceCol);
      const isValid = rowDiff === 2 && colDiff === 1 || rowDiff === 1 && colDiff === 2;

      return !occupiedBySelf && isValid;
    });
  }

  findCurrentPawnMoves = (pawn, squares, maxRow, minRow, maxCol, minCol) => {
    const {
      hasMoved,
      orientation,
    } = pawn;
    return squares.filter((square) => {
      const occupied = square.piece !== null;
      const occupiedByOpp = square.piece && square.piece.color !== pawn.color;

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
          const blocked = squareInFront.piece !== null;
          return !isLateral && !hasMoved && !occupied && !blocked;
        } else if (!sameRow && inRange) {
          return !occupied;
        }
      }
    });
  }

  findCurrentRookMoves = (rook, squares, pieceRow, pieceCol) => {
    // initialize limits
    let maxRow = 8;
    let minRow = -8;
    let maxCol = 8;
    let minCol = -8;
    
    // get all options, and resize limits as needed
    const options = squares.filter((square) => {
      const occupied = square.piece !== null;
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
      const occupiedBySelf = square.piece && square.piece.color === rook.color;
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
