import { useMemo, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { PiecesContainer } from "./pieces-container";
import { BoardPlacedPieces } from "./types";
import { getInitialBoard } from "./utils";

function App() {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [puzzleDate, setPuzzleDate] = useState<string>(formattedDate);

  const [placedPieces, setPlacedPieces] = useState<BoardPlacedPieces>(() =>
    getInitialBoard(puzzleDate)
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

  const onPuzzleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPuzzleDate(e.target.value);
    setPlacedPieces(getInitialBoard(e.target.value));
  };

  return (
    <div className="app-container">
      <div className="flex-col gap-2">
        <div className="flex-col gap-1">
          <label htmlFor="puzzle-date">Puzzle for date</label>
          <input
            id="puzzle-date"
            type="date"
            value={puzzleDate}
            onChange={onPuzzleDateChange}
            className="p-1"
          />
        </div>
        <Board placedPieces={placedPieces} setPlacedPieces={setPlacedPieces} />
      </div>
      <PiecesContainer placedPiecesId={placedPiecesId} />
    </div>
  );
}

export default App;
