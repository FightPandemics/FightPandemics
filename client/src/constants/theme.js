import {
  PRIMARY,
  ROYAL_BLUE,
  DARK_GRAY,
  DARKER_GRAY,
  MEDIUM_GRAY,
  LIGHT_GRAY,
  LIGHTER_GRAY,
  SELAGO,
  ORANGE_RED,
  RED,
  GREEN,
  MINT_GREEN,
  BLACK,
  WHITE,
  OFF_WHITE,
  TROPICAL_BLUE,
} from "./colors";

const theme = {
  typography: {
    font: {
      family: {
        display: "Poppins",
        body: "Work Sans",
        button: "DM Sans",
      },
    },
    size: {
      xxsmall: "1rem",
      xsmall: "1.1rem",
      small: "1.2rem",
      medium: "1.4rem",
      large: "1.6rem",
      xlarge: "1.8rem",
      xxlarge: "2.2rem",
      xxxlarge: "2.6rem",
    },
    heading: {
      font: "Poppins",
      one: "4.2rem",
      two: "3.2rem",
      three: "2.6rem",
      four: "2.2rem",
    },
    paragraph: {
      center: {
        textAlign: "center",
      },
      skip: {
        textAlign: "center",
        color: PRIMARY,
        marginTop: "1rem",
      },
    },
  },
  backgrounds: {
    primary: "linear-gradient(337.81deg, #425AF2 3.41%, #677CF2 98.66%)",
  },
  colors: {
    primary: PRIMARY,
    royalBlue: ROYAL_BLUE,
    tropicalBlue: TROPICAL_BLUE,
    selago: SELAGO,
    darkGray: DARK_GRAY,
    darkerGray: DARKER_GRAY,
    mediumGray: MEDIUM_GRAY,
    lightGray: LIGHT_GRAY,
    lighterGray: LIGHTER_GRAY,
    orangeRed: ORANGE_RED,
    red: RED,
    green: GREEN,
    mintGreen: MINT_GREEN,
    black: BLACK,
    white: WHITE,
    offWhite: OFF_WHITE,
  },
  button: {
    fontFamily: "DM Sans",
    border: {
      width: "0",
      radius: "24px",
      color: "transparent",
    },
    color: WHITE,
    padding: {
      vertical: "1rem",
    },
    regular: {
      fontFamily: "Poppins",
      fontSize: "1.8rem",
      fontWeight: "bold",
      borderRadius: "4.6rem",
    },
    primary: {
      backgroundColor: ROYAL_BLUE,
      color: WHITE,
    },
    primarylight: {
      backgroundColor: SELAGO,
      color: ROYAL_BLUE,
    },
    secondary: {
      backgroundColor: WHITE,
      color: ROYAL_BLUE,
      border: `0.1rem solid ${ROYAL_BLUE} !important`,
    },
    tertiary: {
      fontSize: "1.6rem",
      fontWeight: "500",
      textAlign: "center",
      color: ROYAL_BLUE,
    },
    inlineBlock: {
      padding: "0 3rem",
    },
    iconAndText: {
      color: DARK_GRAY,
      backgroundColor: "transparent",
      border: {
        width: 0,
        color: "transparent",
      },
      display: "inline-flex",
      alignItems: "center",
      textAlign: "center",
      width: "auto",
    },
  },
  icon: {
    stroke: PRIMARY,
    light: {
      stroke: WHITE,
    },
    dark: {
      stroke: PRIMARY,
    },
  },
  form: {
    label: {
      color: PRIMARY,
      fontSize: "2rem",
      marginBottom: "0.5rem",
    },
    input: {
      fontSize: "2rem",
    },
    button: {
      color: WHITE,
      backgroundColor: ROYAL_BLUE,
      borderColor: ROYAL_BLUE,
    },
  },
};

const mq = {
  phone: {
    narrow: {
      minWidth: 0,
      maxWidth: "449px",
      min: "(min-width: 0)",
      max: "(max-width: 449px)",
    },
    wide: {
      minWidth: "450px",
      maxWidth: "767px",
      min: "(min-width: 450px)",
      max: "(max-width: 767px)",
    },
  },
  tablet: {
    narrow: {
      minWidth: "768px",
      maxWidth: "1023px",
      min: "(min-width: 768px)",
      max: "(max-width:1023px)",
    },
    wide: {
      minWidth: "1024px",
      maxWidth: "1279px",
    },
  },
  desktop: {
    small: {
      minWidth: "1280px",
      maxWidth: "1439px",
    },
    medium: {
      minWidth: "1440px",
      maxWidth: "1919px",
    },
    large: {
      minWidth: "1920px",
    },
  },
};

export { theme, mq };
