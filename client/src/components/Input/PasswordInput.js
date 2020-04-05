import React, { useRef, useState } from "react";
import styled from "styled-components";

import LabelledInput from "./LabelledInput";
import BaseInput from "./BaseInput";

import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";

const Input = styled(BaseInput).attrs((props) => ({
  type: props.isVisible ? "text" : "password",
}))``;

const StyleEye = {
  float: "right",
  marginLeft: "-25px",
  marginTop: "-10px",
  position: "relative",
  zIndex: 2,
  opacity: 0.5,
};

const EyeIcon = styled(VisibilityIcon).attrs((props) => ({}))``;

export default ({ label, placeholder, labelStyle, inputStyle, ...props }) => {
  const [isVisible, setVisible] = useState(false);
  const passwordRef = useRef();

  const onToggleVisibility = () => {
    const { current: input } = passwordRef;
    setVisible(!isVisible);
  };

  return (
    <LabelledInput label={label} style={labelStyle}>
      <div>
        <Input
          style={inputStyle}
          placeholder={placeholder}
          ref={passwordRef}
          isVisible={isVisible}
          {...props}
        />
        {isVisible ? (
          <VisibilityOffIcon style={StyleEye} onClick={onToggleVisibility} />
        ) : (
          <VisibilityIcon style={StyleEye} onClick={onToggleVisibility} />
        )}
      </div>
    </LabelledInput>
  );
};
