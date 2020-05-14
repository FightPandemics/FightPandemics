import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Antd
import { Layout, Menu } from "antd";

// Local
import ButtonModal from "components/Feed/ButtonModal";
import filterOptions from "assets/data/filterOptions";
import fakePosts from "assets/data/fakePosts";
import FeedWrapper from "components/Feed/FeedWrapper";
import FilterBox from "components/Feed/FilterBox";
import FiltersSidebar from "components/Feed/FiltersSidebar";
import FiltersList from "components/Feed/FiltersList";
import Posts from "components/Feed/Posts";
import {
  optionsReducer,
  feedReducer,
  postsReducer,
} from "hooks/reducers/feedReducers";

// Constants
import { theme, mq } from "constants/theme";
import { BLACK, DARKER_GRAY, ROYAL_BLUE, WHITE } from "constants/colors";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_POSTS,
} from "hooks/actions/feedActions";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import creatPost from "assets/icons/create-post.svg";
import { ReactComponent as FiltersIcon } from "assets/icons/filters.svg";

export const FeedContext = React.createContext();

const { Content, Sider } = Layout;

// feed types
const HELP_TYPE = {
  ALL: "All posts",
  REQUEST: "Requesting help",
  OFFER: "Offering help",
};

const initialState = {
  selectedType: "",
  showFilters: false,
  filterModal: false,
  createPostModal: false,
  activePanel: null,
  location: "",
};

const SiderWrapper = styled(Sider)`
  background-color: ${WHITE};
  height: calc(100vh - 5rem);
  overflow-x: hidden;
  padding-top: 3.3rem;
  position: fixed;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const FiltersWrapper = styled.div`
  border-top: 0.05rem solid rgba(0, 0, 0, 0.5);
  margin: 0 2rem;
  padding-top: 2rem;

  button {
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${BLACK};
    cursor: pointer;
    display: flex;
    font-family: ${theme.typography.font.family.display};
    font-size: ${theme.typography.size.large};
    font-weight: bold;
    margin-bottom: 1rem;
    padding: 0;

    span {
      align-items: center;
      border: 0.1rem solid ${ROYAL_BLUE};
      border-radius: 50%;
      color: ${ROYAL_BLUE};
      display: flex;
      height: 4.2rem;
      justify-content: center;
      margin-right: 1rem;
      width: 4.2rem;

      svg {
        fill: ${ROYAL_BLUE};
        height: 2rem;
        width: 2rem;
      }
    }
  }
`;

const MenuWrapper = styled(Menu)`
  &.ant-menu {
    .ant-menu-item {
      border-left: 0.5rem solid ${WHITE};
      color: ${DARKER_GRAY};
      font-size: ${theme.typography.size.large};

      &:hover {
        color: ${ROYAL_BLUE};
      }
    }

    .ant-menu-item-selected {
      background-color: transparent;
      border-left: 0.5rem solid ${ROYAL_BLUE};
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
    background-color: #fbfbfd;
    min-height: calc(100vh - 5rem);

    .create-post,
    .filter-box {
      display: none;
    }
  }
`;

const ContentWrapper = styled(Content)`
  margin: 0;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 3.3rem 8.5rem 3.3rem calc(29rem + 8.5rem);
  }
`;

const HeaderWrapper = styled.div`
  display: none;

  h1 {
    font-size: ${theme.typography.heading.one};
    font-weight: bold;
    margin-top: 0;
  }

  button {
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${BLACK};
    cursor: pointer;
    display: flex;
    font-family: ${theme.typography.font.family.display};
    font-size: ${theme.typography.size.large};
    padding: 0;

    img {
      margin-left: 1.2rem;
      max-height: 4.2rem;
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
  const [posts, postsDispatch] = useReducer(postsReducer, { posts: fakePosts });
  const {
    filterModal,
    createPostModal,
    activePanel,
    location,
    selectedType,
    showFilters,
  } = feedState;
  const filters = Object.values(filterOptions);

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
      dispatchAction(TOGGLE_STATE, "showFilters");
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
      dispatchAction(SET_VALUE, "selectedType", value);

      if (value === HELP_TYPE.ALL) {
        postsDispatch({ type: SET_POSTS, posts: fakePosts });
      } else {
        const filtered = fakePosts.filter((item) => item.type === value);

        postsDispatch({ type: SET_POSTS, posts: filtered });
      }
    }
  };

  const handleShowFilters = (e) => {
    dispatchAction(TOGGLE_STATE, "showFilters");
  };

  const handleOnClose = () => {
    dispatchAction(TOGGLE_STATE, "showFilters");
  };

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
            width={290}
          >
            <div>
              <MenuWrapper
                defaultSelectedKeys={["ALL"]}
                onClick={handleChangeType}
              >
                {Object.keys(HELP_TYPE).map((item, index) => (
                  <Menu.Item key={item}>{HELP_TYPE[item]}</Menu.Item>
                ))}
              </MenuWrapper>
              <FiltersWrapper>
                <button onClick={handleShowFilters}>
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
              <button onClick={handleCreatePost}>
                Create post
                <SvgIcon src={creatPost} />
              </button>
            </HeaderWrapper>
            <FilterBox />
            <Posts filteredPosts={posts.posts} />
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
