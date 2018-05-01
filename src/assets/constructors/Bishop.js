import ChessPiece from './ChessPiece';
import data from '../data';

const {
  blackBishop,
  whiteBishop,
} = data.icons;

class Bishop extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Bishop';
    this.type = 'bishop';
    this.icon = color === 'black' ? blackBishop : whiteBishop;
  }
}

export default Bishop;