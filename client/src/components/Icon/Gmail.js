import styled from "styled-components";

import SvgIcon from "./SvgIcon";
import GmailIcon from "~/assets/icons/social-google.svg";

const Google = styled(SvgIcon).attrs((props) => ({
  src: GmailIcon,
}))``;

export default Google;
