import React from "react";
import { theme } from "../../constants/theme";
import styled from "styled-components";

import { Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { royalBlue } = theme.colors;
const { small } = theme.typography.size;

const StyledButton= styled(Button)`
      font-size: ${small};
      border-radius: .6rem;
      color: ${royalBlue};
      border-color: ${royalBlue};

`;

const CustomDropDown = ({overlay, label, ...props}) => (

  <Dropdown overlay={overlay} {...props}>
    <StyledButton style={{ marginRight: "3rem" }}>
      {label} <DownOutlined />
    </StyledButton>
  </Dropdown>
)

export default CustomDropDown;
