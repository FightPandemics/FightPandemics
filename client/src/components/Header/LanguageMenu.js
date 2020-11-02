import React from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";

import { MENU_STATE, CustomSvgIcon } from "./constants";
import { languages } from "locales/languages";
import i18n from "i18n";

import BackIcon from "assets/icons/back.svg";
import DoneIcon from "assets/icons/done.svg";

export const LanguageMenu = ({ setMenuState }) => {
  const { t } = useTranslation();
  return (
    <Menu>
      <Menu.Item onClick={() => setMenuState(MENU_STATE.SETTINGS)}>
        <CustomSvgIcon src={BackIcon} />
        {t("common.language")}
      </Menu.Item>
      <Menu.Divider />
      {Object.entries(languages).map(([key, label]) => (
        <Menu.Item key={key} onClick={() => onLanguageChange(key)}>
          {i18n.language === key && <CustomSvgIcon src={DoneIcon} />}
          {label.text}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const onLanguageChange = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem("locale", language);
};
