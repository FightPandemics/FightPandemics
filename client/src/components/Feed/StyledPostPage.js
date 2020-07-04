import { mq } from "constants/theme";
import styled from "styled-components";
import PostCard from "./PostCard";

export const StyledPostPage = styled.div`
  width: 50%;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 100%;
    position: relative;
    overflow-wrap: break-word;
  }      
`;

export const StyledPostPagePostCard = styled(PostCard)`
  max-width: 80rem;
  margin-top: 1rem;
  overflow-wrap: break-word;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-top: 2rem;
  }
`;
