import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";

import { PRIMARY } from "../../common/colors";

const CheckBoxContainer = styled(Form.Check)`
  display: flex;
  align-items: center;
  border: 1px solid ${PRIMARY};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 15px;
  margin: 15px 50px 15px 0px;
`;

const CheckBoxInput = styled(Form.Check.Input)`
  cursor: pointer;
  margin: 15px;
  position: relative;
`;

const CheckBoxLabel = styled(Form.Check.Label)`
  cursor: pointer;
  display: block;
  margin: 15px;
`;

const CheckBoxItem = ({ id, label, onSelect }) => {
  return (
    <CheckBoxContainer type="radio" id={id}>
      <CheckBoxInput type="radio" onChange={onSelect} />
      <CheckBoxLabel>{label}</CheckBoxLabel>
    </CheckBoxContainer>
  );
};

export default CheckBoxItem;
