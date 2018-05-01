import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackRook,
  whiteRook,
} = data.icons;

class Rook extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Rook';
    this.type = 'rook';
    this.icon = color === 'black' ? blackRook : whiteRook;
  }
}

export default Rook;