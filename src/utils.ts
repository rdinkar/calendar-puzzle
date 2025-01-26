import { COLS, ROWS } from "./constant";
import { BoardPlacedPieces, HoveredPiece } from "./types";

export const getValidCords = (x: number, y: number, pieceCords: number[][]) => {
  const pieceWidth = pieceCords[0].length;
  const pieceHeight = pieceCords.length;
  return {
    row: Math.max(0, Math.min(ROWS - pieceHeight, y)),
    col: Math.max(0, Math.min(COLS - pieceWidth, x)),
  };
};

export const isNewBoardValid = (
  board: BoardPlacedPieces,
  piece: HoveredPiece
) => {
  const { position, pieceCords } = piece;
  let isError = false;
  pieceCords.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (
        col === 1 &&
        board[position.row + rowIndex][position.col + colIndex]
      ) {
        isError = true;
      }
    });
  });
  return !isError;
};

export const getNewBoard = (
  board: BoardPlacedPieces,
  piece: HoveredPiece
): BoardPlacedPieces => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const { position, pieceCords, id } = piece;
  pieceCords.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1) {
        newBoard[position.row + rowIndex][position.col + colIndex] = {
          pieceId: id,
        };
      }
    });
  });
  return newBoard;
};
