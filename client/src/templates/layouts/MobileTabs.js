import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LocalEmergencyNumber from "../../components/NearestHospital/LocalEmergencyNumber";
import { Tabs } from "antd-mobile";
import { NavLink } from "react-router-dom";

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
  }
`;

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
        Feed
      </CustomLink>
    ),
  },
];

const MobileTabs = (props) => {
  const { tabIndex, childComponent } = props;

  const [status, setStatus] = useState(true);

  useEffect(() => {
    const noticeBar = sessionStorage.getItem("LocalEmergencyBox");
    if (noticeBar === "true") {
      setStatus(true);
    } else if (noticeBar === "false") {
      setStatus(false);
    } else {
      sessionStorage.setItem("LocalEmergencyBox", "true");
    }
  }, []);

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
