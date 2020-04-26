import styled from "styled-components";
import { Modal } from "antd-mobile";
import { theme } from "../../constants/theme";

const { darkerGray } = theme.colors;

const RadioModal = styled(Modal)`
  font-family: ${theme.typography.font.family.display};
  width: 80vw;
  @media screen and (min-width: 1024px) {
    width: 29vw;
  }
  .title {
    font-weight: bold;
    margin: 2rem 3rem 2rem;
  }

  .am-button {
    display: inline-block;
  }

  .am-modal-body {
    overflow-x: hidden;
  }

  p {
    margin: 1rem 1em 0 0;
    text-align: left;
    font-weight: 500;
  }

  .am-input-control {
    input {
      color: ${darkerGray};
    }
  }
`;

export default RadioModal;
