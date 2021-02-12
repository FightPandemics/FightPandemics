import React from "react";
import BasicTabs from "components/Tabs/BasicTabs";
import styled from "styled-components";

// Styled component named StyledButton
const StyledTabs = styled.div`
  .ant-tabs-ink-bar {
    border-bottom: 2px solid black;
    width: 200px;
  }
  .ant-tabs-tab-btn {
    color: #666666;
  }
  .ant-tabs-tab-active > .ant-tabs-tab-btn {
    font-weight: 800;
    color: black;
  }
  .ant-tabs-tab-disabled > .ant-tabs-tab-btn {
    color: #e1e1e1;
  }
  .ant-tabs-nav-list {
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: space-between;
  }
`;

export default function ProfileTabs(props) {
  // Use it like any other component.
  return (
    <StyledTabs>
      <BasicTabs {...props} />
    </StyledTabs>
  );
}
