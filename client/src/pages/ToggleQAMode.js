import React, { useEffect } from "react";

const ToggleQAMode = () => {
  useEffect(() => {
    const newVal = !(localStorage.getItem("fp_qa") == "true");
    localStorage.setItem("fp_qa", newVal);
    alert(`QA mode is now ${newVal ? "enabled" : "disabled"}`);
    window.location = "/";
  }, []);
  return null;
};

export default ToggleQAMode;
