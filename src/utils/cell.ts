import { restrictedPiece } from "../constants";
import { BoardPlacedPieces, HoveredPiece } from "../types";

const isHighlighted = (
  hoverPiece: HoveredPiece | null,
  [row, col]: [number, number]
) => {
  if (!hoverPiece || !hoverPiece.pieceCords.length) return false;

  const pieceRow = row - hoverPiece.position.row;
  const pieceCol = col - hoverPiece.position.col;

  return (
    pieceRow >= 0 &&
    pieceCol >= 0 &&
    pieceRow < hoverPiece.pieceCords.length &&
    pieceCol < hoverPiece.pieceCords[0].length &&
    hoverPiece.pieceCords[pieceRow][pieceCol] === 1
  );
};

const getBorderClasses = (
  placedPieces: BoardPlacedPieces,
  [row, col]: [number, number]
) => {
  if (!placedPieces[row][col]) return "";

  const currentId = placedPieces[row][col].pieceId;
  if (currentId === restrictedPiece.id) return "";
  const borders = [];

  // Check top border
  if (row === 0 || placedPieces[row - 1][col]?.pieceId !== currentId) {
    borders.push("border-t");
  }
  // Check bottom border
  if (
    row === placedPieces.length - 1 ||
    placedPieces[row + 1][col]?.pieceId !== currentId
  ) {
    borders.push("border-b");
  }
  // Check left border
  if (col === 0 || placedPieces[row][col - 1]?.pieceId !== currentId) {
    borders.push("border-l");
  }
  // Check right border
  if (
    col === placedPieces[row].length - 1 ||
    placedPieces[row][col + 1]?.pieceId !== currentId
  ) {
    borders.push("border-r");
  }

  return borders.join(" ");
};

export const getCellClasses = ({
  placedPieces,
  selectedPiece,
  hoverPiece,
  position,
}: {
  placedPieces: BoardPlacedPieces;
  selectedPiece: string | null;
  hoverPiece: HoveredPiece | null;
  position: [number, number];
}) => {
  const classes: string[] = ["puzzle-cell"];
  const [row, col] = position;
  const currentId = placedPieces[row][col]?.pieceId;

  if (currentId === restrictedPiece.id) {
    classes.push("restricted-cell");
  }

  if (currentId === selectedPiece) {
    classes.push("selected-cell");
  }
  if (isHighlighted(hoverPiece, [row, col])) {
    classes.push("highlighted-cell");
  }
  if (placedPieces[row][col]) {
    classes.push("placed-cell");
  }

  const borderClasses = getBorderClasses(placedPieces, [row, col]);
  if (borderClasses) {
    classes.push(borderClasses);
  }

  return classes.join(" ");
};
