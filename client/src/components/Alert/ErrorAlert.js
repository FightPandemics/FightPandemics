import styled from "styled-components";
import { Alert } from "antd";
import { ORANGE_RED, WHITE } from "../../constants/colors";

const ErrorAlert = styled(Alert)`
  background-color: ${ORANGE_RED};
  margin: ${(props) => (props.fullWidthBanner ? 0 : "1rem 0")};
  position: ${(props) => props.fullWidthBanner && "absolute"};
  width: ${(props) => props.fullWidthBanner && "100%"};

  .ant-alert-message {
    color: ${WHITE};
  }
`;

export default ErrorAlert;
