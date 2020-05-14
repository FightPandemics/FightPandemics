import { Typography } from "antd";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { Title } = Typography;

// example usage: <Heading level={3} className="h3">{isLoginForm ? "Sign In" : "Sign Up"}</Heading>

const Heading = styled(Title)`
  &.ant-typography {
    font-weight: bold;
    color: ${(props) => props.color};
    ${theme.typography.heading.font}
  }

  &.h1 {
    font-size: ${theme.typography.heading.one};
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: ${theme.typography.heading.three};
    }
  }
  &.h2 {
    font-size: ${theme.typography.heading.two};
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: ${theme.typography.heading.four};
    }
  }
  &.h3 {
    font-size: ${theme.typography.heading.three};
  }
  &.h4 {
    font-size: ${theme.typography.heading.four};
  }
`;

export default Heading;
