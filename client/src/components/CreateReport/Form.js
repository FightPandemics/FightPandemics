import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { Section } from "../CreatePost/StyledModal";
import { theme } from "constants/theme";

const { colors, typography } = theme;

const { TextArea } = Input;
export const TextInput = styled(TextArea)`
  .ant-modal-root .ant-modal-content .ant-modal-body & {
    resize: none;
    overflow-y: scroll;
    box-sizing: border-box;
    border-radius: 0.15rem;
    font-family: ${typography.font.family.display};
    font-style: normal;
    font-weight: normal;
    font-size: ${typography.size.xxsmall};
    line-height: 140%;
    display: flex;
    align-items: center;
  }
`;

const Form = ({ onChangeDescription }) => {
  return (
    <Section>
      <TextInput
        onChange={onChangeDescription()}
        rows={8}
        placeholder="Your description here"
      />
    </Section>
  );
};

export default Form;
