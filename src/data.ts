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
  "1": [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  "2": [
    [0, 1],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  "3": [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  "4": [
    [0, 1],
    [0, 1],
    [1, 1],
    [0, 1],
  ],
  "5": [[1], [1], [1], [1]],
  "6": [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
  ],
  "7": [
    [1, 1],
    [0, 1],
    [1, 1],
  ],
  "8": [
    [1, 1],
    [1, 1],
    [0, 1],
  ],
  "9": [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  "10": [
    [0, 0, 1],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

// `${isFlipped}_${(rotation / 90)}`
export const pieceRotation = [
  "0_0",
  "0_1",
  "0_2",
  "0_3",
  "1_0",
  "1_1",
  "1_2",
  "1_3",
];

export const flipCords = (cords: number[][]) => {
  return cords.map((row) => [...row].reverse());
};

export const rotateCords = (cords: number[][], angle: number): number[][] => {
  if (angle === 0) return cords;
  const rows = cords.length;
  const cols = cords[0].length;
  const rotated = Array(cols)
    .fill(0)
    .map(() => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = cords[i][j];
    }
  }

  return angle === 1 ? rotated : rotateCords(rotated, angle - 1);
};
