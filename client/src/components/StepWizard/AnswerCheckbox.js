import styled from "styled-components";
import React from "react";
import { Checkbox } from "antd-mobile";
import { theme } from "constants/theme";

const { primary, white } = theme.colors;

const AnswerStyles = styled.div`
  align-items: center;
  display: flex;
  border: 2px solid ${primary};
  border-radius: 8px;
  box-sizing: border-box;
  color: ${primary};
  cursor: pointer;
  padding: 20px 50px;
  margin: 15px 0px;
  width: 100%;
  &.selected,
  &:hover {
    background-color: ${primary};
    color: ${white};
  }
  > .text {
    flex-grow: 1;
    margin-right: 10px;
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
