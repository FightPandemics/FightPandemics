import {
  ROYAL_BLUE,
  DARK_GRAY,
  DARKISH_GRAY,
  DARKER_GRAY,
  MEDIUM_GRAY,
  LIGHT_GRAY,
  LIGHTER_GRAY,
  LIGHTISH_GRAY,
  MEDIUMISH_GRAY,
  SELAGO,
  ORANGE_RED,
  RED,
  GREEN,
  MINT_GREEN,
  BLACK,
  WHITE,
  OFF_WHITE,
  TROPICAL_BLUE,
  GRAY,
  LIGHTER_BLACK,
  GHOST_WHITE,
  SHADOW_BLACK
} from "./colors";

const theme = {
  typography: {
    font: {
      family: {
        display:
          'Poppins, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        body: '"Work Sans", sans-serif',
        button: '"DM Sans", sans-serif',
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
      font: '"Poppins", sans-serif',
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
        color: ROYAL_BLUE,
        marginTop: "1rem",
      },
    },
  },
  backgrounds: {
    primary: "linear-gradient(337.81deg, #425AF2 3.41%, #677CF2 98.66%)",
  },
  colors: {
    royalBlue: ROYAL_BLUE,
    tropicalBlue: TROPICAL_BLUE,
    selago: SELAGO,
    darkGray: DARK_GRAY,
    darkishGray: DARKISH_GRAY,
    darkerGray: DARKER_GRAY,
    mediumGray: MEDIUM_GRAY,
    lightGray: LIGHT_GRAY,
    lighterGray: LIGHTER_GRAY,
    lightishGray: LIGHTISH_GRAY,
    mediumishGray: MEDIUMISH_GRAY,
    orangeRed: ORANGE_RED,
    red: RED,
    green: GREEN,
    mintGreen: MINT_GREEN,
    black: BLACK,
    white: WHITE,
    offWhite: OFF_WHITE,
    gray: GRAY,
    lighterBlack: LIGHTER_BLACK,
    ghostWhite: GHOST_WHITE,
    shadowBlack: SHADOW_BLACK,
  },
  button: {
    fontFamily: '"DM Sans", sans-serif',
    border: {
      width: "0",
      radius: "2.4rem",
      color: "transparent",
    },
    color: WHITE,
    padding: {
      vertical: "1rem",
    },
    regular: {
      fontFamily: '"Poppins", sans-serif',
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
    secondaryRed: {
      backgroundColor: WHITE,
      color: ORANGE_RED,
      border: `0.1rem solid ${ORANGE_RED} !important`,
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
    stroke: ROYAL_BLUE,
    light: {
      stroke: WHITE,
    },
    dark: {
      stroke: ROYAL_BLUE,
    },
  },
  form: {
    label: {
      color: ROYAL_BLUE,
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
    extra: {
      minWidth: "3840px",
    },
  },
};

export { theme, mq };
