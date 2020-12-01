import { mq } from "constants/theme";
import styled from "styled-components";
import PostCard from "./PostCard";

export const StyledPostPage = styled.div`
  width: 50%;
  @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
    width: 100%;
    position: relative;
  }
`;

export const StyledPostPagePostCard = styled(PostCard)`
  max-width: 100%;
  .blur-overlay {
    width: 50%;
    right: 0;
    margin: auto;
    height: calc(100% - 25rem);
    margin-top: 7rem;
    @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
      width: 100%;
      height: calc(100% - 15rem);
      margin-top: 2rem;
    }
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      height: 100%;
    }
  }
  margin-top: 1rem;
  overflow-wrap: break-word;
  @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
    margin-top: 2rem;
  }
`;
