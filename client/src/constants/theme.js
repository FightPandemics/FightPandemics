import { PRIMARY, ROYAL_BLUE } from "./colors";

const theme = {
  global: {
    font: {
      family: "Work Sans",
    },
    focus: {
      border: {
        color: PRIMARY,
      },
    },
    colors: {
      primary: PRIMARY,
      royalBlue: ROYAL_BLUE,
      darkGray: "#282828",
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
      // xxsmall: "1rem",
      xsmall: "1.1rem",
      small: "1.2rem",
      medium: "1.4rem",
      large: "1.6rem",
      xlarge: "1.8rem",
      xxlarge: "2.2rem",
      xxlarge: "2.6rem",
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
  colors: {
    primary: PRIMARY,
    royalBlue: ROYAL_BLUE,
    darkGray: "#282828",
  },
  button: {
    border: {
      width: "0",
      radius: "24px",
      color: "transparent",
    },
    color: "#fff",
    padding: {
      vertical: "1rem",
    },
    primary: {
      color: "#fff",
      backgroundColor: PRIMARY,
      borderRadius: "18px",
      fontWeight: "bold",
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
      color: "#fff",
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
