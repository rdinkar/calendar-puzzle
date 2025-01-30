import React from "react";
import { getNewBoard, getValidCords, isNewBoardValid } from "../utils";
import { CELL_SIZE } from "../constants";
import { HoveredPiece } from "../types";
import { BoardPlacedPieces } from "../types";

export const BoardDropZone = ({
  placedPieces,
  setPlacedPieces,
  hoverPiece,
  setHoverPiece,
  children,
  setSelectedPiece,
}: React.PropsWithChildren<{
  placedPieces: BoardPlacedPieces;
  setPlacedPieces: (placedPieces: BoardPlacedPieces) => void;
  hoverPiece: HoveredPiece | null;
  setHoverPiece: (hoverPiece: HoveredPiece | null) => void;
  setSelectedPiece: (selectedPiece: string | null) => void;
}>) => {
  return (
    <div
      className="puzzle-container"
      onDrop={(e) => {
        e.preventDefault();
        if (hoverPiece) {
          setPlacedPieces(getNewBoard(placedPieces, hoverPiece));
        }
        setHoverPiece(null);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        const dragPieceData = window.dragPieceData;
        if (dragPieceData) {
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseX =
            e.clientX - rect.left + dragPieceData.relativePosition.left;
          const mouseY =
            e.clientY - rect.top + dragPieceData.relativePosition.top;

          const relativeRow = Math.floor(mouseY / CELL_SIZE);
          const relativeCol = Math.floor(mouseX / CELL_SIZE);

          const newHoverPieceData = {
            pieceCords: dragPieceData.pieceCords,
            position: getValidCords(
              relativeCol,
              relativeRow,
              dragPieceData.pieceCords
            ),
            id: dragPieceData.id,
          };
          if (isNewBoardValid(placedPieces, newHoverPieceData)) {
            setHoverPiece(newHoverPieceData);
          }
        }
      }}
      onDragLeave={(e) => {
        // Only trigger if actually leaving the container
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setHoverPiece(null);
        }
      }}
      onMouseDown={(e) => {
        if (!e.currentTarget.contains(e.target as Node)) {
          setSelectedPiece(null);
        }
      }}
    >
      {children}
    </div>
  );
};
