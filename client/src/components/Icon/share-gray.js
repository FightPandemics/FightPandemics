import styled from "styled-components";

import ShareGrayIcon from "~/assets/icons/share-gray.svg";
import SvgIcon from "./SvgIcon";

const ShareGray = styled(SvgIcon).attrs((props) => ({
  src: ShareGrayIcon,
}))``;

export default ShareGray;
