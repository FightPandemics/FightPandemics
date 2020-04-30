import styled from "styled-components";

import CreatPostIcon from "~/assets/icons/create-post.svg";
import SvgIcon from "./SvgIcon";

const CreatPost = styled(SvgIcon).attrs((props) => ({
  src: CreatPostIcon,
}))``;

export default CreatPost;
