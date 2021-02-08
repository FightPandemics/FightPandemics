import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const BasicTabs = (props) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function resize() {
      setWindowDimensions(getWindowDimensions());
      console.log(windowDimensions);
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  return (
    <Tabs
      tabPosition={windowDimensions.width <= 450 ? "top" : "left"}
      defaultActiveKey="2"
      onChange={props.callback}
    >
      <TabPane tab="Activity" disabled key="1"></TabPane>
      <TabPane tab="Posts" key="2"></TabPane>
      <TabPane tab="Thanks" key="3"></TabPane>
      <TabPane tab="Badge" disabled key="4"></TabPane>
    </Tabs>
  );
};

export default BasicTabs;
