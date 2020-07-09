import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import Head from "./Head";
import { Section } from "../StyledModal";
import { theme } from "constants/theme";
const { black, royalBlue } = theme.colors;

const TitleInput = styled(Input)`
  font-size: 1.5rem !important;
  color: ${black} !important;
  border: solid 0.1rem;
`;
const { TextArea } = Input;
const TextInput = styled(TextArea)`
  border-top: none;
  resize: none;
  overflow-y: scroll;
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
        maxLength={20}
      />
      <TextInput
        onChange={onChangeDescription}
        value={formData.description}
        rows={7}
        placeholder="Write your post"
      />
      <span className="error-box">{renderError("description")}</span>
    </Section>
  );
};

export default First;
