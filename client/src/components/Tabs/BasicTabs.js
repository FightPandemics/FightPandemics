import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const BasicTabs = ({ tabData }) => {
  const { defaultView, position, tabs } = tabData;
  return (
    <Tabs tabPosition={position} defaultActiveKey={defaultView}>
      {tabs.map((e, index) => {
        if (e.display) {
          return (
            <TabPane tab={e.tabName} key={index}>
              {e.tabView}
            </TabPane>
          );
        }
        return (
          <TabPane tab={e.tabName} key={index} disabled>
            {e.tabView}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default BasicTabs;
