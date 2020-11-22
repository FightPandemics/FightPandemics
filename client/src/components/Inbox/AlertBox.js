import React from "react";
import styled from "styled-components";
import { Modal } from "antd-mobile";
import { mq, theme } from "constants/theme";

const StyledModal = styled(Modal)`
  min-width: 326px;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 90vw;
    min-width: 90vw;
  }

  .am-modal-content {
    padding-top: 2rem;
  }
  .am-modal-header {
    padding: 0.7rem;
  }

  .am-modal-title {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  .am-modal-body {
    font-family: ${theme?.typography?.font?.family?.body};
    color: #333333;
    line-height: 2rem;
    font-size: 1.4rem;
    padding: 0 2rem 2rem !important;
  }

  .am-modal-button-group-h {
    flex-wrap: wrap;
    border-top: none;

    .am-modal-button {
      width: 100%;
      flex: 100%;
      font-size: 1.4rem;
      font-family: ${theme?.typography?.font?.family?.body};
      height: 4.4rem;
      line-height: 4.4rem;
      border-top: 1px solid #f2f2f2;
      span {
        display: block;
      }
    }
  }
`;

export const AlertBox = ({ children, ...props }) => {
  return <StyledModal {...props}>{children}</StyledModal>;
};
