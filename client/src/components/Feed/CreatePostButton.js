import React from "react";
import SelectWithIconButton from "components/Button/SelectWithIconButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const CreatePostBtn = styled(SelectWithIconButton)`
  border-radius: 4.6rem;
  background-color: ${theme.colors.royalBlue};
  color: #ffffff !important;
  svg {
    margin-right: 1rem;
    width: 1.7rem;
    stroke: #fff;
    transition: 0.3s;
  }
  &:hover {
    background-color: #ffffff;
    color: ${theme.colors.royalBlue}!important;
    border: 0.1rem solid ${theme.colors.royalBlue}!important;
    svg {
      stroke: ${theme.colors.royalBlue};
    }
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none !important;
  }
`;

const GtmContainer = styled.span`
  * {
    pointer-events: none;
  }
  cursor: pointer;
`;

function createPostButton({ onClick, id, ...others }) {
  return (
    <GtmContainer id={id} onClick={onClick}>
      <CreatePostBtn {...others} />
    </GtmContainer>
  );
}

export default createPostButton;
