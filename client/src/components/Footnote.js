import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { theme, mq } from "constants/theme";

import styled from "styled-components";

import i18n from "../i18n";
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
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const localization = {
    en: "en-US",
    "en-US": "en-US",
    "en-GB": "en-GB",
    ar: "ar",
    id: "id",
    "zh-TW": "zh-TW",
    nl: "nl",
    fr: "fr",
    de: "de",
    he: "he",
    it: "it",
    pt: "pt",
    ru: "ru",
    es: "es",
    tr: "tr",
    uk: "uk",
  };

  const langs = {
    ar: { value: "العربية", text: "Arabic (العربية)" },
    id: { value: "Bahasa Indonesia", text: "Indonesian (Bahasa Indonesia)" },
    "zh-TW": { value: "繁體中文", text: "Chinese Traditional (繁體中文)" },
    nl: { value: "Nederlands", text: "Dutch (Nederlands)" },
    "en-US": { value: "English", text: "English (American English)" },
    "en-GB": { value: "English", text: "English (British English)" },
    fr: { value: "Français", text: "French (Français)" },
    de: { value: "Deutsch", text: "German (Deutsch)" },
    he: { value: "עברית", text: "Hebrew (עברית)" },
    it: { value: "Italiano", text: "Italian (Italiano)" },
    pt: { value: "Português", text: "Portuguese (Português)" },
    ru: { value: "русский", text: "Russian (русский)" },
    es: { value: "Español", text: "Spain (Español)" },
    tr: { value: "Türkçe", text: "Turkish (Türkçe)" },
    uk: { value: "Українська", text: "Ukrainian (Українська)" },
  };

  const menu = (
    <Menu>
      {Object.entries(langs).map(([key, label]) => (
        <Menu.Item>
          <a onClick={() => changeLanguage(key)}>{label.text}</a>
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
        <StyledSpan>
          <Link to={"/about-us"}>{t("common.aboutUs")}</Link>
        </StyledSpan>
        |
        <StyledSpan>
          <Link to={"/faq"}>{t("footer.faq")}</Link>
        </StyledSpan>
        |
        <StyledSpan>
          <a
            href="https://medium.com/@FightPandemics"
            target="_blank"
            alt={t("alt.blogLink")}
          >
            {t("footer.blog")}
          </a>
        </StyledSpan>
        |
        <StyledSpan>
          <Link to={"/terms-conditions"}>{t("footer.termsConditions")}</Link>
        </StyledSpan>
        |
        <StyledSpan>
          <Link to={"/privacy-policy"}>{t("footer.privacyPolicy")}</Link>
        </StyledSpan>
        |
        <StyledSpan>
          <Link to={"/cookies-policy"}>{t("footer.cookiesPolicy")}</Link>
        </StyledSpan>
        |
        <StyledSpan>
          <SvgIcon src={globe} className="globe-icon-svg"></SvgIcon>
          <Dropdown overlay={menu} placement="topLeft">
            <Link>{langs[i18n.language].value}</Link>
          </Dropdown>
        </StyledSpan>
      </StyledDiv>
    </StyledFooter>
  );
};
