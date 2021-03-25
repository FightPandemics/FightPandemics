import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Button } from "antd";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TagManager from "react-gtm-module";

import i18n from "../../i18n";
import SvgIcon from "../Icon/SvgIcon";
import feedback from "assets/icons/feedback.svg";
import globe from "assets/icons/globe.svg";
import moderator from "assets/icons/moderator-badge.svg";
import { languages } from "locales/languages";
import GTM from "constants/gtm-tags";
import { ProfileMenu } from "./ProfileMenu";
import { theme } from "../../constants/theme";
import { NotificationDropDown } from "components/Notifications/NotificationDropDown";
import { SCOPES } from "constants/permissions";

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

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem("locale", language);
    TagManager.dataLayer({
      dataLayer: {
        language,
      },
    });
  };

  const StyledMenu = styled(Menu)`
    max-height: 45rem;
    border-radius: 10px;
    overflow: auto;
    a {
      padding: 0.5em 1em;
      letter-spacing: 1px;
    }
    ::-webkit-scrollbar {
      width: 0.8rem;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
    }
    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.darkGray};
      cursor: pointer;
    }
  `;

  const languageMenu = (
    <StyledMenu>
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
    </StyledMenu>
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
            id={GTM.nav.prefix + GTM.nav.nearestHsp}
            activeStyle={activeStyles}
            to="/nearest-hospital"
          >
            {t("common.nearestHsp")}
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
            {!organisationId && Boolean(user.permissions) && (
              <li>
                <NavLink activeStyle={activeStyles} to="/dashboard">
                  <SvgIcon src={moderator}></SvgIcon>
                </NavLink>
              </li>
            )}

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
            getPopupContainer={() =>
              document.getElementsByClassName("am-navbar-right")[0]
            }
          >
            <button>
              <SvgIcon id={GTM.nav.prefix + GTM.nav.language} src={globe} />
            </button>
          </Dropdown>
        </li>
      </ul>
    </>
  );
};
