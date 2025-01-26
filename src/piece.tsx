import React, { useState } from "react";
import { rotateCords } from "./data";
import { flipCords } from "./data";

export const Piece = ({
  pieceCords,
  isSelected,
  onClick,
}: {
  pieceCords: number[][];
  isSelected: boolean;
  onClick: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState(0);

  const cords_1 = isFlipped ? flipCords(pieceCords) : pieceCords;
  const cords_2 = rotateCords(cords_1, rotation);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isSelected) return;

    if (e.key.toLowerCase() === "f") {
      setIsFlipped((prev) => !prev);
    }
    if (e.key.toLowerCase() === "r") {
      setRotation((prev) => (prev + 1) % 4);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelected]);

  return (
    <div
      className={`flex-col ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      draggable={true}
      style={{
        cursor: "pointer",
        outline: isSelected ? "2px solid blue" : "none",
      }}
      onDragStart={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const pieceData = {
          pieceCords: cords_2,
          isFlipped,
          rotation,
          relativePosition: {
            left: rect.left - e.clientX,
            top: rect.top - e.clientY,
          },
        };
        window.dragPieceData = pieceData;
        e.dataTransfer.setData("application/json", JSON.stringify(pieceData));
      }}
      onDragEnd={() => {
        delete window.dragPieceData;
      }}
    >
      {cords_2.map((row, i) => (
        <div key={i} className="disp-flex">
          {row.map((cell, j) => (
            <div
              key={`${i}_${j}`}
              className={`piece-cord-unit ${cell > 0 ? "solid" : ""}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
