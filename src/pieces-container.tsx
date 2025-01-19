import { useState } from "react";
import { Piece } from "./piece";
import { pieces } from "./data";

export const PiecesContainer = () => {
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  return (
    <div className="pieces-container">
      {Object.entries(pieces).map(([pieceKey, pieceCords], index) => (
        <Piece
          pieceCords={pieceCords}
          key={pieceKey}
          isSelected={selectedPiece === index}
          onClick={() => setSelectedPiece(index)}
        />
      ))}
    </div>
  );
};
