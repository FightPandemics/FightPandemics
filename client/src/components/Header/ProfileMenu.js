import React, { useState } from "react";
import { Dropdown } from "antd";

import { getInitialsFromFullName } from "utils/userInfo";
import { Avatar } from "components/Avatar";
import { SettingMenu } from "./SettingMenu";
import { AccountMenu } from "./AccountMenu";
import { MENU_STATE } from "./constants";

export const ProfileMenu = ({
  user,
  organisationId,
  setOrganisation,
  onFeedbackIconClick,
}) => {
  const [menuState, setMenuState] = useState(MENU_STATE.CLOSED);
  const menu = renderMenu(
    menuState,
    setMenuState,
    user,
    setOrganisation,
    organisationId,
    onFeedbackIconClick,
  );
  const onVisibleChange = (visible) => {
    if (!visible) {
      setMenuState(MENU_STATE.CLOSED);
    }
  };
  return (
    <Dropdown
      overlay={menu}
      visible={menuState !== MENU_STATE.CLOSED}
      onVisibleChange={onVisibleChange}
      trigger={["click"]}
    >
      <Avatar
        size={"small"}
        src={user.photo}
        onClick={() => setMenuState(MENU_STATE.SETTINGS)}
      >
        {getInitialsFromFullName(`${user.firstName} ${user.lastName} `)}
      </Avatar>
    </Dropdown>
  );
};

const renderMenu = (
  menuState,
  setMenuState,
  user,
  setOrganisation,
  organisationId,
  onFeedbackIconClick,
) => {
  if (menuState === MENU_STATE.SETTINGS) {
    return (
      <SettingMenu
        user={user}
        organisationId={organisationId}
        onFeedbackIconClick={onFeedbackIconClick}
        setMenuState={setMenuState}
      />
    );
  }
  if (menuState === MENU_STATE.ACCOUNTS) {
    return (
      <AccountMenu
        user={user}
        setOrganisation={setOrganisation}
        organisationId={organisationId}
        setMenuState={setMenuState}
      />
    );
  }
  return <div></div>;
};
