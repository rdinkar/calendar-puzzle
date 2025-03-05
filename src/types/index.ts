declare global {
  interface Window {
    dragPieceData?: {
      pieceCords: number[][];
      isFlipped: boolean;
      rotation: number;
      relativePosition: {
        left: number;
        top: number;
      };
      id: string;
    };
  }
}

export type HoveredPiece = {
  pieceCords: number[][];
  position: { row: number; col: number };
  id: string;
};

export type BoardPlacedPieces = (string | null)[][];
