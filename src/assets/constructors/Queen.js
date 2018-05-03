import ChessPiece from './ChessPiece';
import data from '../data';
import Helpers from '../helpers';

const helpers = new Helpers();

const {
  findCurrentBishopMoves,
  findCurrentRookMoves,
} = helpers;

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
    this.generateCurrentOptions = (queen, squares, pieceRow, pieceCol) => {
      const straightOptions = findCurrentRookMoves(queen, squares, pieceRow, pieceCol);
      const diagOptions = findCurrentBishopMoves(queen, squares, pieceRow, pieceCol);
      const allOptions = [...straightOptions, ...diagOptions];
      queen.currentMoves = allOptions;
    };
  }
}

export default Queen;