import styled from "styled-components";

import HeartIcon from "~/assets/icons/heart.svg";
import SvgIcon from "./SvgIcon";

const Heart = styled(SvgIcon).attrs((props) => ({
  src: HeartIcon,
}))``;

export default Heart;
