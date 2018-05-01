import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackQueen,
  whiteQueen,
} = data.icons;

class Queen extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Queen';
    this.type = 'queen';
    this.icon = color === 'black' ? blackQueen : whiteQueen;
  }
}

export default Queen;