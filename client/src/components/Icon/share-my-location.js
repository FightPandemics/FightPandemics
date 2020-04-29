import styled from "styled-components";

import ShareLocationIcon from "~/assets/icons/share-my-location.svg";
import SvgIcon from "./SvgIcon";

const ShareLocation = styled(SvgIcon).attrs((props) => ({
  src: ShareLocationIcon,
}))``;

export default ShareLocation;
