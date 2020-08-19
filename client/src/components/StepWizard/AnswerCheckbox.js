import styled from "styled-components";
import React from "react";
import { Checkbox } from "antd-mobile";
import { theme } from "constants/theme";

const { royalBlue, white } = theme.colors;

const AnswerStyles = styled.div`
  align-items: center;
  display: flex;
  border: 2px solid ${royalBlue};
  border-radius: 0.8rem;
  box-sizing: border-box;
  color: ${royalBlue};
  cursor: pointer;
  padding: 2rem 5rem;
  margin: 1.5rem 0;
  width: 100%;
  &.selected,
  &:hover {
    background-color: ${royalBlue};
    color: ${white};
  }
  > .text {
    flex-grow: 1;
    margin-right: 1rem;
  }
`;

const AnswerCheckbox = ({ text, checked, onSelect, ...props }) => {
  return (
    <AnswerStyles
      onClick={onSelect}
      className={checked && "selected"}
      {...props}
    >
      <span className="text">{text}</span>
      <Checkbox checked={checked} />
    </AnswerStyles>
  );
};

export default AnswerCheckbox;
