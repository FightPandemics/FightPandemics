import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { Section } from "../CreatePost/StyledModal";
import { theme } from "constants/theme";
import { useTranslation } from "react-i18next";

const { colors, typography } = theme;

const { TextArea } = Input;
export const TextInput = styled(TextArea)`
  .ant-modal-root .ant-modal-content .ant-modal-body & {
    border: 0.1rem solid lightgrey;
    border-radius: 0.6rem;
    min-height: 13.5rem;
    width: 100%;
    margin: 0 0 1.4rem 0;
    padding: 1.4rem;
    resize: none;
    cursor: auto;
    color: black;
    font-size: ${typography.size.medium};
    font-family: ${theme.typography.font.family.body};
    :focus {
      border: 1px solid ${theme.colors.primaryColor};
    }
    ::-webkit-scrollbar {
      border-radius: 0 0.6rem 0.6rem 0;
    }
  }
`;

const Form = ({ onChangeDescription }) => {
  const { t } = useTranslation();
  return (
    <Section>
      <TextInput
        onChange={onChangeDescription()}
        rows={4}
        placeholder={t("moderation.enterDetails")}
        maxLength={512}
      />
    </Section>
  );
};

export default Form;
