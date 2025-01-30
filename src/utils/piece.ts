import { ROWS, COLS } from "../constants";

export const flipCords = (cords: number[][]) => {
  return cords.map((row) => [...row].reverse());
};

export const rotateCords = (cords: number[][], angle: number): number[][] => {
  if (angle === 0) return cords;
  const rows = cords.length;
  const cols = cords[0].length;
  const rotated = Array(cols)
    .fill(0)
    .map(() => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = cords[i][j];
    }
  }

  return angle === 1 ? rotated : rotateCords(rotated, angle - 1);
};

export const getValidCords = (x: number, y: number, pieceCords: number[][]) => {
  const pieceWidth = pieceCords[0].length;
  const pieceHeight = pieceCords.length;
  return {
    row: Math.max(0, Math.min(ROWS - pieceHeight, y)),
    col: Math.max(0, Math.min(COLS - pieceWidth, x)),
  };
};
