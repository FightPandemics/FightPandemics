import styled from "styled-components";
import { Modal } from "antd-mobile";
import { theme } from "constants/theme";

const { darkerGray } = theme.colors;

const ThanksModal = styled(Modal)`
  font-family: ${theme.typography.font.family.display};
  width: 80vw;
  @media screen and (min-width: 1024px) {
    width: 29vw;
  }
  .title {
    font-weight: bold;
    margin: 4rem 3rem 2rem;
  }

  p {
    text-align: center;
    font-weight: 500;
    color: ${darkerGray};
  }

  & .am-modal-content {
    & .am-modal-body {
      padding-bottom: 2rem;
    }
  }
`;

export default ThanksModal;
