import React from "react";
import BaseButton from "components/Button/BaseButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const JoinOrgContainer = styled.div`
  max-width: 33.4rem;
  margin: auto;
  margin-top: 5.3rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-top: 2rem;
  }
`;
const JoinOrgBtn = styled(BaseButton)`
  border-radius: 4.6rem;
  background-color: ${theme.colors.royalBlue};
  color: #ffffff !important;
  font-weight: 400;
  font-size: 1.4rem;
  display: block;
  max-width: 33.4rem;
  width: 33.4rem;
  height: 5.4rem;
  margin: auto;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 15.5rem;
    height: 4.8rem;
  }
`;

const GtmContainer = styled.span`
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", "sans-serif";
    pointer-events: none;
    padding: 0 1rem;
    line-height: normal;
  }

  cursor: pointer;
`;

function JoinOrgButton({ onClick, id, ...others }) {
  return (
    <GtmContainer id={id} onClick={onClick}>
      <JoinOrgBtn {...others} />
    </GtmContainer>
  );
}

export default JoinOrgButton;
