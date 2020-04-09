import { PRIMARY, ROYAL_BLUE } from "./colors";

export const theme = {
  global: {
    font: {
      family: "Work Sans",
    },
    focus: {
      border: {
        color: PRIMARY,
      },
    },
  },
  typography: {
    font: {
      family: {
        display: "Poppins",
        body: "Work Sans",
      },
    },
    size: {
      xsmall: "1rem",
      small: "1.1rem",
      medium: "1.2rem",
      large: "1.4rem",
      xlarge: "1.6rem",
    },
    heading: {
      one: "3rem",
      two: "2.4rem",
      three: "2.2rem",
      four: "2rem",
    },
  },
  colors: {
    primary: PRIMARY,
    royalBlue: ROYAL_BLUE,
  },
  button: {
    border: {
      width: "0",
      radius: "24px",
      color: "transparent",
    },
    color: "#fff",
    padding: {
      vertical: "10px",
    },
    primary: {
      color: PRIMARY,
    },
  },
  icon: {
    stroke: PRIMARY,
    light: {
      stroke: "#fff",
    },
    dark: {
      stroke: PRIMARY,
    },
  },
};
