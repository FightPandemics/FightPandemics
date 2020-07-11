import React from "react";
import { Radio } from "antd";
import styled from "styled-components";
import { theme } from "constants/theme";
const { royalBlue, black } = theme.colors;
const { medium } = theme.typography.size;
const { display } = theme.typography.font.family;

const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  margin-top: 0.5rem;
  text-align: left;
  .ant-radio-wrapper {
    justify-content: space-between;
    padding: ${(props) => props.padding};
    white-space: break-spaces;
    margin-left: -1.5rem;


    span.ant-radio + * {
      font-family: ${display};
      font-size: ${medium};
      color: ${black};
      letter-spacing: 0;
    }
    .ant-radio-inner {
      border-color: ${royalBlue};
      border-width: 0.2rem;
      width: 2.1rem;
      height: 2.1rem;
      &::after {
        background-color: ${royalBlue};
        top: 0.0rem;
        left: 0.0rem;
        width: 1.7rem;
        height: 1.7rem;
      }
    }
  }
`;

const RadioGroup = ({
  options,
  onChange,
  value,
  defaultValue,
  flex,
  padding,
}) => {
  return (
    <StyledRadioGroup
      size="large"
      flex={flex}
      padding={padding}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {options.map((option, index) => (
        <Radio value={option.value} key={index}>
          {option.value}
        </Radio>
      ))}
    </StyledRadioGroup>
  );
};

export default RadioGroup;
