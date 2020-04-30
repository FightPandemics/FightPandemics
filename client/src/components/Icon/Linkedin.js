import styled from "styled-components";

import LinkedinIcon from "~/assets/icons/social-linkedin.svg";
import SvgIcon from "./SvgIcon";

const Linkedin = styled(SvgIcon).attrs((props) => ({
  src: LinkedinIcon,
}))``;

export default Linkedin;
