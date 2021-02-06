import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const BasicTabs = (props) => {
  return (
    <Tabs defaultActiveKey="2" onChange={callback}>
      <TabPane tab="Activity" disabled key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Posts" disabled key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Thanks" disabled key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Badge" disabled key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default BasicTabs;
