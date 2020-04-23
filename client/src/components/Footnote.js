import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledFooter = styled.div`
  position: "absolute",
  width: "376px",
  height: "71px",
  left: "0",
  bottom: "0",
  top: "759px",

  background: "#F3F4FE",
  textAlign: "center",
  lineHeight: "15px",
  fontFamily: "Poppins",
  fontSize: "11px"
`;

const Copyright = styled.div`
  position: "absolute",
  width: "312px",
  height: "21px",
  left: "28px",
  top: "18px",

  fontWeight: "500",
  color: "#282828",
`;

const Policies = styled.div`
  position: "absolute",
  width: "326px",
  height: "15px",
  left: "21px",
  top: "39px",

  textDecorationLine: "underline",
`;

const FooterLink = styled(Link)`
  color: "#939393";
`;

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <StyledFooter>
      <Copyright>
        Copyright {currentYear} FightPandemics. All rights reserved.
      </Copyright>
      <Policies>
        <FooterLink href="https://fightpandemics.com/terms-conditions">
          Terms & Conditions
        </FooterLink>{" "}
        |{" "}
        <FooterLink href="https://fightpandemics.com/privacy-policy">
          Privacy Policy
        </FooterLink>{" "}
        |{" "}
        <FooterLink href="https://fightpandemics.com/cookies-policy">
          Cookies Policy
        </FooterLink>
      </Policies>
    </StyledFooter>
  );
};
