class Helpers {
  findPieceBySquare(squares, pieces, square) {
    const piece = pieces.find(p => {
      return p.row === square.row && p.column === square.column;
    });
    return piece ? piece : null;
  }

  findSquareByPiece(pieces, squares, piece) {
    const square = squares.find(sq => {
      return sq.row === piece.row && sq.column === piece.column;
    })
    return square ? square : null;
  }
}

export default Helpers;