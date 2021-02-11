import React, { useState } from "react";
import { Menu } from "antd";
import { SiderWrapper, MenuWrapper } from "components/Feed/FeedWrappers";
import { setQueryKeysValue } from "components/Feed/utils";
import { useTranslation, Trans } from "react-i18next";

export default function SideMenu() {
  let HELP_TYPE = {
    ALL: "All posts",
    REQUEST: "Requesting help",
    OFFER: "Offering help",
  };

  const [queryParams, setQueryParams] = useState({});
  // const { history, isAuthenticated, user } = props;
  const { t } = useTranslation();
  // const handleChangeType = (e) => {

  //     const value = e.key;
  //     if (value && queryParams.objective?.toUpperCase() !== value) {
  //       setQueryKeysValue(history, {
  //         objective: e.key === "ALL" ? null : e.key,
  //       });
  //     }
  //   };

  return (
    <SiderWrapper
      breakpoint="md"
      className="site-layout-background"
      width="29rem"
    >
      <>
        <MenuWrapper
          defaultSelectedKeys={["ALL"]}
          selectedKeys={[queryParams.objective || "ALL"]}
          // onClick={handleChangeType}
        >
          {Object.keys(HELP_TYPE).map((item, index) => (
            <Menu.Item key={item}>{t(HELP_TYPE[item])}</Menu.Item>
          ))}
        </MenuWrapper>
      </>
    </SiderWrapper>
  );
}
