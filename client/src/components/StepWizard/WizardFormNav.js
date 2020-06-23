import React from "react";
import backArrow from "assets/icons/back-arrow.svg";
import { StyledWizardNav, BackButton, BackText } from 'components/StepWizard/WizardNav';
import { Link } from "react-router-dom";
import SvgIcon from "components/Icon/SvgIcon";

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
