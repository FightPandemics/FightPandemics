import React from "react";
import styled from "styled-components";
import backArrow from "assets/icons/back-arrow.svg";
import { StyledWizardNav, BackButton, BackText } from 'components/StepWizard/WizardNav';
import { Link } from "react-router-dom";
import SvgIcon from "components/Icon/SvgIcon";
import StepWizard from "react-step-wizard";
import { mq } from "constants/theme";
const desktopBreakpoint = mq.tablet.narrow.maxWidth;

export const StyledButtonWizard = styled(StepWizard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 12rem;
  margin: 0 auto 1rem;
  width: 35rem;
  max-width: 100%;

  & + div {
    display: flex;
    flex-flow: row wrap;
    max-height: calc(100% - 8rem); /* align-items: stretch; */

    & > div {
      min-height: 100%;
    }
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 40rem;
  }
`;

const WizardFormNav = () => (
  <StyledWizardNav>
    <Link to={"/feed"}>
      <BackButton>
        <SvgIcon src={backArrow} title="Navigate to feed page" />
        <BackText>Back</BackText>
      </BackButton>
    </Link>    
  </StyledWizardNav>
);

export default WizardFormNav;
