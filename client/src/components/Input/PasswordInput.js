import React, { useRef, useState } from "react";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";

import BaseInput from "./BaseInput";
import styled from "styled-components";
import withLabel from "./with-label";

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

const PwInput = ({ inputStyle, placeholder, ...props }) => {
  const [isVisible, setVisible] = useState(false);
  const passwordRef = useRef();
  const EyeIcon = isVisible ? VisibilityIcon : VisibilityOffIcon;
  return (
    <>
      <Input
        style={inputStyle}
        placeholder={placeholder}
        isVisible={isVisible}
        ref={passwordRef}
        {...props}
      />
      <EyeIcon style={StyleEye} onClick={() => setVisible(!isVisible)} />
    </>
  );
};

const PasswordInput = ({
  label,
  placeholder,
  labelStyle,
  inputStyle,
  ...props
}) => {
  const PasswordField = withLabel(() => (
    <PwInput inputStyle={inputStyle} placeholder={placeholder} {...props} />
  ));
  return <PasswordField label={label} style={labelStyle} />;
};

export default PasswordInput;
