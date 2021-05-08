import { Tabs } from "antd";
import styled from "styled-components";
import { mq, theme } from "constants/theme";

const { colors } = theme;


export const ProfileTabs = styled(Tabs)`
  /* .ant-tabs-content-holder { 
  box-shadow: 0px 0px 16px 11px #000000;
  } */
  padding: 0 2rem;
  color: ${colors.darkGray};
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 24px;
  margin-top: 10.1rem;

.ant-tabs-nav {
  margin-bottom: 0;
}


.ant-tabs-nav::after {
  content: "";
  border-bottom: solid .1rem ${colors.mediumishGray};
  position: absolute;
  left:-50%;
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
    padding-bottom: 2.2rem;
    overflow: visible;

    :hover {
      color: ${colors.darkGray};
    }
  }

  .ant-tabs-tabpane {
    border-radius: 30.2rem;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn{
    color: ${colors.black};
  }

  &.ant-tabs{
    overflow: visible;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    .ant-tabs-tab {
    margin-right: 2.5rem;
    }
  }
`;

export const ProfileTabPane = styled(ProfileTabs.TabPane)`
 
  margin: 0;
`