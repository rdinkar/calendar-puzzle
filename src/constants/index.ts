export const board = [
  [
    {
      display: "JAN",
    },
    {
      display: "FEB",
    },
    {
      display: "MAR",
    },
    {
      display: "APR",
    },
    {
      display: "1",
    },
    {
      display: "2",
    },
    {
      display: "3",
    },
    {
      display: "MON",
    },
    {
      display: "TUE",
    },
  ],
  [
    {
      display: "MAY",
    },
    {
      display: "4",
    },
    {
      display: "5",
    },
    {
      display: "6",
    },
    {
      display: "7",
    },
    {
      display: "8",
    },
    {
      display: "9",
    },
    {
      display: "WED",
    },
    {
      display: "",
    },
  ],
  [
    {
      display: "JUN",
    },
    {
      display: "10",
    },
    {
      display: "11",
    },
    {
      display: "12",
    },
    {
      display: "13",
    },
    {
      display: "31",
    },
    {
      display: "15",
    },
    {
      display: "THU",
    },
    {
      display: "",
    },
  ],
  [
    {
      display: "JUL",
    },
    {
      display: "16",
    },
    {
      display: "17",
    },
    {
      display: "18",
    },
    {
      display: "19",
    },
    {
      display: "20",
    },
    {
      display: "21",
    },
    {
      display: "FRI",
    },
    {
      display: "SAT",
    },
  ],
  [
    {
      display: "AUG",
    },
    {
      display: "22",
    },
    {
      display: "23",
    },
    {
      display: "24",
    },
    {
      display: "25",
    },
    {
      display: "26",
    },
    {
      display: "27",
    },
    {
      display: "",
    },
    {
      display: "SUN",
    },
  ],
  [
    {
      display: "SEP",
    },
    {
      display: "OCT",
    },
    {
      display: "NOV",
    },
    {
      display: "DEC",
    },
    {
      display: "28",
    },
    {
      display: "29",
    },
    {
      display: "30",
    },
    {
      display: "14",
    },
    {
      display: "",
    },
  ],
];

export const pieces = {
  a: [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  b: [
    [0, 1],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  c: [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  d: [
    [0, 1],
    [0, 1],
    [1, 1],
    [0, 1],
  ],
  e: [[1], [1], [1], [1], [1]],
  f: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
  ],
  g: [
    [1, 1],
    [0, 1],
    [1, 1],
  ],
  h: [
    [1, 1],
    [1, 1],
    [0, 1],
  ],
  i: [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  j: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

export const restrictedPiece = {
  id: "x",
  cords: [[1]],
};

export const ROWS = board.length;
export const COLS = board[0].length;
export const CELL_SIZE = 46;
