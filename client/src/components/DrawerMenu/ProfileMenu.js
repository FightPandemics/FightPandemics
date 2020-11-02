import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { MENU_STATE } from "./constants";
import { Avatar } from "components/Avatar";
import GTM from "constants/gtm-tags";
import { getInitialsFromFullName } from "utils/userInfo";
import { TOGGLE_STATE } from "hooks/actions/feedbackActions";
import { Divider, NavItem, CustomSvgIcon } from "./components";

import LogoutIcon from "assets/icons/logout-gray.svg";
import FeedbackIcon from "assets/icons/feedback-gray.svg";
import LanguageIcon from "assets/icons/language-gray.svg";
import PeopleIcon from "assets/icons/people-gray.svg";

export const ProfileMenu = ({
  user,
  toggleDrawer,
  dispatchAction,
  isAuthenticated,
  setMenuState,
}) => {
  const { t } = useTranslation();
  const feedToPath = isAuthenticated ? { pathname: "/feed", user } : "/feed";
  return (
    <>
      {isAuthenticated && (
        <NavItem>
          <ProfileItem user={user} />
        </NavItem>
      )}
      {!isAuthenticated && (
        <Link id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
          <NavItem size={"big"}>
            {t("auth.signIn")} / {t("auth.joinNow")}
          </NavItem>
        </Link>
      )}
      <Divider />
      <Link id={GTM.nav.prefix + GTM.nav.feed} to={feedToPath}>
        <NavItem size={"big"}>{t("feed.title")}</NavItem>
      </Link>
      <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
        <NavItem size={"big"}>{t("common.aboutUs")}</NavItem>
      </Link>
      <Divider />
      {isAuthenticated && (
        <NavItem onClick={() => setMenuState(MENU_STATE.ACCOUNTS)}>
          <CustomSvgIcon src={PeopleIcon} />
          {t("common.switchAccount")}
        </NavItem>
      )}
      <NavItem onClick={() => setMenuState(MENU_STATE.LANGUAGES)}>
        <CustomSvgIcon src={LanguageIcon} />
        {t("common.language")}
      </NavItem>
      <NavItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
      >
        <CustomSvgIcon src={FeedbackIcon} />
        {t("common.feedback")}
      </NavItem>
      {isAuthenticated && (
        <Link to="/auth/logout">
          <NavItem>
            <CustomSvgIcon src={LogoutIcon} />
            {t("common.logout")}
          </NavItem>
        </Link>
      )}
    </>
  );
};

export const ProfileItem = ({ user }) => {
  return (
    <ProfileItemContainer>
      <div>
        <Avatar src={user.photo} size={"small"}>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
        </Avatar>
      </div>
      <div>
        <ProfileInfo bold>
          {`${user?.firstName} ${user?.lastName} `}
        </ProfileInfo>
        <ProfileInfo>View my Profile</ProfileInfo>
      </div>
    </ProfileItemContainer>
  );
};

const ProfileInfo = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  line-height: normal;
  color: ${({ bold }) => (bold ? "#939393" : "rgba(0, 0, 0, 0.85)")};
`;

const ProfileItemContainer = styled.div`
  display: flex;
  margin: 5px 0;
  align-items: center;
`;
