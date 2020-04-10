import { Card } from "antd-mobile";
import styled from "styled-components";
import { ROYAL_BLUE, DARK_GRAY } from "../../constants/colors";

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
        font-size: 14px;

        img {
          margin-right: 7px;
        }
      }
      .am-card-header-extra {
        text-align: unset;
        font-size: 11px;
        margin-left: 47px;
        margin-top: -18px;
        .status-icon {
          margin-right: 8px;
        }
      }
    }
    .am-card-body {
      padding: 0;
      color: black;

      h1 {
        font-weight: bold;
        line-height: 27px;
        font-size: 22px;
      }

      .post-description {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
      }

      .view-more {
        font-size: 16px;
        font-weight: 500;
        color: ${ROYAL_BLUE};
      }

      .social-icons {
        display: flex;

        span {
          width: 40px;
        }
        .social-icon {
          color: ${DARK_GRAY};
          cursor: pointer;
          .social-icon-svg {
            margin-right: 10px;
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
