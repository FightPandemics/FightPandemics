import styled from "styled-components";

import CommentIcon from "~/assets/icons/comment.svg";
import SvgIcon from "./SvgIcon";

const Comment = styled(SvgIcon).attrs((props) => ({
  src: CommentIcon,
}))``;

export default Comment;
