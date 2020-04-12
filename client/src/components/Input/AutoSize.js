import React from "react";
import TextArea from "./TextArea";

export default ({ placeholder, value, onChange, onPressEnter }) => {
  return (
    <div>
      <TextArea
        autoSize
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
        placeholder={placeholder}
      />
    </div>
  );
};
