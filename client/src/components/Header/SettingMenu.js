import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import GTM from "constants/gtm-tags";
import { getInitialsFromFullName } from "utils/userInfo";
import { Avatar } from "components/Avatar";
import Menu from "./StyledMenu";
import { MENU_STATE, CustomSvgIcon } from "./constants";

import FeedbackIcon from "assets/icons/feedback-gray.svg";
import LogoutIcon from "assets/icons/logout-gray.svg";
import PeopleIcon from "assets/icons/people-gray.svg";
import { ReactComponent as ModeratorIcon } from "assets/icons/moderator-badge.svg";
import { SCOPES } from "constants/permissions";


const profileItemStyle = { margin: "8px 0", height: "auto" };
const StyledModeratorIcon = styled(ModeratorIcon)`
  margin-right: 10px;
`;

export const SettingMenu = ({
  setMenuState,
  user,
  organisationId,
  onFeedbackIconClick,
}) => {
  const { t } = useTranslation();
  const profileUrl = organisationId
    ? `/organisation/${organisationId}`
    : `/profile/${user?.id || user?._id}`;
  return (
    <Menu>
      <Menu.Item style={profileItemStyle}>
        <Link to={profileUrl}>
          <ProfileItem user={user} t={t} />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      {Boolean(user.permissions & SCOPES.DASH_READ_ACCESS) && (
        <Menu.Item>
          <Link to="/dashboard">
            <StyledModeratorIcon />
            Dashboard
          </Link>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => setMenuState(MENU_STATE.ACCOUNTS)}
        id={GTM.nav.prefix + GTM.nav.switch}
      >
        <CustomSvgIcon src={PeopleIcon} />
        {t("common.switchAccount")}
      </Menu.Item>
      <Menu.Item
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={onFeedbackIconClick}
      >
        <CustomSvgIcon src={FeedbackIcon} />
        {t("common.feedback")}
      </Menu.Item>
      <Menu.Item>
        <CustomSvgIcon src={LogoutIcon} />
        <Link to="/auth/logout">{t("common.logout")}</Link>
      </Menu.Item>
    </Menu>
  );
};

const ProfileInfo = styled.p`
  width: 13rem;
  margin: 0;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  font-size: ${({ bold }) => (bold ? "14px" : "12px")};
  line-height: normal;
  color: ${({ bold }) => (bold ? "#939393" : "#000000")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfileItemContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;

const ProfileItem = ({ user, t }) => {
  return (
    <ProfileItemContainer>
      <div>
        <Avatar src={user.photo} size={"small"}>
          {getInitialsFromFullName(
            `${user.name || `${user.firstName} ${user.lastName}`}`,
          )}
        </Avatar>
      </div>
      <div>
        <ProfileInfo bold>
          {`${user.name || `${user.firstName} ${user.lastName}`}`}
        </ProfileInfo>
        <ProfileInfo>{t("profile.common.viewMyProfile")}</ProfileInfo>
      </div>
    </ProfileItemContainer>
  );
};
