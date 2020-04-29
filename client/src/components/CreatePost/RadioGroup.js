import React from "react";
import { Radio } from "antd";
import styled from "styled-components";
import { theme } from "../../constants/theme";
const { darkGray } = theme.colors;
const { medium } = theme.typography.size;
const { display } = theme.typography.font.family;

const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  .ant-radio-wrapper {
    display: ${(props) => (props.flex ? "flex" : "inline-block")};
    align-items: center;
    flex-flow: row-reverse;
    justify-content: space-between;
    padding: ${(props) => props.padding};

    span.ant-radio + * {
      font-family: ${display};
      font-size: ${medium};
      color: ${darkGray};
      letter-spacing: 0;
    }
    .ant-radio-inner {
      border-color: #6076ef;
      border-width: 0.2rem;
      &::after {
        background-color: #6076ef;
        top: 0.2rem;
        left: 0.2rem;
      }
    }
  }
`;

export default ({ options, onChange, value, defaultValue, flex, padding }) => {
  return (
    <StyledRadioGroup
      size="large"
      flex={flex}
      padding={padding}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {options.map((option, idx) => (
        <Radio value={option.value} key={idx}>
          {option.text}
        </Radio>
      ))}
    </StyledRadioGroup>
  );
};
