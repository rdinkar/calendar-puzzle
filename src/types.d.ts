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
    };
  }
}

export {};
