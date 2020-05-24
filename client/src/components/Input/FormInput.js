import React from "react";
import { theme } from "constants/theme";

const { black, orangeRed, primary, royalBlue } = theme.colors;

export default ({
  inputTitle,
  name,
  defaultValue,
  reference,
  error,
  ...props
}) => {
  const inputFieldStyle = {
    borderTopStyle: "hidden",
    borderLeftStyle: "hidden",
    borderRightStyle: "hidden",
    borderColor: error ? `${orangeRed}` : `${primary}`,
    borderWidth: "thin",
    marginBottom: "2rem",
    marginTop: "0.4rem",
    paddingBottom: "0.5rem",
    color: `${black}`,
  };
  return (
    <>
      {inputTitle && (
        <label style={{ color: error ? `${orangeRed}` : `${royalBlue}` }}>
          {inputTitle}
        </label>
      )}
      <input
        style={inputFieldStyle}
        name={name}
        defaultValue={defaultValue}
        ref={reference}
        placeholder="Please fill in the blank"
        {...props}
      />
    </>
  );
};
