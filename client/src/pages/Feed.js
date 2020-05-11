import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Antd
import { Layout, Menu } from 'antd';

// Local
import ButtonModal from "components/Feed/ButtonModal";
import filterOptions from "assets/data/filterOptions";
import fakePosts from "assets/data/fakePosts";
import FeedWrapper from "components/Feed/FeedWrapper";
import FilterBox from "components/Feed/FilterBox";
import FiltersSidebar from "components/Feed/FiltersSidebar";
import FiltersList from "components/Feed/FiltersList";
import Posts from "components/Feed/Posts";
import { optionsReducer, feedReducer } from "hooks/reducers/feedReducers";

// Constants
import { theme, mq } from "constants/theme";
import { ROYAL_BLUE, WHITE } from "constants/colors";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
} from "hooks/actions/feedActions";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import creatPost from "assets/icons/create-post.svg";
import { ReactComponent as FiltersIcon } from "assets/icons/filters.svg";

export const FeedContext = React.createContext();

const { Content, Sider } = Layout;

// feed types
const HELP_TYPE = {
  ALL: 'All posts',
  REQUEST: 'Requesting help',
  OFFER: 'Offering help'
};

const initialState = {
  filterModal: false,
  createPostModal: false,
  activePanel: null,
  location: "",
};

const SiderWrapper = styled(Sider)`
  background-color: ${WHITE};
  height: calc(100vh - 60px);
  overflow-x: hidden;
  padding-top: 33px;
  position: fixed;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const FiltersWrapper = styled.div`
  border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  margin: 0 20px;
  padding-top: 20px;

  button {
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    font-family: ${theme.typography.font.family.display};
    font-size: ${theme.typography.size.large};
    font-weight: bold;
    margin-bottom: 10px;
    padding: 0;

    span {
      align-items: center;
      border: 1px solid ${ROYAL_BLUE};
      border-radius: 50%;
      color: ${ROYAL_BLUE};
      display: flex;
      height: 42px;
      justify-content: center;
      margin-right: 10px;
      width: 42px;

      svg {
        fill: ${ROYAL_BLUE};
        height: 20px;
        width: 20px;
      }
    }
  }
`;

const MenuWrapper = styled(Menu)`
  &.ant-menu {
    .ant-menu-item {
      border-left: 5px solid ${WHITE};
      font-size: ${theme.typography.size.large};
    }

    .ant-menu-item-selected {
      background-color: transparent;
      border-left: 5px solid ${ROYAL_BLUE};
      color: ${ROYAL_BLUE};
      font-weight: bold;
    }
  }
`;

const LayoutWrapper = styled(Layout)`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    background-color: ${WHITE};
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    .create-post,
    .filter-box {
      display: none;
    }
  }
`;

const ContentWrapper = styled(Content)`
  margin: 0;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 33px 85px 33px calc(290px + 85px);
  }
`;

const HeaderWrapper = styled.div`
  display: none;

  h1 {
    font-size:  ${theme.typography.heading.one};
    font-weight: bold;
    margin-top: 0;
  }

  button {
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    font-family: ${theme.typography.font.family.display};
    font-size: ${theme.typography.size.large};
    padding: 0;

    img {
      margin-left: 12px;
      max-height: 42px;
    }
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    justify-content: space-between;
  }
`;

const Feed = () => {
  const [feedState, feedDispatch] = useReducer(feedReducer, initialState);
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const { filterModal, createPostModal, activePanel, location } = feedState;
  const filters = Object.values(filterOptions);
  const [selectedType, setSelectedType] = useState(HELP_TYPE.ALL);
  const [posts, setPosts] = useState(fakePosts);
  const [showFilters, setShowFilters] = useState(false);

  const dispatchAction = (type, key, value) =>
    feedDispatch({ type, key, value });

  const handleFilterModal = (panelIdx) => (e) => {
    e.preventDefault();
    dispatchAction(TOGGLE_STATE, "filterModal");
    dispatchAction(
      SET_VALUE,
      "activePanel",
      panelIdx > -1 ? `${panelIdx}` : null,
    );
  };

  const handleQuit = (e) => {
    e.preventDefault();
    if (filterModal) {
      dispatchAction(TOGGLE_STATE, "filterModal");
    }
    if (showFilters) {
      setShowFilters(false);
    }
    dispatchAction(SET_VALUE, "location", "");
    dispatchAction(SET_VALUE, "activePanel", null);
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
  };

  const handleLocation = (value) =>
    dispatchAction(SET_VALUE, "location", value);

  const handleOption = (label, option) => (e) => {
    const options = selectedOptions[label] || [];
    const hasOption = options.includes(option);

    return optionsDispatch({
      type: hasOption ? REMOVE_OPTION : ADD_OPTION,
      payload: { option, label },
    });
  };

  const handleCreatePost = () => {
    dispatchAction(TOGGLE_STATE, "createPostModal");
  };

  const handleChangeType = (e) => {
    const value = HELP_TYPE[e.key]; // e.target.innerHTML;

    if (selectedType !== value) {
      setSelectedType(value);

      if (value === HELP_TYPE.ALL) {
        setPosts(fakePosts);
      } else {
        const posts = fakePosts.filter((item) => item.type === value);

        setPosts(posts);
      }
    }
  }

  const handleShowFilters = (e) => {
    setShowFilters(true);
  }

  const handleOnClose = () => {
    setShowFilters(false);
  }

  const renderCreatePostModal = () => {
    return (
      <ButtonModal
        onClose={() => dispatchAction(TOGGLE_STATE, "createPostModal")}
        maskClosable={true}
        closable={false}
        visible={createPostModal}
        transparent
      >
        <h2 className="title">Continue Posting As</h2>
        <div className="links">
          <Link className="primary" to="/create-post">
            Individual
          </Link>

          <Link className="outline" to="/create-post">
            Organization
          </Link>
        </div>
      </ButtonModal>
    );
  };

  console.log({ filters, selectedOptions });
  return (
    <FeedContext.Provider
      value={{
        filters,
        filterModal,
        activePanel,
        location,
        dispatchAction,
        selectedOptions,
        handleOption,
        handleFilterModal,
        handleQuit,
        handleLocation,
        handleOnClose,
        showFilters,
      }}
    >
      <FeedWrapper>
        <LayoutWrapper>
          <SiderWrapper
            breakpoint="md"
            className="site-layout-background"
            width={290}>
            <div>
              <MenuWrapper
                defaultSelectedKeys={['ALL']}
                onClick={handleChangeType}
              >
                {Object.keys(HELP_TYPE).map((item, index) =>
                  <Menu.Item key={item}>
                    {HELP_TYPE[item]}
                  </Menu.Item>
                )}
              </MenuWrapper>
              <FiltersWrapper>
                <button
                  onClick={handleShowFilters} >
                  <span>
                    <FiltersIcon />
                  </span>
                Filters
              </button>
                <FiltersList />
              </FiltersWrapper>
            </div>
            <FiltersSidebar />
          </SiderWrapper>
          <ContentWrapper>
            <HeaderWrapper>
              <h1>Feed</h1>
              <button
                onClick={handleCreatePost}>
                Create post
                <SvgIcon
                  src={creatPost}
                />
              </button>
            </HeaderWrapper>
            <FilterBox />
            <Posts filteredPosts={posts} />
            <SvgIcon
              src={creatPost}
              onClick={handleCreatePost}
              className="create-post"
            />
          </ContentWrapper>
        </LayoutWrapper>
        {renderCreatePostModal()}
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

export default Feed;
