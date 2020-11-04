import React from "react";
import { WhiteSpace } from "antd-mobile";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { MENU_STATE } from "./constants";
import { Divider, NavItem, CustomSvgIcon } from "./components";
import { languages } from "locales/languages";
import i18n from "i18n";

import BackIcon from "assets/icons/back-white.svg";
import DoneIcon from "assets/icons/done-white.svg";

export const LanguageMenu = ({ setMenuState }) => {
  const { t } = useTranslation();
  return (
    <>
      <WhiteSpace size="md" />
      <NavItem onClick={() => setMenuState(MENU_STATE.SETTINGS)}>
        <CustomSvgIcon src={BackIcon} />
        {t("common.language")}
      </NavItem>
      <Divider />
      {Object.entries(languages).map(([key, label]) => (
        <NavItem key={key} onClick={() => onLanguageChange(key)}>
          <LanguageItem current={{ key, label }} />
        </NavItem>
      ))}
    </>
  );
};

const onLanguageChange = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem("locale", language);
};

export const LanguageItem = ({ current: { key, label } }) => {
  const style =
    i18n.language === key ? {} : { minWidth: "2.2rem", marginRight: "10px" };
  return (
    <LanguageItemContainer>
      <div style={style}>
        {i18n.language === key && <CustomSvgIcon src={DoneIcon} />}
      </div>
      <div>
        <LanguageInfo bold>{label.value}</LanguageInfo>
        <LanguageInfo>{label.text}</LanguageInfo>
      </div>
    </LanguageItemContainer>
  );
};

const LanguageInfo = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  line-height: normal;
  color: ${({ bold }) => (bold ? "#FFFFFF" : "B3BDFA")};
`;

const LanguageItemContainer = styled.div`
  display: flex;
  margin: 5px 0;
  align-items: center;
`;
