import styled from "styled-components";

import HeartGrayIcon from "~/assets/icons/heart-gray.svg";
import SvgIcon from "./SvgIcon";

const HeartGray = styled(SvgIcon).attrs((props) => ({
  src: HeartGrayIcon,
}))``;

export default HeartGray;
