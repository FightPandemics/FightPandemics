import { Checkbox } from "antd-mobile";
import { PRIMARY } from "../../constants/colors";
import React from "react";
import styled from "styled-components";

const AnswerStyles = styled.div`
  align-items: center;
  display: flex;
  border: 2px solid ${PRIMARY};
  border-radius: 8px;
  box-sizing: border-box;
  color: ${PRIMARY};
  cursor: pointer;
  padding: 20px 50px;
  margin: 15px 0px;
  &.selected,
  &:hover {
    background-color: ${PRIMARY};
    color: #fff;
  }
  > .text {
    flex-grow: 1;
    margin-right: 10px;
  }
`;

const AnswerCheckbox = ({ text, checked, onSelect }) => {
  return (
    <AnswerStyles onClick={onSelect} className={checked && "selected"}>
      <span className="text">{text}</span>
      <Checkbox checked={checked} />
    </AnswerStyles>
  );
};

export default AnswerCheckbox;
