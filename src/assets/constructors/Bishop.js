import ChessPiece from './ChessPiece';
import data from '../data';
import Helpers from '../helpers';

const helpers = new Helpers();

const {
  findCurrentBishopMoves,
} = helpers;

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
    this.generateCurrentOptions = (bishop, squares, pieceRow, pieceCol) => {
      return findCurrentBishopMoves(bishop, squares, pieceRow, pieceCol);
    };
  }
}

export default Bishop;