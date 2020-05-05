import styled from "styled-components";
import { Button } from "antd-mobile";

const BaseButton = styled(Button)`
  &.am-button {
    border: none;
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    &.am-button::before {
      content: unset !important;
    }
  }
`;

export default BaseButton;
