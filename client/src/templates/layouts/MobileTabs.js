import React from 'react';
import styled from "styled-components";

import { Tabs } from 'antd-mobile';
import { NavLink } from 'react-router-dom';

import { theme, mq } from "../../constants/theme";
const { colors } = theme;


const CustomLink = styled(NavLink)`
   color: inherit;
   text-decoration: none;
   font-size: 1.4rem;
   line-height: normal;
   text-align: center;
   &:hover {
     color: ${colors.black};
   }
`;

const ActiveLinkStyles = {
  color: "#282828",
  fontWeight: "bold"
}

const TabsContainer = styled.div`
    display: none !important;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: block !important;
    }
`;

const tabs = [
  { title: <CustomLink activeStyle={ActiveLinkStyles} to="/nearest-hospital">Health Facilities</CustomLink> },
  { title: <CustomLink activeStyle={ActiveLinkStyles} to="/symptoms-check">Symptom Checker</CustomLink> },
  { title: <CustomLink activeStyle={ActiveLinkStyles} to="/feed">Feed</CustomLink> },
];


const MobileTabs = props => {

  const { tabIndex, childComponent } = props;


  return (
    <TabsContainer>
      <Tabs
        tabs={tabs}
        page={tabIndex}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
      >
        <div>{childComponent}</div>
      </Tabs>
    </TabsContainer>
  )
}

export default MobileTabs;
