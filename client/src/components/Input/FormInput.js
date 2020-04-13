import React from "react";
export default ({ inputTitle, name, defaultValue, reference, ...props }) => {
  return (
    <>
      <label style={{ color: "#425AF2" }}>{inputTitle}</label>
      <input
        style={inputFieldStyle}
        name={name}
        defaultValue={defaultValue}
        ref={reference}
        {...props}
      />
    </>
  );
};

const inputFieldStyle = {
  borderTopStyle: "hidden",
  borderLeftStyle: "hidden",
  borderRightStyle: "hidden",
  borderColor: "#5970EC",
  borderWidth: "thin",
  marginBottom: "2rem",
  marginTop: "1rem",
  paddingBottom: "0.5rem",
};
