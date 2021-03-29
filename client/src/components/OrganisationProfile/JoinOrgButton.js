import React from "react";
import BaseButton from "components/Button/BaseButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const JoinOrgContainer = styled.div`
  max-width: 33.4rem;
  margin: auto;
`;
const JoinOrgBtn = styled(BaseButton)`
  border-radius: 4.6rem;
  background-color: ${theme.colors.royalBlue};
  color: #ffffff !important;
  font-weight: 400;
  font-size: 1.4rem;
  display: block;
  max-width: 33.4rem;
  margin: auto;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width:fit-content;
    
  }
 `;

const GtmContainer = styled.span`
  * {
    font-family: 'Poppins', 'sans-serif';
    pointer-events: none;
    padding: 0 1rem;
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
