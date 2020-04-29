import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../constants/theme";

const { colors } = theme;

const CookieContainer = styled.div`
  alignitems: center;
  background: ${colors.selago};
  display: flex;
  flex-direction: column;
  font-family: Poppins;
  font-size: 1.1rem;
  height: 8rem;
  justify-content: center;
  padding: 1.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default () => {
  const [active, setActive] = useState();

  const hideMessage = (event) => {
    active ? setActive(false) : setActive(true);
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
        We use cookies. By continuing to browse this site you are agreeing to
        our use of cookies. <a href="/cookies-policy">Read more.</a>
      </div>
      <button onClick={hideMessage}>Okay</button>
    </CookieContainer>
  );
};
