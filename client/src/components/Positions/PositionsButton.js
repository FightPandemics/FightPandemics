import React from "react";
import BaseButton from "components/Button/BaseButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const ApplyButtonContainer = styled.div`
  max-width: 33.4rem;
  margin: auto;
`;

const ApplyBtn = styled(BaseButton)`
  border-radius: 4.6rem;
  background-color: ${theme.colors.royalBlue};
  font-size: 1.6rem;
  font-weight: 500;
  color: #ffffff !important;
  display: block;
  max-width: 33.4rem;
  margin: auto;
  padding: 1rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    width: fit-content;
    
  }
 `;

const GtmContainer = styled.span`
  * {
    pointer-events: none;
    padding: 0 2.6rem;
    margin-top: 6.8rem;
    font-family: 'Poppins', 'sans-serif';
  }
  cursor: pointer;
`;

function ApplyButton({ onClick, id, ...others }) {
  return (
    <GtmContainer id={id} onClick={onClick}>
      <ApplyBtn {...others} />
    </GtmContainer>
  );
}

export default ApplyButton;
