import { Modal } from "antd";
import styled from "styled-components";

// Constants
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { royalBlue, mediumGray, orangeRed } = colors;
const { large, xlarge } = typography.size;

const PostDeleteModal = styled(Modal)`
  .ant-modal-content {
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.12));
    border-radius: 10px;
    .ant-modal-header {
      border-bottom: 1px solid ${mediumGray};
      border-radius: 10px 10px 0 0;
      padding-bottom: 0;
      .ant-modal-title {
        text-align: center;
        font-weight: 700;
        font-size: ${large};
      }
    }
    .ant-modal-body {
      padding: 1rem 3rem;
    }
    .ant-modal-footer {
      border-top: none;
      padding-bottom: 1.8rem;
      .ant-btn {
        font-weight: 500;
        border: none;
        font-size: ${large};
        height: 100%;
        padding: 0.8rem 2.2rem;
        border-radius: 46px;
        span {
          pointer-events: none;
        }
        &:first-child {
          color: ${royalBlue};
        }
        &:last-child {
          color: white;
          background-color: ${orangeRed};
        }
      }
    }
    .ant-modal-close-x {
      @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
        width: 10rem;
      }
      font-size: ${xlarge};
      font-weight: 700;
    }
  }
`;

export default PostDeleteModal;
