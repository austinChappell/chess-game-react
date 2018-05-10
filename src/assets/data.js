import blackPawn from './images/pieces/black_pawn.png';
import blackRook from './images/pieces/black_rook.png';
import blackQueen from './images/pieces/black_queen.png';
import blackKing from './images/pieces/black_king.png';
import blackBishop from './images/pieces/black_bishop.png';
import blackKnight from './images/pieces/black_knight.png';

import whitePawn from './images/pieces/white_pawn.png';
import whiteRook from './images/pieces/white_rook.png';
import whiteQueen from './images/pieces/white_queen.png';
import whiteKing from './images/pieces/white_king.png';
import whiteBishop from './images/pieces/white_bishop.png';
import whiteKnight from './images/pieces/white_knight.png';

const devAPI = 'http://localhost:5000/api';
const prodAPI = 'https://chess-game-api.herokuapp.com/api';

const data = {
  api: process.env.NODE_ENV === 'development' ? devAPI : prodAPI,
  // api: prodAPI,
  icons: {
    blackBishop,
    blackKing,
    blackKnight,
    blackPawn,
    blackQueen,
    blackRook,
    whiteBishop,
    whiteKing,
    whiteKnight,
    whitePawn,
    whiteQueen,
    whiteRook,
  },
};

export default data;
