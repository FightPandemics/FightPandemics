import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const BasicTabs = ({ tabData, onChange }) => {
  const { defaultView, position, tabs } = tabData;

  return (
    <Tabs
      tabPosition={position}
      defaultActiveKey={defaultView}
      onChange={onChange}
    >
      {tabs.map((e, index) => {
        return (
          <TabPane tab={e.tabName} key={e.tabName} disabled={e.disabled}>
            {e.tabView}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default BasicTabs;
