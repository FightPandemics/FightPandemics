import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Button } from "antd";
import { NavLink } from "react-router-dom";

import i18n from "../../i18n";
import SvgIcon from "../Icon/SvgIcon";
import feedback from "assets/icons/feedback.svg";
import globe from "assets/icons/globe.svg";
import { languages } from "locales/languages";
import GTM from "constants/gtm-tags";
import { ProfileMenu } from "./ProfileMenu";
import { theme } from "../../constants/theme";

const { colors } = theme;
const activeStyles = {
  fontWeight: "600",
  color: `${colors.royalBlue}`,
};

export const HeaderLinks = ({
  isAuthenticated,
  onFeedbackIconClick,
  organisationId,
  user,
  setOrganisation: setOrganisationId,
}) => {
  const { t } = useTranslation();
  const languageMenu = <LanguageMenu />;
  return (
    <>
      <ul>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.feed}
            activeStyle={activeStyles}
            to="/feed"
          >
            {t("feed.title")}
          </NavLink>
        </li>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.aboutUs}
            activeStyle={activeStyles}
            to="/about-us"
          >
            {t("common.aboutUs")}
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <ProfileMenu
              user={user}
              organisationId={organisationId}
              setOrganisation={setOrganisationId}
              onFeedbackIconClick={onFeedbackIconClick}
            />
          </li>
        )}
        {!isAuthenticated && (
          <>
            <NavLink id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
              <Button type="primary" ghost shape="round" className="logInBtn">
                {t("auth.signIn")}
              </Button>
            </NavLink>
            <NavLink id={GTM.nav.prefix + GTM.nav.login} to="/auth/signup">
              <Button shape="round" type="primary" className="joinNowBtn">
                {t("auth.joinNow")}
              </Button>
            </NavLink>
            <Button
              id={GTM.nav.prefix + GTM.nav.feedback}
              onClick={onFeedbackIconClick}
            >
              <SvgIcon src={feedback} />
            </Button>
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <SvgIcon
                id={GTM.nav.prefix + GTM.nav.language}
                src={globe}
                className="globe-icon-svg"
              ></SvgIcon>
            </Dropdown>
          </>
        )}
      </ul>
    </>
  );
};

const LanguageMenu = () => {
  const onLanguageChange = (language) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem("locale", language);
  };
  return (
    <Menu>
      {Object.entries(languages).map(([key, label]) => (
        <Menu.Item key={key}>
          <div
            style={{ fontWeight: i18n.language === key ? "bold" : "normal" }}
            onClick={() => onLanguageChange(key)}
            id={GTM.nav.prefix + GTM.nav.language + GTM.language[key]}
          >
            {label.text}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
};
