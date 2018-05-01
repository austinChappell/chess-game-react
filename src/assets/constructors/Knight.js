import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackKnight,
  whiteKnight,
} = data.icons;

class Knight extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Knight';
    this.type = 'knight';
    this.icon = color === 'black' ? blackKnight : whiteKnight;
  }
}

export default Knight;