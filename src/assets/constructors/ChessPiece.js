class ChessPiece {
  constructor(color, row, column) {
    this.color = color;
    this.row = row;
    this.column = column;
    this.alive = true;
    this.hasMoved = false;
  }
}

export default ChessPiece;