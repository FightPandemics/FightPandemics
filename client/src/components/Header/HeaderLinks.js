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
import { NotificationDropDown } from "components/Notifications/NotificationDropDown";

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
  renderInboxIcon,
  notifications,
}) => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.localStorage.setItem("locale", lng);
  };

  const languageMenu = (
    <Menu>
      {Object.entries(languages).map(([key, label]) => (
        <Menu.Item key={key}>
          <div
            style={
              i18n.language === key
                ? { fontWeight: "bold" }
                : { fontWeight: "normal" }
            }
            onClick={() => changeLanguage(key)}
            id={GTM.nav.prefix + GTM.nav.language + GTM.language[key]}
          >
            {label.text}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <ul>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.aboutUs}
            activeStyle={activeStyles}
            to="/about-us"
          >
            {t("common.aboutUs")}
          </NavLink>
        </li>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.feed}
            activeStyle={activeStyles}
            to="/feed"
          >
            {t("feed.title")}
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>{renderInboxIcon(false, activeStyles)}</li>
            <li>
              <NotificationDropDown
                notifications={notifications}
                mobile={false}
                organisationId={organisationId}
              />
            </li>
            <li>
              <ProfileMenu
                user={user}
                organisationId={organisationId}
                setOrganisation={setOrganisationId}
                onFeedbackIconClick={onFeedbackIconClick}
              />
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li>
              <NavLink
                id={GTM.nav.prefix + GTM.nav.login}
                activeStyle={activeStyles}
                to="/auth/login"
              >
                {t("auth.signIn")}
              </NavLink>
            </li>
            <li className="registerBtn">
              <NavLink
                id={GTM.nav.prefix + GTM.nav.register}
                className="registerLink"
                to="/auth/signup"
              >
                {t("auth.joinNow")}
              </NavLink>
            </li>
            <li>
              <Button
                className="icon-btn"
                id={GTM.nav.prefix + GTM.nav.feedback}
                onClick={onFeedbackIconClick}
              >
                <SvgIcon src={feedback} />
              </Button>
            </li>
          </>
        )}
        <li>
          <Dropdown
            className="icon-btn"
            overlay={languageMenu}
            trigger={["click"]}
          >
            <button>
              <SvgIcon
                className="globe-icon"
                id={GTM.nav.prefix + GTM.nav.language}
                src={globe}
              />
            </button>
          </Dropdown>
        </li>
      </ul>
    </>
  );
};
