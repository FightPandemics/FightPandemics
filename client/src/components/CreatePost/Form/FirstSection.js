import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import Head from "./Head";
import { Section } from "../StyledModal";
import { theme } from "constants/theme";
const { black } = theme.colors;

const TitleInput = styled(Input)`
  .ant-modal-root .ant-modal-content .ant-modal-body & {
    font-size: 1.5rem;
    color: ${black};
  }
`;
const { TextArea } = Input;
const TextInput = styled(TextArea)`
  .ant-modal-root .ant-modal-content .ant-modal-body & {
    border-top: none;
    font-size: 1.2rem;
    resize: none;
    overflow-y: scroll;
    font-weight: 450;
  }
`;

const First = ({
  onChangeTitle,
  onChangeDescription,
  renderError,
  formData,
}) => {
  return (
    <Section>
      <Head number={1} title="Write your post here" />
      <TitleInput
        onChange={onChangeTitle}
        value={formData.title}
        placeholder="Title"
        maxLength={35}
        required
      />
      <TextInput
        onChange={onChangeDescription}
        value={formData.description}
        rows={7}
        placeholder="Write your post"
        required
      />
      <span className="error-box">{renderError("description")}</span>
    </Section>
  );
};

export default First;
