import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Tabs } from "antd-mobile";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { theme, mq } from "../../constants/theme";
const { black, darkGray, darkerGray } = theme.colors;

const CustomLink = styled(NavLink)`
  color: ${darkGray};
  text-decoration: none;
  font-size: 1.4rem;
  line-height: normal;
  text-align: center;
  &:hover {
    color: ${black};
  }
`;

const ActiveLinkStyles = {
  color: `${darkerGray}`,
  fontWeight: "bold",
};

const TabsContainer = styled.div`
  display: none !important;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block !important;
    position: relative;
    top: 4rem;
  }
`;

const MobileTabs = (props) => {
  const { t } = useTranslation();
  const { tabIndex, childComponent } = props;

  const [status, setStatus] = useState(true);

  const tabs = [
    /* Commenting out for fist MVP launch
    {
      title: (
        <CustomLink activeStyle={ActiveLinkStyles} to="/nearest-hospital">
          Health Facilities
        </CustomLink>
      ),
    },
    {
      title: (
        <CustomLink activeStyle={ActiveLinkStyles} to="/symptoms-check">
          Symptom Checker
        </CustomLink>
      ),
    },
    */
    {
      title: (
        <CustomLink activeStyle={ActiveLinkStyles} to="/feed">
          {t("feed.title")}
        </CustomLink>
      ),
    },
  ];

  useEffect(() => {
    const noticeBar = sessionStorage.getItem("LocalEmergencyBox");
    if (noticeBar === "true") {
      setStatus(true);
    } else if (noticeBar === "false") {
      setStatus(false);
    } else {
      sessionStorage.setItem("LocalEmergencyBox", "true");
    }
  }, [status]);

  // const removeNoticeBar = () => {
  //   sessionStorage.setItem("LocalEmergencyBox", "false");
  // };

  return (
    <TabsContainer>
      {/* {status ? <LocalEmergencyNumber onClick={removeNoticeBar} /> : null} */}
      <Tabs
        tabs={tabs}
        page={tabIndex}
        renderTabBar={(props) => <Tabs.DefaultTabBar {...props} page={3} />}
      >
        <div>{childComponent}</div>
      </Tabs>
    </TabsContainer>
  );
};

export default MobileTabs;
