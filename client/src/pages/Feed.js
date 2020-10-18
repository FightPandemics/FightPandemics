import React, {
  useReducer,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import styled from "styled-components";
import axios from "axios";

// Antd
import { Layout, Menu } from "antd";

// Local
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "components/Alert/ErrorAlert";
import filterOptions from "assets/data/filterOptions";
import FeedWrapper from "components/Feed/FeedWrapper";
import FilterBox from "components/Feed/FilterBox";
import FiltersSidebar from "components/Feed/FiltersSidebar";
import FiltersList from "components/Feed/FiltersList";
import Posts from "components/Feed/Posts";

import {
  optionsReducer,
  feedReducer,
  postsReducer,
  postsState,
} from "hooks/reducers/feedReducers";

// ICONS
import { CreatePostIcon } from "../components/Profile/ProfileComponents";
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
  RESET_PAGE,
  SET_LOADING,
  SET_LIKE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";
import { LOGIN } from "templates/RouteWithSubRoutes";
import GTM from "../constants/gtm-tags";

export const isAuthorOrg = (organisations, author) => {
  const isValid = organisations?.some(
    (organisation) => organisation.name === author.name,
  );
  return isValid;
};

export const isAuthorUser = (user, post) => {
  return (
    user?._id === post?.author?.id ||
    (user?.id === post?.author?.id &&
      (user.ownUser === undefined || user.ownUser))
  );
};

const gtmTagsMap = {
  ALL: GTM.post.allPost,
  REQUEST: `_${GTM.requestHelp.prefix}`,
  OFFER: `_${GTM.offerHelp.prefix}`,
};

const gtmTag = (tag) => GTM.feed.prefix + tag;

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
  selectedType: "ALL",
  showFilters: false,
  filterModal: false,
  showCreatePostModal: false,
  applyFilters: false,
  activePanel: null,
  location: null,
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

const MenuWrapper = styled(Menu)`
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
  margin: 0 1rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    overflow-x: visible !important;
  }
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

export const NoPosts = styled.div`
  text-align: center;
  position: relative;
  top: 2em;
  color: ${theme.colors.orangeRed};
  font-size: 1.2em;
  a {
    color: ${theme.colors.royalBlue};
  }
`;

const buttonPulse = styled.button`
  background-color: rgba(255, 255, 0, 0.4);
  padding: 0 0.2em;
  border-radius: 3em;
  height: 4em;
  position: relative;
  top: 1.3em;
`;
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;
const Feed = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
    showCreatePostModal: id === "create-post",
  });
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const [posts, postsDispatch] = useReducer(postsReducer, postsState);
  const [isOnboarding, setOnboarding] = useState(true);
  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const {
    filterModal,
    showCreatePostModal,
    activePanel,
    location,
    selectedType,
    applyFilters,
    showFilters,
  } = feedState;
  const filters = Object.values(filterOptions);
  const {
    error: postsError,
    isLoading,
    loadMore,
    page,
    posts: postsList,
    status,
    deleteModalVisibility,
  } = posts;
  const feedPosts = Object.entries(postsList);
  const prevTotalPostCount = usePrevious(totalPostCount);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const { history, isAuthenticated, user } = props;

  const dispatchAction = (type, key, value) =>
    feedDispatch({ type, key, value });

  const handleFilterModal = () => {
    // method for mobile
    dispatchAction(TOGGLE_STATE, "filterModal");
    dispatchAction(SET_VALUE, "applyFilters", false);
    // dispatchAction(
    //   SET_VALUE,
    //   "activePanel",
    //   panelIdx > -1 ? `${panelIdx}` : null,
    // );
  };

  const refetchPosts = (isLoading, loadMore) => {
    if (filterModal) {
      dispatchAction(TOGGLE_STATE, "filterModal");
    }

    if (showFilters) {
      dispatchAction(TOGGLE_STATE, "showFilters");
    }
    dispatchAction(SET_VALUE, "applyFilters", true);
    dispatchAction(SET_VALUE, "location", "");
    dispatchAction(SET_VALUE, "activePanel", null);
    postsDispatch({
      type: RESET_PAGE,
      isLoading,
      loadMore,
      filterType: "",
    });
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

  const handleQuit = (e) => {
    e.preventDefault();
    refetchPosts();
  };

  const handleLocation = (value) => {
    if (applyFilters) {
      postsDispatch({ type: RESET_PAGE, filterType: "" });
    }
    dispatchAction(SET_VALUE, "location", value);
  };

  const handleOption = (label, option) => (e) => {
    const options = selectedOptions[label] || [];
    const hasOption = options.includes(option);
    if (applyFilters) {
      postsDispatch({ type: RESET_PAGE, filterType: "" });
    }
    return optionsDispatch({
      type: hasOption ? REMOVE_OPTION : ADD_OPTION,
      payload: { option, label },
    });
  };

  const handleCreatePost = () => {
    if (isAuthenticated) {
      dispatchAction(TOGGLE_STATE, "showCreatePostModal");
      sessionStorage.removeItem("createPostAttemptLoggedOut");
    } else {
      sessionStorage.setItem("createPostAttemptLoggedOut", true);
      history.push(LOGIN);
    }
  };

  const handleChangeType = (e) => {
    const value = e.key;
    if (selectedType !== value) {
      dispatchAction(SET_VALUE, "selectedType", e.key);
      postsDispatch({ type: RESET_PAGE, filterType: value });
    }
  };

  const handleShowFilters = (e) => {
    // desktop
    dispatchAction(TOGGLE_STATE, "showFilters");
    dispatchAction(SET_VALUE, "applyFilters", false);
  };

  const handleOnClose = () => {
    dispatchAction(SET_VALUE, "filterModal", false);
    dispatchAction(TOGGLE_STATE, "showFilters");
    postsDispatch({ type: RESET_PAGE, filterType: "" });
    dispatchAction(SET_VALUE, "applyFilters", true);
  };

  const handlePostLike = async (postId, liked, create) => {
    sessionStorage.removeItem("likePost");

    if (isAuthenticated) {
      const endPoint = `/api/posts/${postId}/likes/${user?.id || user?._id}`;
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
      if (create) {
        sessionStorage.setItem("likePost", postId);
        history.push(LOGIN);
      }
    }
  };

  const handlePostDelete = () => {
    postsDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_POST,
    });
  };

  const handleCancelPostDelete = () => {
    postsDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_HIDE,
    });
  };

  const loadPosts = useCallback(async () => {
    const filterURL = () => {
      const filterObj = { ...selectedOptions };
      delete filterObj["lookingFor"];
      if (location) filterObj.location = location;
      return Object.keys(filterObj).length === 0
        ? ""
        : `&filter=${encodeURIComponent(JSON.stringify(filterObj))}`;
    };

    const objectiveURL = () => {
      let objective = selectedType;
      if (
        selectedOptions["lookingFor"] &&
        selectedOptions["lookingFor"].length < 2
      ) {
        objective =
          selectedOptions["lookingFor"][0] === "Request Help"
            ? "REQUEST"
            : "OFFER";
      }
      switch (objective) {
        case "REQUEST":
          return "&objective=request";
        case "OFFER":
          return "&objective=offer";
        default:
          return "";
      }
    };

    const limit = PAGINATION_LIMIT;
    const skip = page * limit;
    const baseURL = `/api/posts?&includeMeta=true&limit=${limit}&skip=${skip}`;
    let endpoint = `${baseURL}${objectiveURL()}${filterURL()}`;
    postsDispatch({ type: FETCH_POSTS });
    try {
      const {
        data: { data: posts, meta },
      } = await axios.get(endpoint);
      if (posts.length && meta.total) {
        if (prevTotalPostCount !== meta.total) {
          setTotalPostCount(meta.total);
        }
        if (posts.length < limit) {
          postsDispatch({
            type: SET_LOADING,
            isLoading: true,
            loadMore: false,
          });
        } else if (meta.total === limit) {
          postsDispatch({
            type: SET_LOADING,
            isLoading: true,
            loadMore: false,
          });
        }
        const loadedPosts = posts.reduce((obj, item) => {
          obj[item._id] = item;
          return obj;
        }, {});
        if (postsList) {
          postsDispatch({
            type: SET_POSTS,
            posts: { ...postsList, ...loadedPosts },
          });
        } else {
          postsDispatch({
            type: SET_POSTS,
            posts: { ...loadedPosts },
          });
        }
      } else if (posts) {
        postsDispatch({
          type: SET_POSTS,
          posts: { ...postsList },
        });
        postsDispatch({
          type: SET_LOADING,
          isLoading: false,
          loadMore: false,
        });
      } else {
        postsDispatch({ type: SET_LOADING });
      }
    } catch (error) {
      postsDispatch({ error, type: ERROR_POSTS });
    }
  }, [page, selectedOptions, location, selectedType, applyFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (applyFilters) {
      if (isOnboarding) {
        delete selectedOptions["providers"];
        setOnboarding(false);
      }
      loadPosts();
    }
  }, [selectedOptions, applyFilters, loadPosts]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Onboarding
    if (props.history.location.state) {
      const handleOnboardingOptions = (option, label) => {
        optionsDispatch({
          type: ADD_OPTION,
          payload: { option: option.value, label },
        });
        props.history.replace("/feed");
      };

      const {
        postType,
        helpType,
        location,
        providers,
      } = props.history.location.state;
      location && dispatchAction(SET_VALUE, "location", location);
      const getValue = (postType) => {
        switch (postType) {
          case "Requesting help":
            return "OFFER";
          case "Offering help":
            return "REQUEST";
          default:
            return "All";
        }
      };
      const value = getValue(postType);
      if (postType === HELP_TYPE.REQUEST) {
        // requesting help
        handleChangeType({ key: value });
        if (helpType === "medical") {
          let option = filters[2].options[0];
          handleOnboardingOptions(option, "type");
        } else {
          for (let i = 1; i < filters[2].options.length; ++i) {
            let option = filters[2].options[i];
            handleOnboardingOptions(option, "type");
          }
        }
      } else {
        // offering help
        handleChangeType({ key: value });
        if (providers) {
          let organisationFilter = providers.filter(
            (option) => option === "As an Organisation",
          );
          if (organisationFilter.length > 0) {
            for (let i = 1; i < filters[1].options.length; ++i) {
              let option = filters[1].options[i];
              handleOnboardingOptions(option, "providers");
            }
          } else {
            let option = filters[1].options[0];
            handleOnboardingOptions(option, "providers");
          }
        }
      }
    }
    dispatchAction(SET_VALUE, "applyFilters", true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isItemLoaded = useCallback((index) => !!feedPosts[index], [feedPosts]);

  const loadNextPage = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoading &&
        loadMore &&
        stopIndex >= feedPosts.length &&
        feedPosts.length
      ) {
        return new Promise((resolve) => {
          postsDispatch({ type: NEXT_PAGE });
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [feedPosts.length, isLoading, loadMore], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setItemCount(loadMore ? feedPosts.length + 1 : feedPosts.length);
  }, [feedPosts.length, loadMore]);

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;

    if (
      isAuthenticated &&
      user &&
      (isAuthorUser(user, post) || isAuthorOrg(user.organisations, post.author))
    ) {
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          const allPosts = {
            ...postsList,
          };
          delete allPosts[post._id];

          setTotalPostCount(totalPostCount - 1);
          if (totalPostCount < 10) {
            const isLoading = true;
            const loadMore = false;
            refetchPosts(isLoading, loadMore);
          } else {
            refetchPosts();
          }
        }
        setTotalPostCount(totalPostCount - 1);
      } catch (error) {
        console.log({
          error,
        });
      }
    }
  };

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;

  return (
    <FeedContext.Provider
      value={{
        filters,
        filterModal,
        activePanel,
        location,
        dispatchAction,
        selectedOptions,
        selectedType,
        handleShowFilters,
        handleOption,
        handleFilterModal,
        handleQuit,
        handleLocation,
        handleOnClose,
        showFilters,
        handlePostLike,
        totalPostCount,
      }}
    >
      <FeedWrapper>
        <LayoutWrapper>
          <SiderWrapper
            breakpoint="md"
            className="site-layout-background"
            width="29rem"
          >
            <>
              <MenuWrapper
                defaultSelectedKeys={["ALL"]}
                selectedKeys={[selectedType]}
                onClick={handleChangeType}
              >
                {Object.keys(HELP_TYPE).map((item, index) => (
                  <Menu.Item key={item} id={gtmTag(gtmTagsMap[item])}>
                    {t("feed." + item.toLowerCase())}
                  </Menu.Item>
                ))}
              </MenuWrapper>
              <FiltersWrapper>
                <button
                  id={gtmTag(GTM.post.filterPost)}
                  onClick={handleShowFilters}
                >
                  <span>
                    <FiltersIcon />
                  </span>
                  {t("feed.filters.title")}
                </button>
                <FiltersList />
              </FiltersWrapper>
            </>
            <FiltersSidebar gtmPrefix={GTM.feed.prefix} />
          </SiderWrapper>
          <ContentWrapper>
            <HeaderWrapper empty={emptyFeed()}>
              <h1>{t("feed.title")}</h1>

              <button
                id={gtmTag(GTM.post.createPost)}
                onClick={handleCreatePost}
              >
                {t("post.create")}
                <CreatePostIcon
                  id={gtmTag(GTM.post.createPost)}
                  src={creatPost}
                />
              </button>
            </HeaderWrapper>
            <div>
              <FilterBox gtmPrefix={GTM.feed.prefix} />
            </div>
            <Posts
              isAuthenticated={isAuthenticated}
              filteredPosts={postsList}
              handlePostLike={handlePostLike}
              postDelete={postDelete}
              user={user}
              deleteModalVisibility={deleteModalVisibility}
              handlePostDelete={handlePostDelete}
              handleCancelPostDelete={handleCancelPostDelete}
              isNextPageLoading={isLoading}
              loadNextPage={loadNextPage}
              itemCount={itemCount}
              isItemLoaded={isItemLoaded}
              hasNextPage={loadMore}
              totalPostCount={totalPostCount}
            />
            {status === ERROR_POSTS && (
              <ErrorAlert
                message={t([
                  `error.${postsError.message}`,
                  `error.http.${postsError.message}`,
                ])}
              />
            )}

            {emptyFeed() ? (
              <NoPosts>
                <Trans
                  i18nKey="feed.noResults"
                  components={[
                    <a
                      id={gtmTag(GTM.post.createPost)}
                      onClick={handleCreatePost}
                    />,
                  ]}
                />
              </NoPosts>
            ) : (
              <CreatePostIcon
                id={gtmTag(GTM.post.createPost)}
                src={creatPost}
                onClick={handleCreatePost}
                className="create-post"
              />
            )}
          </ContentWrapper>
        </LayoutWrapper>
        <CreatePost
          gtmPrefix={GTM.feed.prefix}
          onCancel={() => dispatchAction(TOGGLE_STATE, "showCreatePostModal")}
          loadPosts={refetchPosts}
          visible={showCreatePostModal}
          user={user}
        />
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

export default Feed;
