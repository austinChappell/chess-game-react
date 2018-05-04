import ChessPiece from './ChessPiece';
import data from '../data';
import Helpers from '../helpers';

const helpers = new Helpers();

const {
  findCurrentKingMoves,
} = helpers;

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
    this.generateCurrentOptions = (king, squares, pieceRow, pieceCol, pieces) => {
      return findCurrentKingMoves(king, squares, pieceRow, pieceCol, pieces);
    };
    this.isKing = true;
  }
}

export default King;