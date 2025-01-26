import { board } from "./data";
import { useState } from "react";
import { getNewBoard, getValidCords, isNewBoardValid } from "./utils";
import { CELL_SIZE } from "./constant";
import { BoardPlacedPieces, HoveredPiece } from "./types";

export const Board = ({
  placedPieces,
  setPlacedPieces,
}: {
  placedPieces: BoardPlacedPieces;
  setPlacedPieces: React.Dispatch<React.SetStateAction<BoardPlacedPieces>>;
}) => {
  const [hoverPiece, setHoverPiece] = useState<HoveredPiece | null>(null);

  const isHighlighted = (row: number, col: number) => {
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

  return (
    <div className="puzzle-board-boundary">
      <div
        className="puzzle-container"
        onDrop={(e) => {
          e.preventDefault();
          setPlacedPieces((prev) => {
            if (!hoverPiece) return prev;
            const newBoard = getNewBoard(prev, hoverPiece);
            return newBoard;
          });
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
            console.log("drag leave");
            setHoverPiece(null);
          }
        }}
      >
        {board.map((row, i) => (
          <div key={i} className="puzzle-row">
            {row.map((cell, j) => (
              <div
                key={`${i}_${j}`}
                className={`puzzle-cell ${
                  isHighlighted(i, j) ? "highlight-hover" : ""
                } ${placedPieces[i][j] ? "cell-placed" : ""}`}
              >
                {cell.display}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
