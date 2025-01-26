import { useMemo, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { PiecesContainer } from "./pieces-container";
import { BoardPlacedPieces } from "./types";
import { board } from "./data";

function App() {
  const [placedPieces, setPlacedPieces] = useState<BoardPlacedPieces>(
    board.map((row) => row.map(() => null))
  );
  const placedPiecesId = useMemo(() => {
    const res: {
      [key: string]: boolean;
    } = {};
    for (const row of placedPieces) {
      for (const col of row) {
        if (col?.pieceId) {
          res[col.pieceId] = true;
        }
      }
    }
    return res;
  }, [placedPieces]);
  return (
    <div className="app-container">
      <Board placedPieces={placedPieces} setPlacedPieces={setPlacedPieces} />
      <PiecesContainer placedPiecesId={placedPiecesId} />
    </div>
  );
}

export default App;
