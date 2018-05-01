import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackPawn,
  whitePawn,
} = data.icons;

class Pawn extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Pawn';
    this.type = 'pawn';
    this.icon = color === 'black' ? blackPawn : whitePawn;
  }
}

export default Pawn;