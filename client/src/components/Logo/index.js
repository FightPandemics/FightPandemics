import styled from "styled-components";
import { mq } from "../../constants/theme";

const Logo = styled.img`
  width: 168px;
  height: 40px;
  display: inline-block;

  @media screen and (min-width: ${mq.desktop.extra.minWidth}) {
    width: 400px;
    height: auto;
  }
`;

export default Logo;
