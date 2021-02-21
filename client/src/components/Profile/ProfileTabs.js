import React from "react";
import BasicTabs from "components/Tabs/BasicTabs";
import styled from "styled-components";

// Styled component named StyledButton
const ProfileTabs = ({ tabData }) => {
  const StyledTabs = styled.div`
    .ant-tabs-ink-bar {
      background: transparent;
    }
    .ant-tabs-content-holder {
      border: 0px;
    }
    .ant-tabs-tab-btn {
      color: #939393;
    }
    .ant-tabs-tab-active > .ant-tabs-tab-btn {
      font-family: Poppins;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 21px;
      letter-spacing: 0px;
      text-align: center;
      color: #282828;
    }
    .ant-tabs-tab-disabled > .ant-tabs-tab-btn {
      color: #e1e1e1;
    }
    ${tabData.position === "top"
      ? `
      .ant-tabs-nav-list {
      margin: auto;
      width: 800px;
      display: flex;
      justify-content: space-around;
      overflow: visible;
      }
      .ant-tabs-ink-bar {
      border-bottom: 2px solid #282828;
      width: 200px;
      } 
  `
      : null}
  `;
  return (
    <StyledTabs>
      <BasicTabs tabData={tabData} />
    </StyledTabs>
  );
};
export default ProfileTabs;
