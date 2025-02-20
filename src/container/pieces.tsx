import { useState } from "react";
import { Piece } from "../components";
import { pieces } from "../constants";

export const PiecesContainer = ({
  placedPiecesId,
}: {
  placedPiecesId: { [key: string]: boolean };
}) => {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  return (
    <div className="pieces-container">
      {Object.entries(pieces).map(([pieceKey, pieceCords]) =>
        placedPiecesId[pieceKey] ? null : (
          <Piece
            pieceCords={pieceCords}
            key={pieceKey}
            isSelected={selectedPiece === pieceKey}
            onClick={() => setSelectedPiece(pieceKey)}
            id={pieceKey}
          />
        )
      )}
    </div>
  );
};
