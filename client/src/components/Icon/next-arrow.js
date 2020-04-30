import styled from "styled-components";

import NextArrowIcon from "~/assets/icons/next-arrow.svg";
import SvgIcon from "./SvgIcon";

const NextArrow = styled(SvgIcon).attrs((props) => ({
  src: NextArrowIcon,
}))``;

export default NextArrow;
