import styled from "styled-components";

import HorizontalLineIcon from "~/assets/icons/horizontal-line.svg";
import SvgIcon from "./SvgIcon";

const HorizontalLine = styled(SvgIcon).attrs((props) => ({
  src: HorizontalLineIcon,
}))``;

export default HorizontalLine;
