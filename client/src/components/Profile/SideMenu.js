import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import { MenuWrapper } from "../Feed/FeedWrappers";
import { setQueryKeysValue } from "components/Feed/utils";
import GTM from "../../constants/gtm-tags";

const { SubMenu } = Menu;

export default function SideMenu({ callback, tabs, def }) {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState();

  const handleChangeType = (e) => {
    callback(e.key);
    setQueryParams(e.key);
  };

  return (
    <div>
      <MenuWrapper
        //   defaultSelectedKeys={[def]}
        selectedKeys={queryParams || def}
        onClick={handleChangeType}
      >
        {tabs.map((e, index) => (
          <Menu.Item key={index}>{t(e)}</Menu.Item>
        ))}
      </MenuWrapper>
    </div>
  );
}
