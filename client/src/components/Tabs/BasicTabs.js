import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const BasicTabs = ({ callback, tabs, position, def, disabled }) => {
  useEffect(() => {
    console.log(tabs);
  });

  return (
    <Tabs
      tabPosition={position ? position : "top"}
      defaultActiveKey={def ? def : "0"}
      onChange={callback}
    >
      {tabs.map((e, index) => {
        if (disabled) {
          if (disabled[index] === true) {
            return <TabPane tab={e} disabled key={index}></TabPane>;
          } else {
            return <TabPane tab={e} key={index}></TabPane>;
          }
        }
        return <TabPane tab={e} key={index}></TabPane>;
      })}
    </Tabs>
  );
};

export default BasicTabs;
