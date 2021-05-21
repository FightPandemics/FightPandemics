import { Tabs } from "antd";
import styled from "styled-components";
import { mq, theme } from "constants/theme";

const { colors } = theme;

export const ProfileTabs = styled(Tabs)`
  position: relative;
  padding: 0;
  color: ${colors.darkGray};
  font-family: "Poppins";
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 24px;
  margin-top: 10.1rem;

  .ant-tabs-nav-wrap {
    margin-bottom: 2.4rem !important;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin-bottom: 1rem !important;
    }
  }

  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-nav::after {
    content: "";
    border-bottom: solid 0.1rem ${colors.mediumishGray};
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .ant-tabs-nav-wrap::after {
    content: "";
    /* border-bottom: solid .1rem ${colors.mediumishGray}; */
    border-bottom: solid 0.1rem red;
    position: absolute;
    left: -50%;
    width: 4000px;
  }

  .ant-tabs-ink-bar {
    background: none;
  }

  .ant-tabs-content {
    border-radius: 1.2rem;
  }
  .ant-tabs-nav-list {
    margin: 0;
  }

  .ant-tabs-tab {
    margin-right: 10rem;
    border-radius: 30.2rem;
    padding: 0;
    /* padding-bottom: 2.2rem; */
    overflow: visible;

    :hover {
      color: ${colors.darkGray};
    }
  }

  .ant-tabs-tabpane {
    border-radius: 30.2rem;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${colors.black};
  }

  &.ant-tabs {
    overflow: visible;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;

    .ant-tabs-tab {
      margin-right: 2.5rem;
    }
  }
`;

export const ProfileTabPane = styled(ProfileTabs.TabPane)`
  margin: 0;
`;
