import styled from "styled-components";

import ShareIcon from "~/assets/icons/share.svg";
import SvgIcon from "./SvgIcon";

const Share = styled(SvgIcon).attrs((props) => ({
  src: ShareIcon,
}))``;

export default Share;
