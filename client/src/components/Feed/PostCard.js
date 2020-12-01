// Core
import { Card } from "antd-mobile";
import styled from "styled-components";

// Constants
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { royalBlue, darkGray } = colors;
const { xsmall, small, medium, large, xxlarge } = typography.size;

const PostCard = styled(Card)`
  margin-bottom: 4rem;
  padding: 2rem 2rem 0rem 2rem;
  overflow-wrap: break-word;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  ${({ unClickable }) =>
    unClickable
      ? `
   * {
     pointer-events: none;
     user-select: none;
   }
   `
      : ""}

  .blur-overlay {
    border: 0.05rem solid rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 4rem);
    z-index: 1;
    background: rgba(243, 244, 254, 0.3);
    backdrop-filter: blur(12px);
    font-weight: 600;
    font-size: ${medium};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
      margin-top: 4rem;
      display: block;
      color: #425af2;
      font-weight: 500;
      cursor: pointer;
      pointer-events: auto;
    }
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border: unset !important;
      height: 100%;
    }
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: unset !important;
  }

  .pre-header {
    max-width: calc(100% - 4rem);
    position: absolute;
    top: 0;
    padding: 1rem 0;
    margin-top: 1rem;
    font-family: "Work Sans";
    font-size: ${small};
    font-weight: 400;
    color: ${colors.royalBlue};
    -webkit-text-stroke: 0.2px;
    &.post-page {
      position: relative;
      top: unset;
      margin-top: -1rem;
    }
    .timestamp {
      padding-left: 1rem;
      font-size: ${small};
      color: ${colors.darkishGray};
    }
  }

  &.am-card {
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      border-top: unset;
    }

    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      border: 0.01rem solid #e4e4e4;
      border-radius: 0.2rem;
      padding: 2rem 2.4rem;
      padding-bottom: 0.2rem;
    }

    body .feed-posts & {
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
        position: unset;
        border: 0.01rem solid #e4e4e4;
      }
    }
    body .activity & {
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
        position: unset;
        border: 0.01rem solid #e4e4e4;
      }
    }

    &::before {
      content: normal !important;
    }

    .highlighted {
      font-weight: bold;
      color: #425af2;
      background: #f3f4fe;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      > a {
        flex: 1 1 auto;
        display: block;
      }

      > .card-submenu {
        flex: 0 0 auto;
        margin-left: 3rem;
        margin-top: -3.45rem;
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          margin-top: -3.25rem;
        }
        cursor: pointer;
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
        position: relative;
        display: block;
        min-height: 4rem;
        padding-left: 5rem;
        font-size: ${medium};
        color: ${colors.darkerGray};
        font-weight: 500;
        .title-wrapper {
          cursor: default;
        }
        > .ant-avatar-circle,
        > img {
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
        }

        img {
          border-radius: 4rem;
          width: 4rem;
          height: 4rem;
        }

        .author,
        .sub-header {
          line-height: 2rem;
          font-size: ${xsmall};
        }

        .author {
          font-size: ${large};
          cursor: pointer;
        }

        .location-status {
          position: relative;
          padding-left: 1.4rem;
          font-weight: 500;
          font-family: "Work Sans";
          font-size: ${small};
          color: ${colors.darkishGray};
          img {
            position: absolute;
            top: 0.5rem;
            left: 0;
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0;
          }
        }
      }
    }

    .am-card-body {
      border-top: unset;
      padding: 0;
      color: ${colors.darkerGray};
      font-family: "Work Sans";
      white-space: pre-line;

      &::before {
        content: none;
      }

      .am-tag {
        margin: 0.5rem 0.6rem 0.5rem 0rem;
      }

      h2 {
        font-weight: bold;
        line-height: 2.7rem;
        font-size: ${xxlarge};
      }

      .post-description {
        font-weight: 400;
        font-size: ${large};
        line-height: 2rem;
        letter-spacing: -0.03rem;
        -webkit-text-stroke: 0.2px;
      }

      &.content-wrapper {
        .ant-typography {
          margin: 0;
          padding: 1rem 0;
        }
      }

      &.view-more-wrapper {
        @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
          border-bottom: 0.2rem solid ${colors.lightGray};
          margin-bottom: 1.6rem;
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
      .am-card-footer {
        padding-bottom: 2rem;
      }
      .social-icons {
        display: flex;

        span {
          width: 4rem;
        }
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          span {
            width: 3rem;
          }
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

        .number-with-text {
          font-size: ${medium};
          display: inline;
          @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
            display: none;
          }
        }
        .number-only {
          display: none;
          @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
            display: inline;
            font-size: ${large}!important;
            font-weight: 500;
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
