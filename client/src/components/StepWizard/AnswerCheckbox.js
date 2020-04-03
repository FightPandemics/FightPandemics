import styled from "styled-components";
import React from "react";
import { Checkbox } from "antd-mobile";

import { PRIMARY } from "../../constants/colors";

const AnswerStyles = styled.div`
  display: block;
  background-color: #fff;
  border: 2px solid ${PRIMARY};
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  padding: 20px 50px;
  margin: 15px 0px;
  &:hover {
    background-color: ${PRIMARY};
    color: #fff;
  }
`;

const AnswerCheckbox = ({ children, checked, onSelect }) => {
  return (
    <AnswerStyles onClick={onSelect}>
      <>{children}</>
      <Checkbox checked={checked} />
    </AnswerStyles>
  );
};

export default AnswerCheckbox;
