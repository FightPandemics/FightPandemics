import { Typography } from "antd";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { Title } = Typography;
const { heading } = theme.typography;

// example usage: <Heading level={3} className="h3">{isLoginForm ? "Sign In" : "Sign Up"}</Heading>

const Heading = styled(Title)`
  &.ant-typography {
    font-weight: bold;
    padding: 1rem;
    color: ${(props) => props.color};
    ${heading.font}
  }

  &.h1 {
    font-size: ${heading.one};
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: ${heading.three};
    }
  }
  &.h2 {
    font-size: ${heading.two};
    text-align: ${(props) => props.textAlign || "center"};
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: ${heading.three};
    }
  }
  &.h3 {
    font-size: ${heading.three};
  }
  &.h4 {
    font-size: ${heading.four};
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin-top: 10%;
      font-size: ${heading.three};
    }
  }
`;

export default Heading;
