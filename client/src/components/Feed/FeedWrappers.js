import styled from "styled-components";
import { Layout, Menu } from "antd";
import SearchCategories from "components/Input/SearchCategories";
import { theme, mq } from "constants/theme";
const { display } = theme.typography.font.family;
const { black, darkerGray, royalBlue, white, offWhite } = theme.colors;
const { Content, Sider } = Layout;

export const FeedWrapper = styled.div`
  font-family: ${display};
  width: 100%;
  position: relative;
`;

export const SiderWrapper = styled(Sider)`
  background-color: ${white};
  height: calc(100vh - 5rem);
  overflow-x: hidden;
  padding-top: 3.3rem;
  position: fixed;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

export const FiltersWrapper = styled.div`
  border-top: 0.05rem solid rgba(0, 0, 0, 0.5);
  margin: 1.5rem 2rem 0;
  padding-top: 2rem;
  button {
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${black};
    cursor: pointer;
    display: flex;
    width: 100%;
    font-family: ${theme.typography.font.family.display};
    font-size: ${theme.typography.size.large};
    font-weight: bold;
    margin-bottom: 1rem;
    padding: 0;
    span {
      align-items: center;
      border: 0.1rem solid ${royalBlue};
      border-radius: 50%;
      color: ${royalBlue};
      display: flex;
      height: 4.2rem;
      justify-content: center;
      margin-right: 1rem;
      width: 4.2rem;
      pointer-events: none;
      svg {
        fill: ${royalBlue};
        height: 2rem;
        width: 2rem;
        pointer-events: none;
      }
    }
  }
`;

export const MenuWrapper = styled(Menu)`
  &.ant-menu {
    .ant-menu-item {
      height: 3rem;
      border-left: 0.5rem solid ${white};
      color: ${darkerGray};
      font-size: ${theme.typography.size.large};
      &:hover {
        color: ${royalBlue};
      }
    }
    .ant-menu-item-selected {
      background-color: transparent;
      border-left: 0.5rem solid ${royalBlue};
      color: ${royalBlue};
      font-weight: bold;
    }
  }
`;

export const LayoutWrapper = styled(Layout)`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    background-color: ${white};
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-color: ${offWhite};
    min-height: calc(100vh - 5rem);
    .create-post,
    .filter-box {
      display: none;
    }
  }
`;

export const ContentWrapper = styled(Content)`
  margin: 0 1rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    overflow-x: visible !important;
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 3.3rem 8.5rem 3.3rem calc(29rem + 8.5rem);
  }
`;

export const HeaderWrapper = styled.div`
  display: none;
  h1 {
    font-size: ${theme.typography.heading.one};
    font-weight: bold;
    margin-top: 0;
  }
  button {
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${black};
    cursor: pointer;
    display: flex;
    font-family: ${theme.typography.font.family.display};
    font-size: ${theme.typography.size.large};
    padding: 0;
    img {
      margin-left: 1.2rem;
      pointer-events: none;
    }
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    justify-content: space-between;
  }
`;
export const TabsWrapper = styled(SearchCategories)`
  flex-basis: 100%;
  height: 0;
`;
export const MobileSearchWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin: 2rem auto 1rem;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    display: none !important;
  }
`;
