import React from "react";
import styled from "styled-components";

import withLabel from "./with-label";
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

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, inputValue: "" };
  }

  render() {
    const EyeIcon = this.state.isVisible ? VisibilityIcon : VisibilityOffIcon;
    return (
      <React.Fragment>
        <Input
          style={this.props.inputStyle}
          placeholder={this.props.placeholder}
          isVisible={this.state.isVisible}
          value={this.state.inputValue}
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
        <EyeIcon
          style={StyleEye}
          onClick={() => this.setState({ isVisible: !this.state.isVisible })}
        />
      </React.Fragment>
    );
  }
}
export default ({ label, placeholder, labelStyle, inputStyle, ...props }) => {
  const PasswordField = withLabel(() => (
    <PasswordInput
      inputStyle={inputStyle}
      placeholder={placeholder}
      {...props}
    />
  ));
  return <PasswordField label={label} style={labelStyle} />;
};
