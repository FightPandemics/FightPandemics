import styled from "styled-components";
import { theme } from "constants/theme";

const { small } = theme.typography.size;
const { royalBlue, selago } = theme.colors;

export const PostTag = styled.span`
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0 1.3rem;
  font-size: ${small};
  display: inline-block;
  user-select: none;
  white-space: nowrap;
  color: ${royalBlue};
  background: ${selago};
  border-radius: 4px;
`;

export default PostTag;
