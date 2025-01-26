import { board } from "./data";
import { useState } from "react";
import { getValidCords } from "./utils";
import { CELL_SIZE } from "./constant";

export const Board = () => {
  const [hoverPiece, setHoverPiece] = useState<{
    pieceCords: number[][];
    position: { row: number; col: number } | null;
  }>({ pieceCords: [], position: null });

  const isHighlighted = (row: number, col: number) => {
    if (!hoverPiece.position || !hoverPiece.pieceCords.length) return false;

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
          const pieceData = JSON.parse(
            e.dataTransfer.getData("application/json")
          );
          console.log("Dropped piece:", pieceData, hoverPiece.position);
          setHoverPiece({ pieceCords: [], position: null });
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

            setHoverPiece({
              pieceCords: dragPieceData.pieceCords,
              position: getValidCords(relativeCol, relativeRow),
            });
          }
        }}
        onDragLeave={() => {
          setHoverPiece({ pieceCords: [], position: null });
        }}
      >
        {board.map((row, i) => (
          <div key={i} className="puzzle-row">
            {row.map((cell, j) => (
              <div
                key={`${i}_${j}`}
                className={`puzzle-cell ${
                  isHighlighted(i, j) ? "highlight-hover" : ""
                }`}
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
