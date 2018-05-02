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
    this.maxY = this.hasMoved ? orientation * 2 : orientation;
    this.minY = orientation;
    this.maxX = this.attacking ? 1 : 0;
    this.minX = this.attacking ? -1 : 0;
  }
}

export default Pawn;