import styled from "styled-components";

import HeartSmallIcon from "~/assets/icons/heart-small.svg";
import SvgIcon from "./SvgIcon";

const HeartSmall = styled(SvgIcon).attrs((props) => ({
  src: HeartSmallIcon,
}))``;

export default HeartSmall;
