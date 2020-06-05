import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "constants/theme";

// ICONS
import SvgIcon from "./Icon/SvgIcon";
import closeX from "assets/icons/close-btn.svg";

const { colors } = theme;

const CookieContainer = styled.div`
  alignitems: center;
  background: ${colors.darkerGray};
  color: ${colors.selago};
  display: flex;
  font-family: Poppins;
  font-size: 1rem;
  line-height: 2rem;
  justify-content: center;
  padding: 1.5rem 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: left;
`;

const CookieLink = styled.a`
  color: ${colors.selago};
  text-decoration: underline;
`;

const ClosePointer = styled.span`
  cursor: pointer;
`;

export default () => {
  const [active, setActive] = useState(false);

  const hideMessage = (event) => {
    setActive(false);
    localStorage.setItem("cookieMessage", "true");
  };

  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem("cookieMessage")) {
        setActive(true);
      }
    }, 1000);
  });

  return (
    <CookieContainer style={{ display: active ? "" : "none" }}>
      <div>
        This site uses cookies to deliver our service and to show you relevant
        information. By using our site, you acknowledge that you have read and
        understand our{" "}
        <CookieLink href="/cookies-policy">Cookies Policy</CookieLink>,{" "}
        <CookieLink href="/privacy-policy">Privacy Policy</CookieLink>, and our{" "}
        <CookieLink href="/terms-conditions">Terms & Conditions</CookieLink>.
        Your use of FightPandemics' Products is subject to these policies and
        terms.
      </div>
      <ClosePointer>
        <SvgIcon src={closeX} onClick={hideMessage} />
      </ClosePointer>
    </CookieContainer>
  );
};
