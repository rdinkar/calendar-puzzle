import { board, restrictedPiece } from "../constants";
import { useEffect, useState } from "react";
import { removePieceFromBoard } from "../utils";
import { BoardPlacedPieces, HoveredPiece } from "../types";
import { Cell } from "../components";
import { BoardDropZone } from "./board-drop-zone";

export const BoardContainer = ({
  placedPieces,
  setPlacedPieces,
}: {
  placedPieces: BoardPlacedPieces;
  setPlacedPieces: React.Dispatch<React.SetStateAction<BoardPlacedPieces>>;
}) => {
  const [hoverPiece, setHoverPiece] = useState<HoveredPiece | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPiece) return;

      if (e.key === "Backspace" || e.key === "Delete") {
        setSelectedPiece(null);
        setPlacedPieces((prev) => removePieceFromBoard(prev, selectedPiece));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPiece]);

  const onCellClick = (pieceId: string | null) => {
    if (pieceId === restrictedPiece.id) return;
    setSelectedPiece(pieceId);
  };

  return (
    <div className="puzzle-board-boundary">
      <BoardDropZone
        placedPieces={placedPieces}
        hoverPiece={hoverPiece}
        setPlacedPieces={setPlacedPieces}
        setHoverPiece={setHoverPiece}
        setSelectedPiece={setSelectedPiece}
      >
        {board.map((row, i) => (
          <div key={i} className="puzzle-row">
            {row.map((cell, j) => (
              <Cell
                key={`${i}_${j}`}
                cell={cell}
                position={[i, j]}
                placedPieces={placedPieces}
                selectedPiece={selectedPiece}
                hoverPiece={hoverPiece}
                onClick={onCellClick}
              />
            ))}
          </div>
        ))}
      </BoardDropZone>
    </div>
  );
};
