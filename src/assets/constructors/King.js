import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackKing,
  whiteKing,
} = data.icons;

class King extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'King';
    this.type = 'king';
    this.icon = color === 'black' ? blackKing : whiteKing;
  }
}

export default King;