import React, { useState, useEffect } from "react";
import { Input } from "antd";
import styled from "styled-components";
import Head from "./Head";
import { Section } from "../StyledModal";
import { theme } from "constants/theme";
import InputError from "components/Input/InputError";
import { validateEmail } from "utils/validators";
const { black } = theme.colors;

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
  font-weight: 450 !important;
`;

const First = ({
  onChangeTitle,
  onChangeDescription,
  renderError,
  formData,
}) => {
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const validated = !formData.title || validateEmail(formData.title);
    setValid(validated);
  }, [formData.title]);
  const onChange = (event) => {
    setValid(event.target.value);
  };
  return (
    <Section>
      <Head number={1} title="Write your post here" />
      <TitleInput
        onChange={onChangeTitle}
        value={formData.title}
        placeholder="Title"
        maxLength={20}
        className={!valid && "has-error"}
        required
      />
      {!valid && <InputError>Please fill out missing fields</InputError>}

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
