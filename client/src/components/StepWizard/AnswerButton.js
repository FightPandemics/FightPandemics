import React from "react";
import styled from "styled-components";
import { theme } from "../../constants/theme";

const { typography } = theme;

const AnswerStyles = styled.div`
  display: block;
  background-color: #fff;
  color: #000;
  font-family: ${typography.font.family.display}, sans-serif;
  font-size: ${typography.size.large};
  border: 0.1rem solid ${theme.colors.royalBlue};
  border-radius: 0.8rem;
  box-sizing: border-box;
  cursor: pointer;
  padding: 25px 0 25px 52px;
  margin: 15px 0px;
  &:hover {
    background-color: ${theme.colors.royalBlue};
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
