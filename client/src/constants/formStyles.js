import { theme } from "constants/theme";

const { colors } = theme;

export const inputStyles = {
  fontSize: "1.8rem",
  lineHeight: "2.5rem",
  paddingBottom: "0.8rem",
  width: "100%",
  borderBottom: `2px solid ${colors.primary}`,
  backgroundColor: "transparent",
};

export const labelStyles = {
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "1.6rem",
  lineHeight: "1.9rem",
  textAlign: "left",
};
