import React from "react";

export const DateInput = ({
  puzzleDate,
  onPuzzleDateChange,
}: {
  puzzleDate: string;
  onPuzzleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
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
  );
};
