import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { theme, mq } from "constants/theme";

import styled from "styled-components";

import i18n from "../i18n";

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

const Policies = styled.div`
  color: ${colors.darkGray};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    margin-top: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  color: ${colors.darkGray};
  margin: 0 1rem;
  text-decoration-line: underline;
`;

const FooterALink = styled.a`
  color: ${colors.darkGray};
  margin: 0 1rem;
  text-decoration-line: underline;
`;

export default () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const langs = {
    "ar": {value: "العربية", text: "Arabic (العربية)"},
    "id": {value: "Bahasa Indonesia", text: "Bahasa Indonesia (Bahasa Indonesia)"},
    "zh-TW": {value: "繁體中文", text: "Chinese Traditional (繁體中文)"},
    "nl": {value: "Nederlands", text: "Dutch (Nederlands)"},
    "en": {value: "English", text: "English (English)"},
    "fr": {value: "Français", text: "French (Français)"},
    "de": {value: "Deutsch", text: "German (Deutsch)"},
    "he": {value: "עברית", text: "Hebrew (עברית)"},
    "it": {value: "Italiano", text: "Italian (Italiano)"},
    "pt": {value: "Português", text: "Portuguese (Português)"},
    "ru": {value: "русский", text: "Russian (русский)"},
    "es": {value: "Español", text: "Spain (Español)"},
    "tr": {value: "Türkçe", text: "Turkish (Türkçe)"},
    "uk": {value: "Українська", text: "Ukrainian (Українська)"}
  }

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
          Copyright {{currentYear}} FightPandemics. All rights reserved.
        </Trans>
      </Copyright>
      <Policies>
        <FooterLink to={"/about-us"}>{t("common.aboutUs")}</FooterLink> |{" "}
        <FooterLink to={"/faq"}>{t("footer.faq")}</FooterLink> |{" "}
        <FooterALink
          href="https://medium.com/@FightPandemics"
          target="_blank"
          alt={t("alt.blogLink")}
        >
          {t("footer.blog")}
        </FooterALink>
  |     <FooterLink to={"/terms-conditions"}>{t("footer.termsConditions")}</FooterLink> |{" "}
        <FooterLink to={"/privacy-policy"}>{t("footer.privacyPolicy")}</FooterLink> |{" "}
        <FooterLink to={"/cookies-policy"}>{t("footer.cookiesPolicy")}</FooterLink> |{" "}
        <Dropdown overlay={menu} placement="topLeft">
          <FooterLink>{langs[i18n.language].value}</FooterLink>
        </Dropdown>
      </Policies>
    </StyledFooter>
  );
};
