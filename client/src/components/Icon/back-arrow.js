import styled from "styled-components";

import BackArrowIcon from "~/assets/icons/back-arrow.svg";
import SvgIcon from "./SvgIcon";

const BackArrow = styled(SvgIcon).attrs((props) => ({
  src: BackArrowIcon,
}))``;

export default BackArrow;
