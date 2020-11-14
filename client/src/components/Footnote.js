import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme, mq } from "constants/theme";

const { colors } = theme;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem 2rem;
  width: 100%;

  position: absolute;
  background: ${colors.selago};
  line-height: 2rem;
  font-family: Poppins;
  font-size: 1.1rem;

  bottom: 0;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    height: 6rem;
  }
`;

const Copyright = styled.div`
  font-weight: 500;
  color: ${colors.darkerGray};
`;

const StyledDiv = styled.div`
  color: ${colors.darkGray};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    margin-top: 1.2rem;
  }
`;

const StyledSpan = styled.span`
  margin: 0 1rem;
  text-decoration-line: underline;
  color: ${colors.darkGray};
`;

export default () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <Copyright>
        <Trans i18nKey="footer.copyright" currentYear={currentYear}>
          Copyright {{ currentYear }} FightPandemics. All rights reserved.
        </Trans>
      </Copyright>
      <StyledDiv>
        <StyledSpan as={Link} to={"/about-us"}>
          {t("common.aboutUs")}
        </StyledSpan>
        |
        <StyledSpan as={Link} to={"/faq"}>
          {t("footer.faq")}
        </StyledSpan>
        |
        <StyledSpan
          as="a"
          href="https://medium.com/@FightPandemics"
          target="_blank"
          alt={t("alt.blogLink")}
        >
          {t("footer.blog")}
        </StyledSpan>
        |
        <StyledSpan as={Link} to={"/terms-conditions"}>
          {t("footer.termsConditions")}
        </StyledSpan>
        |
        <StyledSpan as={Link} to={"/privacy-policy"}>
          {t("footer.privacyPolicy")}
        </StyledSpan>
        |
        <StyledSpan as={Link} to={"/cookies-policy"}>
          {t("footer.cookiesPolicy")}
        </StyledSpan>
      </StyledDiv>
    </StyledFooter>
  );
};
