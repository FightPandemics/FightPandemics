import styled from "styled-components";
import { Alert } from "antd";
import { MINT_GREEN, WHITE } from "../../constants/colors";
import { mq } from "constants/theme";

const SuccessAlert = styled(Alert)`
  background-color: ${MINT_GREEN};
  margin: 2rem 2rem 0rem 2rem;
  height: 4rem;
  border: none;
  border-radius: 0.5rem;
  z-index: 10;
  position: absolute;
  right: 3rem;
  animation: fadeOut 4s;
  animation-delay: 6s;
  .ant-alert-message {
    color: ${WHITE};
    padding-right: 1rem;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100%;
    margin: auto;
    height: auto;
    right: 0rem;
  }
`;

export default SuccessAlert;
