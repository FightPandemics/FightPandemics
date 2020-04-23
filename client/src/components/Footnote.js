import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledFooter = styled.div`
  position: absolute;
  width: 37.6rem;
  height: 7.1rem;
  left: 0;
  bottom: 0;
  top: 75.9rem;

  background: #f3f4fe;
  text-align: center;
  line-height: 1.5rem;
  font-family: Poppins;
  font-size: 1.1rem;
`;

const Copyright = styled.div`
  position: absolute;
  width: 31.2rem;
  height: 2.1rem;
  left: 2.8rem;
  top: 1.8rem;

  font-weight: 500;
  color: #282828;
`;

const Policies = styled.div`
  position: absolute;
  width: 32.6rem;
  height: 1.5rem;
  left: 2.1rem;
  top: 3.9rem;
`;

const FooterLink = styled(Link)`
  color: #939393;
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
