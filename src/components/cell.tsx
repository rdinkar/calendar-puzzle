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
  cell: string;
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
      onClick={() => onClick(placedPieces[row][col] || null)}
    >
      {cell}
    </div>
  );
};
