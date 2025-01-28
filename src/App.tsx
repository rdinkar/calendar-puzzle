import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { PiecesContainer } from "./pieces-container";
import { BoardPlacedPieces } from "./types";
import { getInitialBoard, isBoardComplete } from "./utils";
import { Instructions } from "./components/instructions";
import { PuzzleExplanation } from "./components/puzzle-explanation";

function App() {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [puzzleDate, setPuzzleDate] = useState<string>(formattedDate);
  const [isUserWon, setIsUserWon] = useState<boolean>(false);
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

  useEffect(() => {
    setIsUserWon(isBoardComplete(placedPieces));
  }, [placedPieces]);

  return (
    <div className="app-container">
      <Instructions />
      <div className="flex-col gap-2 relative">
        <div className="flex-col gap-1 mb-4">
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
        <PuzzleExplanation />
      </div>
      {isUserWon ? (
        <div className="flex-col celebration-container">
          <h2>Congratulations!</h2>
          <p>You've completed the puzzle!</p>
        </div>
      ) : (
        <PiecesContainer placedPiecesId={placedPiecesId} />
      )}
    </div>
  );
}

export default App;
