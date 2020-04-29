import styled from "styled-components";

import StatusIcon from "~/assets/icons/status-indicator.svg";
import SvgIcon from "./SvgIcon";

const Status = styled(SvgIcon).attrs((props) => ({
  src: StatusIcon,
}))``;

export default Status;
