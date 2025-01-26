import { COLS, ROWS } from "./constant";

export const getValidCords = (x: number, y: number) => {
  return {
    row: Math.max(0, Math.min(ROWS - 1, y)),
    col: Math.max(0, Math.min(COLS - 1, x)),
  };
};
