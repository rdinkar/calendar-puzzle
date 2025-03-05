import { useMemo, useState } from "react";
import "./App.css";
import { PiecesContainer } from "./container/pieces";
import { BoardPlacedPieces } from "./types";
import { getInitialBoard, isBoardComplete } from "./utils";
import {
  Instructions,
  PuzzleExplanation,
  Celebration,
  DateInput,
} from "./components";
import { BoardContainer } from "./container";

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
        if (col) {
          res[col] = true;
        }
      }
    }
    return res;
  }, [placedPieces]);

  const onPuzzleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPuzzleDate(e.target.value);
    setPlacedPieces(getInitialBoard(e.target.value));
  };

  const isUserWon = useMemo(() => {
    return isBoardComplete(placedPieces);
  }, [placedPieces]);

  return (
    <div className="app-container">
      <Instructions />
      <div className="flex-col gap-2 relative">
        <DateInput
          puzzleDate={puzzleDate}
          onPuzzleDateChange={onPuzzleDateChange}
        />
        <BoardContainer
          placedPieces={placedPieces}
          setPlacedPieces={setPlacedPieces}
        />
        <PuzzleExplanation />
      </div>
      {isUserWon ? (
        <Celebration />
      ) : (
        <PiecesContainer placedPiecesId={placedPiecesId} />
      )}
    </div>
  );
}

export default App;
