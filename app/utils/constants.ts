interface Colors {
  primary: string;
  primary50percent: string;
  primary60percent: string;
  white87percent: string;
  secondary: string;
  secondary200: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary800: string;
  background: string;
  white05percent: string;
  white12percent: string;
  white30percent: string;
  black60percent: string;
}

export const colors: Colors = {
  primary: "#64BEE6",
  primary50percent: "#64BEE680",
  primary60percent: "#64BEE699",
  secondary: "#808080",
  secondary200: "#EEEEEE",
  secondary400: "#BDBDBD",
  secondary500: "#CCCCCC",
  secondary600: "#757575",
  secondary800: "#424242",
  background: "#121212",
  white05percent: "#ffffff0D",
  white12percent: "#ffffff1F",
  white30percent: "#ffffff4D",
  white87percent: "#ffffffDE",
  black60percent: "#00000099",
};

export const durationNumbers: number[] = [
  1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
];

export const bpmNumbers: number[] = Array.from(
  { length: 9 },
  (_, index) => index + 2
);

export const inhaleExhaleNumbers: number[] = Array.from(
  { length: 30 },
  (_, index) => index + 1
);
export const holdNumbers: number[] = Array.from(
  { length: 31 },
  (_, index) => index
);
