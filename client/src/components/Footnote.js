import React, { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import styled from "styled-components";

import i18n from "../i18n";

import { theme, mq } from "constants/theme";
import { localization, languages } from "constants/languages";
import SvgIcon from "./Icon/SvgIcon";
import globe from "assets/icons/globe.svg";

const { colors } = theme;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem 2rem;
  width: 100%;
  height: 6rem;

  background: ${colors.selago};
  line-height: 2rem;
  font-family: Poppins;
  font-size: 1.1rem;

  position: absolute;
  bottom: 0;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
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
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1279);
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.localStorage.setItem("locale", lng);
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1279);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const menu = (
    <Menu>
      {Object.entries(languages).map(([key, label]) => (
        <Menu.Item>
          <a onClick={() => changeLanguage(key)}>
            {isDesktop ? label.text : label.value}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

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
        |
        <StyledSpan>
          <SvgIcon src={globe} className="globe-icon-svg"></SvgIcon>
          <Dropdown overlay={menu} placement="topLeft">
            <Link>{languages[localization[i18n.language]].value}</Link>
          </Dropdown>
        </StyledSpan>
      </StyledDiv>
    </StyledFooter>
  );
};
