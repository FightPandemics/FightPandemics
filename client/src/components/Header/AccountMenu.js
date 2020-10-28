import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import styled from "styled-components";

import GTM from "constants/gtm-tags";
import { getInitialsFromFullName } from "utils/userInfo";
import SvgIcon from "components/Icon/SvgIcon";
import { MENU_STATE, CustomAvatar, CustomSvgIcon } from "./constants";

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
  organisationIndex,
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
        <CustomAvatar size={"small"}>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
        </CustomAvatar>
        {`${user?.firstName} ${user?.lastName} `}
        {!organisationIndex && <SvgIcon src={DoneIcon} />}
      </Menu.Item>
      <Menu.Divider />
      {anyOrganisation && (
        <CustomItemGroup title={t("common.myOrganisation")}>
          {organisations.map((current) => (
            <Menu.Item
              key={current._id}
              onClick={() => setOrganisation(current._id)}
            >
              <CustomAvatar size={"small"}>
                {getInitialsFromFullName(current.name)}
              </CustomAvatar>
              {current.name}
              {organisationIndex === current._id && <SvgIcon src={DoneIcon} />}
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
