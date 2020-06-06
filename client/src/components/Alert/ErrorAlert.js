import styled from "styled-components";
import { Alert } from "antd";
import { ORANGE_RED, WHITE } from "../../constants/colors";

const ErrorAlert = styled(Alert)`
  background-color: ${ORANGE_RED};
  .ant-alert-message {
    color: ${WHITE};
  }
`;

export default ErrorAlert;
