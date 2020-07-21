import { Typography } from "antd";
import styled from "styled-components";
import { mq, theme } from "constants/theme";

const { Text } = Typography;

/*  Reference from theme.js
    xxsmall: "1rem",
    xsmall: "1.1rem",
    small: "1.2rem",
    medium: "1.4rem",
    large: "1.6rem",
    xlarge: "1.8rem"

    usage:
    <TextLabel
        block="true"
        color={DARK_GRAY}
        size={theme.typography.size.medium}
    >

*/

const TextLabel = styled(Text)`
  &.ant-typography {
    ${theme.typography.heading.font};
    color: ${(props) => props.color || "black"};
    font-size: ${(props) => props.size || theme.typography.size.medium};
    font-weight: ${(props) => props.weight || "normal"};
	text-align: ${(props) => props.textAlign || "left"};
	display: none;

	@media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
		display: block;
	}
  }
`;
export default TextLabel;
