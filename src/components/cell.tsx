import React from "react";
import { BoardPlacedPieces, HoveredPiece } from "../types";
import { getCellClasses } from "../utils";

export const Cell = ({
  cell,
  position,
  placedPieces,
  selectedPiece,
  hoverPiece,
  onClick,
}: {
  cell: { display: string };
  position: [number, number];
  placedPieces: BoardPlacedPieces;
  selectedPiece: string | null;
  hoverPiece: HoveredPiece | null;
  onClick: (pieceId: string | null) => void;
}) => {
  const [row, col] = position;
  return (
    <div
      className={getCellClasses({
        placedPieces,
        selectedPiece,
        hoverPiece,
        position,
      })}
      onClick={() => onClick(placedPieces[row][col]?.pieceId || null)}
    >
      {cell.display}
    </div>
  );
};
