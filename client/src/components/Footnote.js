import React from "react";

import styled from "styled-components";

const footerStyle = {
  position: "absolute",
  width: "376px",
  height: "71px",
  left: "0",
  top: "759px",

  background: "#F3F4FE",
  textAlign: "center",
  lineHeight: "15px",
  fontSize: "11px",
};

const copyrightStyle = {
  position: "absolute",
  width: "312px",
  height: "21px",
  left: "28px",
  top: "18px",

  fontFamily: "Poppins",
  fontWeight: "500",
  color: "#282828",
};

const policies = {
  position: "absolute",
  width: "326px",
  height: "15px",
  left: "21px",
  top: "39px",

  fontFamily: "Poppins",
  textDecorationLine: "underline",
};

const footerLink = {
  color: "#939393",
};

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={footerStyle}>
      <div style={copyrightStyle}>
        Copyright {currentYear} FightPandemics. All rights reserved.
      </div>
      <div style={policies}>
        <a
          style={footerLink}
          href="https://fightpandemics.com/terms-conditions"
        >
          Terms & Conditions
        </a>{" "}
        |{" "}
        <a style={footerLink} href="https://fightpandemics.com/privacy-policy">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a style={footerLink} href="https://fightpandemics.com/cookies-policy">
          Cookies Policy
        </a>
      </div>
    </footer>
  );
};
