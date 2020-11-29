import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { medium } = theme.typography.size;
const { royalBlue, selago } = theme.colors;

export const PostTag = styled.span`
  line-height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0.7rem 1.5rem;
  font-size: ${medium};
  display: inline-block;
  white-space: nowrap;
  color: ${royalBlue};
  background: ${selago};
  border-radius: 4px;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    line-height: 1.9rem;
    margin: 0.5rem 0.3rem;
    padding: 0.7rem 1rem;
    font-size: 1.3rem;
  }
`;

export default PostTag;
