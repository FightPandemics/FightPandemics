import React from "react";
import BaseButton from "components/Button/BaseButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const JoinOrgBtn = styled(BaseButton)`
  border-radius: 4.6rem;
  background-color: ${theme.colors.royalBlue};
  color: #ffffff !important;
  font-weight: 400;
  font-size: 1.4rem;
  display: block;
  width: fit-content;
  margin: auto;
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
