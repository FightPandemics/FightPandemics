import { Card } from "antd-mobile";
import styled from "styled-components";
import { ROYAL_BLUE, DARK_GRAY } from "../../constants/colors";

export default styled(Card)`
  margin-bottom: 4rem;
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
        font-size: 1.4rem;

        img {
          margin-right: 0.7rem;
        }
      }
      .am-card-header-extra {
        text-align: unset;
        font-size: 1.1rem;
        margin-left: 4.7rem;
        margin-top: -1.8rem;
        .status-icon {
          margin-right: 0.8rem;
        }
      }
    }
    .am-card-body {
      padding: 0;
      color: black;

      h1 {
        font-weight: bold;
        line-height: 2.7rem;
        font-size: 2.2rem;
      }

      .post-description {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2rem;
      }

      .view-more {
        font-size: 1.6rem;
        font-weight: 500;
        color: ${ROYAL_BLUE};
      }

      .social-icons {
        display: flex;

        span {
          width: 4rem;
        }
        .social-icon {
          color: ${DARK_GRAY};
          cursor: pointer;
          .social-icon-svg {
            margin-right: 1rem;
          }
          span {
            font-size: 1.4rem;
          }
        }
      }
    }
  }
`;
