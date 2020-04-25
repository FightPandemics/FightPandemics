import React from "react";
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
    borderColor: error ? "#FF5656" : "#5970EC",
    borderWidth: "thin",
    marginBottom: "2rem",
    marginTop: "0.4rem",
    paddingBottom: "0.5rem",
    color: "#000000",
  };
  return (
    <>
      {inputTitle && (
        <label style={{ color: error ? "#FF5656" : "#425AF2" }}>
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
