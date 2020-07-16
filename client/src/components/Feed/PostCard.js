// Core
import { Card } from "antd-mobile";
import styled from "styled-components";

// Constants
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { royalBlue, darkGray } = colors;
const { display } = typography.font.family;
const { xsmall, small, medium, large, xxlarge } = typography.size;

const PostCard = styled(Card)`
  margin-bottom: 4rem;
  margin-left: 2rem;
  margin-right 2rem;
  overflow-wrap: break-word;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: unset !important;
  }

  &.am-card {
    font-family: ${display};

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-top: unset;
    }

    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      border: 0.05rem solid rgba(0, 0, 0, 0.5);
      border-radius: 0.2rem;
      padding: 2rem 2.4rem;
    }

    body .feed-posts & {
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
        border: 0.05rem solid rgba(0, 0, 0, 0.5);
      }
    }

    &::before {
      content: normal !important;
    }

    .card-header {
      display: flex;
      justify-content: space-between;

      .card-submenu {
        display: flex;
        cursor: pointer;

        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          display: block;
        }
      }

      svg {
        circle {
          fill: ${darkGray};
        }
      }
    }

    .am-card-header {
      display: block;
      padding: 0;

      .am-card-header-content {
        align-items: unset;
        font-size: ${medium};

        .title-wrapper {
          width: calc(100% - 4.7rem);
        }

        img {
          margin-right: 0.7rem;
          border-radius: 4rem;
          width: 4rem;
          height: 4rem;
        }

        .author {
          font-size: ${medium};
          height: auto;
        }

        .location-status {
          height: 3rem;
          margin-top: -1.2rem;
          color: #888;
          font-size: ${xsmall};

          img {
            width: 0.6rem;
            margin-right: 0.8rem;
          }
        }
      }
    }

    .am-card-body {
      border-top: unset;
      padding: 0;
      color: black;
      white-space: pre-line;

      &::before {
        content: none;
      }

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
        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          padding: 0 3.4rem;
        }
      }

      &.view-more-wrapper {
        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          border-bottom: 0.03rem solid rgba(0, 0, 0, 0.5);
          margin-bottom: 1.3rem;
          padding: 0 3.4rem;
        }
      }

      .view-more {
        font-size: ${large};
        font-weight: 500;
        color: ${royalBlue};
        cursor: pointer;

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
          font-size: ${medium};
          display: inline;

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
