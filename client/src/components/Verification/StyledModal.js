import React from "react";
import styled from "styled-components";
import { theme, mq } from "constants/theme";
import { Modal } from "antd";
import LinkButton from "components/Button/LinkButton";

const { colors, typography } = theme;
const { font, size } = typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
    .ant-modal-body {
      font-family: ${font.family.display};
      font-style: normal;
      h5.ant-typography {
        text-align: center;
        font-size: ${size.xxlarge};
        font-weight: bold;
      }
      .ant-result {
        padding: 0 3rem;
      }
    }
  }
`;

export const StyledButton = styled(LinkButton)`
  width: 20rem;
  margin: 0 auto!important;
`;

export default StyledModal;
