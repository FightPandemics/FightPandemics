import styled from "styled-components";
import { Comment } from "antd";
import { theme } from "constants/theme";

const { colors, typography } = theme;
const { darkGray, lighterGray, white } = colors;
const { display } = typography.font.family;
const { xsmall, medium } = typography.size;

const StyledComment = styled(Comment)`
  &.ant-comment {
    cursor: default;
    font-family: ${display};
    display: inline-block;
    word-break: break-word;
    .ant-comment-inner {
      padding: 1rem 0;
      .ant-comment-content {
        max-width: 30rem;
        .ant-comment-content-author-time {
          cursor: default;
          padding-right: 25px;
          color: ${darkGray};
        }
        .ant-comment-content-author {
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
          margin-bottom: 0;
          padding: 1rem 0 0.5rem 1.5rem;
          .ant-comment-content-author-name > * {
            color: black;
            font-weight: 500;
            font-size: ${medium};
          }
        }
        .ant-comment-content-detail {
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          outline: none;
          padding: 0 1.5rem 1.5rem;
          font-size: ${medium};
          line-height: 140%;
        }
        .ant-comment-actions {
          position: relative;
          margin-top: 0;
          padding-left: 1.5rem;
          li {
            span {
              padding-right: 2.3rem;
              font-size: ${xsmall};
              color: black;
            }
            .comment-likes {
              background: ${white};
              color: ${darkGray};
              font-size: ${xsmall};
              box-shadow: 0px 0.1rem 0.4rem rgba(0, 0, 0, 0.06);
              border-radius: 0.85rem;
              position: absolute;
              min-width: 3.6rem;
              min-height: 1.7rem;
              right: -0.5rem;
              top: -1.2rem;
              padding: 0.2rem 0.3rem;
              img {
                padding-left: 0.2rem;
                padding-right: 0.7rem;
              }
            }
            &:last-child {
              display: block;
              margin-top: 1rem;
              .reply-input {
                display: flex;
                align-items: center;
                span {
                  padding-right: 0;
                  margin-right: 1.2rem;
                }

                textarea {
                  width: calc(100% - 50pxrem);
                }
              }
            }
          }
        }
        .ant-comment-content-author,
        .ant-comment-content-detail {
          background-color: ${lighterGray};
        }
      }
    }
  }
`;

export default StyledComment;
