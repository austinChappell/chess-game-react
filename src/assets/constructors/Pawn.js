import ChessPiece from './ChessPiece';
import data from '../data';
import Helpers from '../helpers';

const {
  blackPawn,
  whitePawn,
} = data.icons;

const helpers = new Helpers();

const {
  findCurrentPawnMoves,
} = helpers;

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
    this.maxY = orientation > 0 ? orientation : 0;
    this.minY = orientation < 0 ? orientation : 0;
    this.maxX = 1;
    this.minX = -1;
    this.allowedMoves = [
      { col: 0, row: 1 },
      { col: 1, row: 1 },
      { col: -1, row: 1 },
      { col: 0, row: -1 },
      { col: 1, row: -1 },
      { col: -1, row: -1 },
      { col: 0, row: 2 },
      { col: 0, row: -2 },
    ];
    this.generateCurrentOptions = (pawn, squares, pieceRow, pieceCol, pieces) => {
      const { hasMoved, orientation } = pawn;
      
      if (hasMoved) {
        pawn.maxY = orientation > 0 ? 1 : 0;
        pawn.minY = orientation > 0 ? 0 : -1;
      } else {
        pawn.maxY = orientation > 0 ? 2 : 0;
      }
      
      const maxRow = pieceRow + pawn.maxY;
      const minRow = pieceRow + pawn.minY;
      const maxCol = pieceCol + pawn.maxX;
      const minCol = pieceCol + pawn.minX;

      return findCurrentPawnMoves(pawn, squares, maxRow, minRow, maxCol, minCol, pieces);
    };
  }
}

export default Pawn;
