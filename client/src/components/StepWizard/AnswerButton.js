import styled from "styled-components";
import { PRIMARY } from "../../constants/colors";
import React from "react";

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

const AnswerButton = ({ children, onSelect }) => {
  return (
    <AnswerStyles onClick={onSelect}>
      <>{children}</>
    </AnswerStyles>
  );
};

export default AnswerButton;
