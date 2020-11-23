import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "constants/theme";

const { Text } = Typography;

const TextLabel = styled(Text)`
  &.ant-typography {
    ${theme.typography.heading.font};
    color: ${(props) => props.color || "black"};
    font-size: ${(props) => props.size || theme.typography.size.medium};
    font-weight: ${(props) => props.weight || "normal"};
    text-align: ${(props) => props.textAlign || "left"};
    display: ${(props) => (!props.block ? "" : "block")};
  }
`;
export default TextLabel;
