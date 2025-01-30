import { board, restrictedPiece } from "../constants";
import { BoardPlacedPieces, HoveredPiece } from "../types";

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

export const isBoardComplete = (board: BoardPlacedPieces) => {
  return board.every((row) => row.every((col) => col !== null));
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

export const removePieceFromBoard = (
  board: BoardPlacedPieces,
  pieceId: string
) => {
  const newBoard: typeof board = JSON.parse(JSON.stringify(board));
  newBoard.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col?.pieceId === pieceId) {
        newBoard[rowIndex][colIndex] = null;
      }
    });
  });
  return newBoard;
};

const getDateComparableValues = (restrictedDate: string) => {
  const date = new Date(restrictedDate);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate().toString();
  const weekday = date
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  return [month, day, weekday];
};

export const getInitialBoard = (restrictedDate: string): BoardPlacedPieces => {
  const comparableValues = getDateComparableValues(restrictedDate);
  const newBoard: BoardPlacedPieces = board.map((row) =>
    row.map((colValue) =>
      comparableValues.includes(colValue?.display)
        ? {
            pieceId: restrictedPiece.id,
          }
        : null
    )
  );
  newBoard[board.length - 1][board[0].length - 1] = {
    pieceId: restrictedPiece.id,
  };
  return newBoard;
};
