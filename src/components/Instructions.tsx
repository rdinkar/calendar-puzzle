import { useState, useEffect } from "react";

export const Instructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setIsOpen(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="info-button"
        aria-label="Show instructions"
      >
        ℹ️
      </button>

      {isOpen && (
        <div className="instructions-modal">
          <div className="instructions-content">
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close instructions"
            >
              ×
            </button>
            <h2>How to Play</h2>

            <div className="instruction-section">
              <h3>Placing Pieces</h3>
              <ul>
                <li>Drag a piece from the pieces container</li>
                <li>Drop it onto a valid position on the board</li>
                <li>Valid positions will be highlighted when dragging</li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3>Piece Controls (after selecting a piece)</h3>
              <ul>
                <li>
                  <kbd>R</kbd> - Rotate piece clockwise
                </li>
                <li>
                  <kbd>F</kbd> - Flip piece horizontally
                </li>
                <li>
                  <kbd>Delete</kbd> or <kbd>Backspace</kbd> - Remove piece from
                  board
                </li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3>Tips</h3>
              <ul>
                <li>Pieces can only be placed in valid positions</li>
                <li>All pieces must be used to complete the puzzle</li>
                <li>Some pieces may need to be rotated or flipped to fit</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
