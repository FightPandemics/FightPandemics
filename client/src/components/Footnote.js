import React from "react";
import { Link } from "react-router-dom";
import { theme, mq } from "constants/theme";

import styled from "styled-components";

const { colors } = theme;

const StyledFooter = styled.footer`
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

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    background: ${colors.white};
    font-size: 1.4rem;
    height: 9rem;
  }
`;

const Copyright = styled.div`
  font-weight: 500;
  color: ${colors.darkerGray};
`;

const Policies = styled.div`
  color: ${colors.darkGray};

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    margin-top: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  color: ${colors.darkGray};
  margin: 0 1rem;
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
        <FooterLink to={"/terms-conditions"}>Terms & Conditions</FooterLink> |{" "}
        <FooterLink to={"/privacy-policy"}>Privacy Policy</FooterLink> |{" "}
        <FooterLink to={"/cookies-policy"}>Cookies Policy</FooterLink>
      </Policies>
    </StyledFooter>
  );
};
