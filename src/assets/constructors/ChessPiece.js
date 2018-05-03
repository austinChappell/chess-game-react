class ChessPiece {
  constructor(color, row, column) {
    this.color = color;
    this.row = row;
    this.column = column;
    this.alive = true;
    this.hasMoved = false;
    this.placed = false;
    this.selected = false;
    this.attacking = false;
    this.maxY = 8;
    this.minY = 8;
    this.maxX = 8;
    this.minX = 8;
    this.allowedSqaures = [];
    this.currentMoves = [];
    this.isKing = false;
  }
}

export default ChessPiece;