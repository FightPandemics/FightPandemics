import React from "react";
import TextArea from "./TextArea";

const AutoSize = ({ placeholder, value, onChange, onPressEnter }) => {
    return (
        <TextArea
            autoSize
            value={value}
            onChange={onChange}
            onPressEnter={onPressEnter}
            placeholder={placeholder}
        />
    );
};

export default AutoSize;
