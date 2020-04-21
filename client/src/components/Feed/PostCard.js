import { Card } from "antd-mobile";
import styled from "styled-components";
import { theme } from "../../constants/theme";

const { colors, typography } = theme;
const { royalBlue, darkGray } = colors;
const { display } = typography.font.family;
const { xsmall, medium, large, xxlarge } = typography.size;

export default styled(Card)`
  margin-bottom: 2rem;
  border: unset !important;
  &.am-card,
  .am-card-body {
    font-family: ${display};
    border-top: unset;
    &::before {
      content: normal !important;
    }
    .am-card-header {
      display: block;
      padding: 0;

      .am-card-header-content {
        align-items: unset;
        font-size: ${medium};

        img {
          margin-right: 0.7rem;
          border-radius: 4rem;
          width: 4rem;
          height: 4rem;
          max-width: 100%;
        }
      }
      .am-card-header-extra {
        text-align: unset;
        font-size: ${xsmall};
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
        font-size: ${xxlarge};
      }

      .post-description {
        font-weight: 400;
        font-size: ${medium};
        line-height: 2rem;
        overflow-wrap: break-word;
      }

      .view-more {
        font-size: ${large};
        font-weight: 500;
        color: ${royalBlue};
      }

      .social-icons {
        display: flex;

        span {
          width: 4rem;
        }
        .social-icon {
          color: ${darkGray};
          cursor: pointer;
          .social-icon-svg {
            margin-right: 1rem;
          }
          span {
            font-size: ${medium};
          }
        }
      }
    }
  }
`;
