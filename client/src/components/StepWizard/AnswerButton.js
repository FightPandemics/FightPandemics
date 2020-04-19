import styled from "styled-components";
import { PRIMARY } from "../../constants/colors";
import { theme } from "../../constants/theme";
import React from "react";

const { typography } = theme;

const AnswerStyles = styled.div`
  display: block;
  background-color: #fff;
  border: 2px solid ${PRIMARY};
  border-radius: 8px;
  box-sizing: border-box;
  font-family: ${typography.font.family.display}, sans-serif;
  cursor: pointer;
  padding: 20px 50px;
  margin: 15px 0px;
  &:hover {
    background-color: ${PRIMARY};
    color: #fff;
  }

  strong {
    display: block;
  }
`;

const AnswerButton = ({ children, onSelect }) => {
  return <AnswerStyles onClick={onSelect}>{children}</AnswerStyles>;
};

export default AnswerButton;
