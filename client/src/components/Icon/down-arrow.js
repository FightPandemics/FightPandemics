import styled from "styled-components";

import DownArrowIcon from "../../assets/icons/down-arrow.svg";
import SvgIcon from "./SvgIcon";

const DownArrow = styled(SvgIcon).attrs((props) => ({
  src: DownArrowIcon,
}))``;

export default DownArrow;
