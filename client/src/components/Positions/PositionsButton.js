import React from "react";
import BaseButton from "components/Button/BaseButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const ApplyBtn = styled(BaseButton)`
  border-radius: 4.6rem;
  background-color: ${theme.colors.royalBlue};
  font-size: 1.4rem;
  font-weight: 500;
  color: #ffffff !important;
  display: block;
  width: fit-content;
  margin: 4rem auto;
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
