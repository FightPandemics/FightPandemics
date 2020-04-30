import styled from "styled-components";

import CommentGrayIcon from "~/assets/icons/comment-gray.svg";
import SvgIcon from "./SvgIcon";

const CommentGray = styled(SvgIcon).attrs((props) => ({
  src: CommentGrayIcon,
}))``;

export default CommentGray;
