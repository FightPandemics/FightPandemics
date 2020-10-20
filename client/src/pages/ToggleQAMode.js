import React from "react";

const ToggleQAMode = ({ history }) => {
  const newVal = !(localStorage.getItem("fp_qa") == "true");
  localStorage.setItem("fp_qa", newVal);
  alert(`QA mode is now ${newVal ? "enabled" : "disabled"}`);
  history.replace("/");
  return null;
};

export default ToggleQAMode;
