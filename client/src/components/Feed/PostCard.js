import { Card } from "antd-mobile";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";

const { colors, typography } = theme;
const { royalBlue, darkGray } = colors;
const { display } = typography.font.family;
const { xsmall, small, medium, large, xxlarge } = typography.size;

const PostCard = styled(Card)`
  margin-bottom: 4rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: unset !important;
  }

  &.am-card {
    font-family: ${display};

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-top: unset;
    }

    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      border: 0.4px solid rgba(0, 0, 0, 0.5);
      border-radius: 2px;
      padding: 20px 24px;
    }

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
      border-top: unset;
      padding: 0;
      color: black;

      h2 {
        font-weight: bold;
        line-height: 2.7rem;
        font-size: ${xxlarge};
      }

      .post-description {
        font-weight: 400;
        font-size: ${medium};
        line-height: 2rem;
      }

      &.content-wrapper {
        padding: 0 34px;
      }

      &.view-more-wrapper {
        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          border-bottom: 0.3px solid rgba(0, 0, 0, 0.5);
          margin-bottom: 13px;
          padding: 0 34px;
        }
      }

      .view-more {
        font-size: ${large};
        font-weight: 500;
        color: ${royalBlue};

        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          font-size: ${small};
          font-weight: 600;
        }
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

        .total-number {
          display: inline;

          @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
            display: none;
          }
        }

        .social-text {
          display: none;

          @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
            display: inline;
          }
        }
      }

      &.comments-wrapper {
        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          display: none;

          &.show-comments {
            display: block;
          }
        }
      }
    }
  }
`;

export default PostCard;
