import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../constants/theme";

import styled from "styled-components";

const { colors } = theme;

const StyledFooter = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 7.1rem;

  background: ${colors.selago};
  line-height: 2rem;
  font-family: Poppins;
  font-size: 1.1rem;
`;

const Copyright = styled.div`
  font-weight: 500;
  color: ${colors.darkGray};
`;

const Policies = styled.div`
  color: ${colors.mediumGray};
`;

const FooterLink = styled(Link)`
  color: ${colors.mediumGray};
  margin: 0 0.5rem;
  text-decoration-line: underline;
`;

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <StyledFooter>
      <Copyright>
        Copyright {currentYear} FightPandemics. All rights reserved.
      </Copyright>
      <Policies>
        <FooterLink href="/terms-conditions">Terms & Conditions</FooterLink> |{" "}
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink> |{" "}
        <FooterLink href="/cookies-policy">Cookies Policy</FooterLink>
      </Policies>
    </StyledFooter>
  );
};
