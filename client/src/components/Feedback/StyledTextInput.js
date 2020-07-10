import styled from "styled-components";
import { theme } from "constants/theme";
import React, { useState } from "react";
import { SET_VALUE } from "../../hooks/actions/feedbackActions";
import TextInput from "components/Input/TextInput";

const StyledTextInput = styled(TextInput)`
  width: 100%;
  padding-top: 2rem;

  &.am-list-item {
    &.am-input-item {
      padding-left: 0;

      .am-list-line {
        padding-right: 0;
      }
    }
  }
  .am-input-control {
    input {
      ${theme.form.input}
      color: ${theme.colors.darkGray};
      border-bottom: 0.1rem solid ${theme.colors.primary};
      padding: 0.8rem;
      margin: 0.5rem 0;
    }
  }
`;

const TextField = ({ label, onChange }) => {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.state.value);
    onChange(SET_VALUE, label, inputText);
  };

  return (
    <StyledTextInput
      value={inputText}
      onChange={(e) => handleChange(e)}
      label={label}
    ></StyledTextInput>
  );
};

export default TextField;
