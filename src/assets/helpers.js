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

  getSquare = (squares, row, col) => squares.find(sq => sq.row === row && sq.column === col)
}

export default Helpers;
