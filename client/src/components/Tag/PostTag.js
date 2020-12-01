import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { royalBlue, selago } = theme.colors;

export const PostTag = styled.span`
  line-height: 2.5rem;
  margin: 0.5rem 0.3rem;
  padding: 0.5rem 1.5rem;
  font-size: 1.3rem;
  display: inline-block;
  white-space: nowrap;
  color: ${royalBlue};
  background: ${selago};
  border-radius: 4px;
  font-family: "Work Sans";
  font-weight: 400;
  -webkit-text-stroke: 0.2px;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    line-height: 1.9rem;
    margin: 0.5rem 0.3rem;
    padding: 0.7rem 1rem;
  }
`;

export default PostTag;
