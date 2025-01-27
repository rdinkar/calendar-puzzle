import { board, restrictedPiece } from "./data";
import { useEffect, useState } from "react";
import {
  getBorderClasses,
  getNewBoard,
  getValidCords,
  isNewBoardValid,
  removePieceFromBoard,
} from "./utils";
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
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

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
            setHoverPiece(null);
          }
        }}
        onMouseDown={(e) => {
          if (!e.currentTarget.contains(e.target as Node)) {
            setSelectedPiece(null);
          }
        }}
      >
        {board.map((row, i) => (
          <div key={i} className="puzzle-row">
            {row.map((cell, j) => (
              <div
                key={`${i}_${j}`}
                className={`puzzle-cell ${
                  placedPieces[i][j]?.pieceId === restrictedPiece.id
                    ? "restricted-piece"
                    : ""
                } ${isHighlighted(i, j) ? "highlight-hover" : ""} ${
                  placedPieces[i][j] ? "cell-placed" : ""
                } ${getBorderClasses(placedPieces, [i, j])} ${
                  placedPieces[i][j]?.pieceId === selectedPiece
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  if (placedPieces[i][j]?.pieceId === restrictedPiece.id)
                    return;
                  setSelectedPiece(placedPieces[i][j]?.pieceId || null);
                }}
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
