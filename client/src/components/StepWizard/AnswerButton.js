import styled from "styled-components";
import { theme } from "constants/theme";
import React from "react";

const { colors, typography } = theme;

const StyledAnswerButton = styled.div`
  display: block;
  background-color: ${colors.white};
  color: ${colors.black};
  font-family: ${typography.font.family.display}, sans-serif;
  font-size: ${typography.size.large};
  border: 0.1rem solid ${colors.royalBlue};
  border-radius: 0.8rem;
  box-sizing: border-box;
  cursor: pointer;
  padding: 2.5rem 0 2.5rem 2.5rem;
  margin: 1.5rem 0;
  width: 100%;

  &:hover {
    background-color: ${colors.royalBlue};
    color: ${colors.white};
  }

  strong {
    display: block;
  }

  & > * {
    pointer-events: none;
  }
`;

const AnswerButton = ({ children, onSelect, ...props }) => {
  return (
    <StyledAnswerButton onClick={onSelect} {...props}>
      {children}
    </StyledAnswerButton>
  );
};

export default AnswerButton;
