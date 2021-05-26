import React, { useState, useRef, useEffect, memo } from "react";

const TextAreaContainer = (props) => {
  const { isEditable } = props;
  const [text, setText] = useState("XXXX");

  return isEditable ? (
    <textarea
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  ) : (
    <div>{text}</div>
  );
};

export default memo(TextAreaContainer);
