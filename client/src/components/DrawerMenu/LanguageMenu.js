import React from "react";
import { useTranslation } from "react-i18next";

import { MENU_STATE } from "./constants";
import { Divider, NavItem, CustomSvgIcon } from "./components";
import { languages } from "locales/languages";
import i18n from "i18n";

import BackIcon from "assets/icons/back-white.svg";
import DoneIcon from "assets/icons/done-white.svg";

export const LanguageMenu = ({ isAuthenticated, setMenuState }) => {
  const { t } = useTranslation();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <NavItem onClick={() => setMenuState(MENU_STATE.SETTINGS)}>
        <CustomSvgIcon src={BackIcon} />
        {t("common.language")}
      </NavItem>
      <Divider />
      {Object.entries(languages).map(([key, label]) => (
        <NavItem key={key} onClick={() => onLanguageChange(key)}>
          {i18n.language === key && <CustomSvgIcon src={DoneIcon} />}
          {label.text}
        </NavItem>
      ))}
    </>
  );
};

const onLanguageChange = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem("locale", language);
};
