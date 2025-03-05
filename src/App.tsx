import { useMemo, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

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
      {isMobile && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center text-white p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">Desktop Only Game</h2>
            <p className="text-lg">
              This puzzle requires precise piece placement and is designed for
              mouse/keyboard interaction. Please switch to a computer for the
              best experience.
            </p>
          </div>
        </div>
      )}
      {!isMobile && <Instructions />}
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
