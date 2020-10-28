import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu, Avatar } from "antd";
import styled from "styled-components";

import GTM from "constants/gtm-tags";
import { getInitialsFromFullName } from "utils/userInfo";
import SvgIcon from "components/Icon/SvgIcon";

import FeedbackIcon from "assets/icons/feedback-gray.svg";
import LogoutIcon from "assets/icons/logout-gray.svg";
import LanguageIcon from "assets/icons/language-gray.svg";
import PeopleIcon from "assets/icons/people-gray.svg";

const { SubMenu } = Menu;
const profileItemStyle = { margin: "8px 0", height: "auto" };

export const ProfileMenu = ({
  user,
  organisationIndex,
  setOrganisation,
  onFeedbackIconClick,
}) => {
  const { t } = useTranslation();
  const profileUrl =
    organisationIndex === null
      ? `/profile/${user?.id || user?._id}`
      : `/organisation/${user?.organisations[organisationIndex]?._id}`;
  return (
    <Menu>
      <Menu.Item style={profileItemStyle}>
        <Link to={profileUrl}>
          <ProfileItem user={user} />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <SvgIcon src={PeopleIcon} />
        {t("common.switchAccount")}
      </Menu.Item>
      <Menu.Item>
        <SvgIcon src={LanguageIcon} />
        {t("common.language")}
      </Menu.Item>
      <Menu.Item
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={onFeedbackIconClick}
      >
        <SvgIcon src={FeedbackIcon} />
        {t("common.feedback")}
      </Menu.Item>
      <Menu.Item>
        <SvgIcon src={LogoutIcon} />
        <Link to="/auth/logout">{t("common.logout")}</Link>
      </Menu.Item>
    </Menu>
  );
};

const ProfileInfo = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  line-height: normal;
  color: ${({ bold }) => (bold ? "#939393" : "rgba(0, 0, 0, 0.85)")};
`;

const ProfileItemContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;

const ProfileItem = ({ user }) => {
  return (
    <ProfileItemContainer>
      <div>
        <Avatar>
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
