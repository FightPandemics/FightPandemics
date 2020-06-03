import React, { useReducer, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Antd
import { Layout, Menu } from "antd";

// Local
import filterOptions from "assets/data/filterOptions";
import FeedWrapper from "components/Feed/FeedWrapper";
import FilterBox from "components/Feed/FilterBox";
import FiltersSidebar from "components/Feed/FiltersSidebar";
import FiltersList from "components/Feed/FiltersList";
import Posts from "components/Feed/Posts";
import CreatePost from "components/CreatePost/CreatePost";
import {
  optionsReducer,
  feedReducer,
  postsReducer,
  postsState,
} from "hooks/reducers/feedReducers";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import creatPost from "assets/icons/create-post.svg";
import { ReactComponent as FiltersIcon } from "assets/icons/filters.svg";

// Constants
import { theme, mq } from "constants/theme";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_POSTS,
  FETCH_POSTS,
  ERROR_POSTS,
  NEXT_PAGE,
  SET_LOADING,
  SET_LIKE,
  SET_COMMENTS,
} from "hooks/actions/feedActions";
import { LOGIN } from "templates/RouteWithSubRoutes";

const { black, darkerGray, royalBlue, white, offWhite } = theme.colors;

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
  background-color: ${white};
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
    color: ${black};
    cursor: pointer;
    display: flex;
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
      svg {
        fill: ${royalBlue};
        height: 2rem;
        width: 2rem;
      }
    }
  }
`;

const MenuWrapper = styled(Menu)`
  &.ant-menu {
    .ant-menu-item {
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

const LayoutWrapper = styled(Layout)`
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
    color: ${black};
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

const Feed = (props) => {
  const { id } = useParams();
  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
    createPostModal: id === "create-post",
  });
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const [posts, postsDispatch] = useReducer(postsReducer, postsState);
  const {
    filterModal,
    createPostModal,
    activePanel,
    location,
    selectedType,
    showFilters,
  } = feedState;
  const filters = Object.values(filterOptions);
  const { isLoading, loadMore, page, posts: postsList,status } = posts;
  let bottomBoundaryRef = useRef(null);

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
    const value = HELP_TYPE[e.key];

    if (selectedType !== value) {
      dispatchAction(SET_VALUE, "selectedType", value);

      if (value === HELP_TYPE.ALL) {
        postsDispatch({ type: SET_POSTS, posts: postsState.posts });
      } else {
        const filtered = postsState.posts.filter((item) => item.type === value);

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

  const handlePostLike = async (postId, liked) => {
    const { history, isAuthenticated, user } = props;

    /* added here because userId not working */
    sessionStorage.removeItem("likePost");

    if (isAuthenticated) {
      const endPoint = `/api/posts/${postId}/likes/${user && user.userId}`;
      let response = {};

      if (user) {
        if (liked) {
          try {
            response = await axios.delete(endPoint);
          } catch (error) {
            console.log({ error });
          }
        } else {
          try {
            response = await axios.put(endPoint);
          } catch (error) {
            console.log({ error });
          }
        }

        if (response.data) {
          postsDispatch({
            type: SET_LIKE,
            postId,
            count: response.data.likesCount,
          });
        }
      }
    } else {
      sessionStorage.setItem("likePost", postId);
      history.push(LOGIN);
    }
  };

  const updateComments = ({postId, comments, commentsCount}) => {
    postsDispatch({
      type: SET_COMMENTS,
      postId,
      comments,
      commentsCount,
    });
  }

  const loadPosts = useCallback(async () => {
    const { user } = props;
    const limit = 5;
    const skip = page * limit;
    /* Add userId when user is logged */
    const endpoint = `/api/posts?limit=${limit}&skip=${skip}${
      user && user.userId ? `&userId=${user.userId}` : ""
    }`;
    let response = {};

    if (isLoading) {
      return;
    }

    await postsDispatch({ type: FETCH_POSTS });

    try {
      response = await axios.get(endpoint);
    } catch (error) {
      await postsDispatch({ type: ERROR_POSTS });
    }

    if (response.data && response.data.length) {
      const loadedPosts =  response.data.reduce((obj, item) => ((obj[item._id] = item, obj)), {});

      await postsDispatch({ type: SET_POSTS, posts: { ...postsList, ...loadedPosts } });
    } else {
      await postsDispatch({ type: SET_LOADING });
    }
  }, [ postsList, isLoading, page, props ]);

  useEffect(() => {
    loadPosts();
  }, [ page ]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(async entry => {
          if (entry.intersectionRatio > 0 && !isLoading && loadMore) {
            await postsDispatch({ type: NEXT_PAGE });
          }
        });
      }).observe(node);
    },
    [ postsDispatch, isLoading, loadMore ]
  );

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

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
        handlePostLike,
        updateComments,
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
                Create a post
                <SvgIcon src={creatPost} />
              </button>
            </HeaderWrapper>
            <FilterBox />
            <Posts filteredPosts={postsList} />
            {isLoading && <div>Loading...</div>}
            {status === ERROR_POSTS && (
              <div>Something went wrong...</div>
            )}
            {!isLoading && <div id="list-bottom" ref={ bottomBoundaryRef }></div>}
            <SvgIcon
              src={creatPost}
              onClick={handleCreatePost}
              className="create-post"
            />
          </ContentWrapper>
        </LayoutWrapper>
        <CreatePost
          onCancel={() => dispatchAction(TOGGLE_STATE, "createPostModal")}
          visible={createPostModal}
        />
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

export default Feed;
