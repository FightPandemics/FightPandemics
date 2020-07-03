import { mq,theme } from "constants/theme";
import styled from "styled-components";
import PostCard from "./PostCard";

const { darkGray, lightGray, royalBlue, white } = theme.colors;

export const StyledPostPage = styled.div`
    width: 50%;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        width: 100%;
        position: relative;
        overflow-wrap: break-word;

    }      
`;

export const StyledPostPagePostCard = styled(PostCard)`
    maxWidth: 80rem;
    marginTop: 1rem;
    overflowWrap: break-word;
`;