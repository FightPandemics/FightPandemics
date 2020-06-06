import { theme } from "constants/theme";

export const inputStyles = {
  backgroundColor: "transparent",
  fontSize: "1.8rem",
  lineHeight: "2.5rem",
  paddingBottom: "0.8rem",
  marginBottom: "1.2rem",
  width: "100%",
};

export const labelStyles = {
  fontSize: "1.6rem",
  lineHeight: "1.5rem",
};

export const blockLabelStyles = {
  ...labelStyles,
  display: "block",
  fontWeight: "500",
  marginBottom: "1rem",
};

export const inlineLabelStyles = {
  ...labelStyles,
  color: theme.colors.darkerGray,
  lineHeight: "2rem",
};
