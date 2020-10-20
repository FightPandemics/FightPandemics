import React from "react";

const ToggleQAMode = () => {
  const newVal = !(localStorage.getItem("fp_qa") == "true");
  localStorage.setItem("fp_qa", newVal);
  alert(`QA mode is now ${newVal ? "enabled" : "disabled"}`);
  window.location.reload();
  return null;
};

export default ToggleQAMode;
