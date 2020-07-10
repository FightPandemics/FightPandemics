import React, { useRef, useState } from "react";
import styled from "styled-components";

import withLabel from "./with-label";
import BaseInput from "./BaseInput";

// ICONS
import SvgIcon from "./Icon/SvgIcon";
import VisibilityIcon from "assets/icons/eye-mask.svg";
import VisibilityOffIcon from "assets/icons/eye-unmask.svg";

const Input = styled(BaseInput).attrs((props) => ({
  type: props.isVisible ? "text" : "password",
}))``;

const StyleEye = {
  float: "right",
  marginLeft: "-2.5rem",
  marginTop: "-1rem",
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
      <SvgIcon
        src={EyeIcon}
        style={StyleEye}
        onClick={() => setVisible(!isVisible)}
      />
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
