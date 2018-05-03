class Helpers {
  findPieceBySquare = (squares, pieces, square) => {
    const piece = pieces.find(p => p.row === square.row && p.column === square.column);
    return piece || null;
  }

  findSquareByPiece = (pieces, squares, piece) => {
    const square = squares.find(sq => sq.row === piece.row && sq.column === piece.column);
    return square || null;
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
