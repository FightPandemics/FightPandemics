import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import Head from "./Head";
import { Section } from "../StyledModal";

const TitleInput = styled(Input)``;
const { TextArea } = Input;
const TextInput = styled(TextArea)`
  border-top: none;
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
      />
      <TextInput
        onChange={onChangeDescription}
        value={formData.description}
        rows={4}
        placeholder="Write your post"
      />
      <span className="error-box">{renderError("description")}</span>
    </Section>
  );
};

export default First;
