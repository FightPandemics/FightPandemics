import React from "react";
import { Radio } from "antd";
import styled from "styled-components";
import { theme } from "../../constants/theme";
const { darkGray } = theme.colors;
const { medium } = theme.typography.size;

const StyledRadio = styled(Radio)`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  span.ant-radio + * {
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
`;

export default ({ options, onChange, block }) => {
  return (
    <Radio.Group onChange={onChange}>
      {options.map((option, idx) => (
        <StyledRadio block={block} value={option} key={idx}>
          {option.text}
        </StyledRadio>
      ))}
    </Radio.Group>
  );
};
