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
    font-size: 4.2rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 2.6rem;
    }
  }
  &.h2 {
    font-size: 3.2rem;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 2.6rem;
    }
  }
  &.h3 {
    font-size: 2.6rem;
  }
  &.h4 {
    font-size: 2.2rem;
  }
`;

export default Heading;
