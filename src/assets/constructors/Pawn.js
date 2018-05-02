import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackPawn,
  whitePawn,
} = data.icons;

class Pawn extends ChessPiece {
  // orientation to know which way is forward
  // either +1 or -1
  // this is used to advance the pawn when moving
  constructor(color, row, column, orientation) {
    super(color, row, column);
    this.label = 'Pawn';
    this.type = 'pawn';
    this.icon = color === 'black' ? blackPawn : whitePawn;
    this.orientation = orientation;
    this.maxY = orientation > 0 ? orientation : 0;
    this.minY = orientation < 0 ? orientation : 0;
    this.maxX = 1;
    this.minX = -1;
    this.allowedMoves = [
      {col: 0, row: 1 },
      {col: 1, row: 1 },
      {col: -1, row: 1 },
      {col: 0, row: -1 },
      {col: 1, row: -1 },
      {col: -1, row: -1 },
      {col: 0, row: 2 },
      {col: 0, row: -2 },
    ];
    this.generateCurrentOptions = (squares, row, col) => {
      const { hasMoved, orientation } = this;
      const maxRow = row + this.maxY;
      const minRow = row + this.minY;
      const maxCol = col + this.maxX;
      const minCol = col + this.minX;

      if (hasMoved) {
        this.maxY = orientation > 0 ? orientation : 0;
        this.minY = orientation < 0 ? 0 : orientation;
      } else {
        this.maxY = orientation > 0 ? orientation * 2 : 0;
        this.minY = orientation < 0 ? 0 : orientation * 2;            
      }

      this.currentMoves = squares.filter((square, index) => {
        const occupiedByOpp = square.piece && square.piece.color !== this.color;
        const realMaxCol = occupiedByOpp ? maxCol : maxCol - 1;
        const realMinCol = occupiedByOpp ? minCol : minCol + 1;
        const lessThanMaxRow = square.row <= maxRow;
        const moreThanMinRow = square.row >= minRow;
        const lessThanMaxCol = square.column <= realMaxCol;
        const moreThanMinCol = square.column >= realMinCol;
        const inRowRange = lessThanMaxRow && moreThanMinRow;
        const inColRange = lessThanMaxCol && moreThanMinCol;

        return inRowRange && inColRange;
      });
    }
  }
}

export default Pawn;