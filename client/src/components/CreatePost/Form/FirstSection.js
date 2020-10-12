import React, { Fragment } from "react";
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
    color: ${black};
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
  post,
}) => {
  return (
    <Section>
      <Head number={1} title="Write your post here" />
      <TitleInput
        onChange={onChangeTitle}
        value={formData.title}
        placeholder="Title*"
        maxLength={60}
      />
      <TextInput
        onChange={onChangeDescription}
        value={formData.description}
        rows={7}
        placeholder="Write your post*"
      />
      <div className="error-box" style={{ color: "red" }}>
        {post && !formData.title ? renderError("title") : <Fragment />}
      </div>
      <div className="error-box" style={{ color: "red" }}>
        {post && !formData.description ? (
          renderError("description")
        ) : (
          <Fragment />
        )}
      </div>
    </Section>
  );
};

export default First;
