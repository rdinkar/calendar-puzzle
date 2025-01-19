import { board } from "./data";

export const Board = () => {
  return (
    <div className="puzzle-container">
      {board.map((row, i) => (
        <div key={i} className="puzzle-row">
          {row.map((cell, j) => (
            <div
              key={`${i}_${j}`}
              className="puzzle-cell"
              onDrop={(e) => {
                console.log("drop", e, `${i}_${j}`);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              {cell.display}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
