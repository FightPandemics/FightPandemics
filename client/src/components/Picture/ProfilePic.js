import React from "react";

export default ({ initials , noPic}) => {
  return (
    <>{noPic ? <div style={initialsStyle}>{initials}</div> : <div></div>}</>
  );
};

const initialsStyle = {
  margin: "auto",
  marginTop: "0",
  marginBottom: "1rem",
  borderRadius: "50%",
  border: "0.2rem solid #425AF2",
  color: "#425AF2",
  fontSize: "3rem",
  lineHeight: "6rem",
  width: "7rem",
  textAlign: "center",
  backgroundColor: "rgba(66, 90, 245, 0.04)",
};
