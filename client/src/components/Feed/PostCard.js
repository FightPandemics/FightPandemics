import { Card } from "antd-mobile";
import styled from "styled-components";
import { ROYAL_BLUE, DARK_GRAY, SELAGO } from "../../constants/colors";

export default styled(Card)`
  margin-bottom: 65px;
  border: unset !important;
  &.am-card,
  .am-card-body {
    border-top: unset;
    &::before {
      content: normal !important;
    }
    .am-card-header {
      display: block;
      padding: 0;

      .am-card-header-content {
        align-items: unset;
        font-size: 15px;

        img {
          margin-top: -5px;
          margin-right: 7px;
        }
      }
      .am-card-header-extra {
        text-align: unset;
        font-size: 13px;
        margin-left: 47px;
        margin-top: -13px;
        .status-icon {
          margin-right: 8px;
        }
      }
    }
    .am-card-body {
      padding: 0;
      color: black;

      h1 {
        font-size: 21px;
        margin: 0;
      }

      p {
        font-weight: 400;
        font-size: 13.5px;
        line-height: 20px;
      }

      .view-more {
        color: ${ROYAL_BLUE};
        font-weight: 500;
      }

      .test {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .social-icons {
        display: flex;
      }
      .social-icon {
        display: flex;
        align-items: center;
        color: ${DARK_GRAY};
        margin-right: 46px;
        cursor: pointer;
        .social-icon-svg {
          margin-right: 10px;
        }
        span {
          font-size: 15px;
        }
      }
    }
  }
`;
