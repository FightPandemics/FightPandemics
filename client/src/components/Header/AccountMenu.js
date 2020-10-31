import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import styled from "styled-components";

import GTM from "constants/gtm-tags";
import { getInitialsFromFullName } from "utils/userInfo";
import SvgIcon from "components/Icon/SvgIcon";
import { Avatar } from "components/Avatar";
import { MENU_STATE, CustomSvgIcon } from "./constants";

import BackIcon from "assets/icons/back.svg";
import DoneIcon from "assets/icons/done.svg";
import PlusIcon from "assets/icons/plus.svg";

const CustomItemGroup = styled(Menu.ItemGroup)`
  .ant-menu-item-group-list .ant-menu-item {
    padding: 0 16px;
  }
`;

export const AccountMenu = ({
  user,
  setMenuState,
  setOrganisation,
  organisationId,
}) => {
  const { t } = useTranslation();
  const anyOrganisation = user?.organisations?.length > 0;
  const organisations = user?.organisations;
  return (
    <Menu>
      <Menu.Item onClick={() => setMenuState(MENU_STATE.SETTINGS)}>
        <SvgIcon src={BackIcon} />
        {t("common.switchAccount")}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => setOrganisation(null)}>
        <Avatar src={user.photo} size={"small"}>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
        </Avatar>
        {`${user?.firstName} ${user?.lastName} `}
        {!organisationId && <SvgIcon src={DoneIcon} />}
      </Menu.Item>
      <Menu.Divider />
      {anyOrganisation && (
        <CustomItemGroup title={t("common.myOrganisation")}>
          {organisations.map((current) => (
            <Menu.Item
              key={current._id}
              onClick={() => setOrganisation(current._id)}
            >
              <Avatar size={"small"}>
                {getInitialsFromFullName(current.name)}
              </Avatar>
              {current.name}
              {organisationId === current._id && <SvgIcon src={DoneIcon} />}
            </Menu.Item>
          ))}
        </CustomItemGroup>
      )}
      <Menu.Divider />
      <Menu.Item>
        <CustomSvgIcon src={PlusIcon} />
        <Link
          id={GTM.nav.prefix + GTM.nav.addOrg}
          to="/create-organisation-profile"
        >
          {t("common.addOrg")}
        </Link>
      </Menu.Item>
    </Menu>
  );
};
