import styled from "styled-components";

import HeartSmallGrayIcon from "~/assets/icons/heart-small-gray.svg";
import SvgIcon from "./SvgIcon";

const HeartSmallGray = styled(SvgIcon).attrs((props) => ({
  src: HeartSmallGrayIcon,
}))``;

export default HeartSmallGray;
