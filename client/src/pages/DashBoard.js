import React, {
  useReducer,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import styled from "styled-components";
import axios from "axios";
import qs from "query-string";

// Antd
import { Menu } from "antd";

// Local
import ErrorAlert from "components/Alert/ErrorAlert";
import filterOptions from "assets/data/filterOptions";
import {
  FeedWrapper,
  SiderWrapper,
  MenuWrapper,
  LayoutWrapper,
  ContentWrapper,
  HeaderWrapper,
  MobileSearchWrapper,
} from "components/DashBoard/FeedWrappers";
import FiltersSidebar from "components/DashBoard/FiltersSidebar";
import Posts from "components/DashBoard/Posts";
import { selectOrganisationId } from "reducers/session";
import { selectPosts, postsActions } from "reducers/posts";
import FeedSearch from "components/Input/FeedSearch";
import { setQueryKeysValue } from "components/DashBoard/utils";

import {
  optionsReducer,
  feedReducer,
  deletePostModalreducer,
  deletePostState,
} from "hooks/reducers/feedReducers";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import { ReactComponent as BackIcon } from "assets/icons/back-black.svg";
// Constants
import { theme } from "constants/theme";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  SET_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";
import { LOGIN } from "templates/RouteWithSubRoutes";
import GTM from "../constants/gtm-tags";
import TagManager from "react-gtm-module";

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
  OPEN: `_${GTM.requestHelp.prefix}`,
  CLOSED: `_${GTM.offerHelp.prefix}`,
};

const gtmTag = (tag) => GTM.feed.prefix + tag;

export const FeedContext = React.createContext();

let POST_TYPE = {
  ALL: "All Reports",
  OPEN: "Open",
  CLOSED: "Closed",
};

const initialState = {
  showFilters: false,
  filterModal: false,
  showCreatePostModal: false,
  applyFilters: false,
  activePanel: null,
  location: null,
};

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

const StyledSvg = styled(SvgIcon)`
  fill: ${theme.colors.royalBlue};
`;
const StyledForwardIcon = styled(BackIcon)`
  align-self: flex-end;
  transform: rotate(180deg);
`;

const StyledMenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
`;
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const Feed = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
    showCreatePostModal: id === "create-post",
  });
  const [deleteModal, deleteModalDispatch] = useReducer(
    deletePostModalreducer,
    deletePostState,
  );
  const organisationId = useSelector(selectOrganisationId);
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const posts = useSelector(selectPosts);
  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const {
    filterModal,
    showCreatePostModal,
    activePanel,
    location,
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
  } = posts;
  const { deleteModalVisibility } = deleteModal;
  const feedPosts = Object.entries(postsList);
  const prevTotalPostCount = usePrevious(totalPostCount);
  const [queryParams, setQueryParams] = useState({});
  const SEARCH_OPTIONS = [
    { name: "feed.search.options.posts", id: "POSTS", default: true },
    {
      name: "feed.search.options.orgs",
      id: "ORGANISATIONS",
      mobile_display: "feed.search.options.orgsShort",
    },
    { name: "feed.search.options.people", id: "INDIVIDUALS" },
  ];

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

  const getStateFromQuery = () => {
    const query = qs.parse(history.location.search);

    // search category (Tab)
    query.s_category = SEARCH_OPTIONS[query.s_category]?.id || null;
    changeHelpType(query.s_category);

    // filters / help type (objective)
    if (query.filters || query.objective) {
      let selectedFilters = {};

      if (query.objective) {
        let indexOfHelpType = Object.keys(POST_TYPE).indexOf(
          query.objective.toUpperCase(),
        );
        if (indexOfHelpType > 0)
          selectedFilters["lookingFor"] = [
            filters[3].options[indexOfHelpType - 1]?.value,
          ];
        else query.objective = "ALL";
      } else {
        delete selectedFilters["lookingFor"];
      }
      optionsDispatch({
        type: SET_OPTIONS,
        payload: { option: selectedFilters },
      });
    } else {
      optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
    }
    // will trigger => refetchPosts() =(if needed)> loadPosts()
    setQueryParams(query);
  };

  const setQueryFromState = () => {
    const newQuery = {};

    newQuery.filters = null;
    setQueryKeysValue(history, newQuery);
  };

  const refetchPosts = (isLoading, loadMore, softRefresh = false) => {
    // softRefresh = only close filter modal etc.. but not RESET_PAGE and refetch posts
    if (!softRefresh) {
      dispatchAction(SET_VALUE, "applyFilters", true);
      dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
      if (page === 0) {
        setToggleRefetch(!toggleRefetch);
      }
    }
  };

  const handleQuit = (e) => {
    e.preventDefault();
    optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
    dispatchAction(SET_VALUE, "location", null);
    setQueryKeysValue(history, { location: null });
    setTimeout(() => {
      dispatchAction(SET_VALUE, "activePanel", null);
    }, 500);
    // perform soft refetch to only close filter modal etc.. but not actually refetch posts
    refetchPosts(null, null, true);
  };

  const changeHelpType = (selectedValue) => {
    switch (selectedValue) {
      default:
        POST_TYPE = {
          ALL: "All Posts",
          OPEN: "Open",
          CLOSED: "Closed",
        };
        break;
    }
  };

  const handleLocation = (value) => {
    if (applyFilters) {
      dispatch(postsActions.resetPageAction({}));
    }
    dispatchAction(SET_VALUE, "location", value);
    if (!value && queryParams.location)
      setQueryKeysValue(history, { location: null });
  };

  const handleOption = (label, option) => (e) => {
    const options = selectedOptions[label] || [];
    const hasOption = options.includes(option);
    optionsDispatch({
      type: hasOption ? REMOVE_OPTION : ADD_OPTION,
      payload: { option, label },
    });
    if (hasOption && label === "lookingFor") {
      const selectedFilters = selectedOptions;
      delete selectedFilters["lookingFor"];
      setQueryKeysValue(history, {
        objective: null,
        filters: btoa(JSON.stringify(selectedFilters)),
      });
    }
  };

  const handleCreatePost = () => {
    if (isAuthenticated) {
      dispatchAction(TOGGLE_STATE, "showCreatePostModal");
      sessionStorage.removeItem("createPostAttemptLoggedOut");
    } else {
      sessionStorage.setItem("createPostAttemptLoggedOut", "/feed");
      history.push(LOGIN);
    }
  };

  const handleChangeType = (e) => {
    const value = e.key;
    if (queryParams.objective?.toUpperCase() !== value) {
      setQueryKeysValue(history, {
        objective: e.key === "ALL" ? null : e.key,
      });
    }
  };

  const handleOnClose = () => {
    dispatchAction(SET_VALUE, "filterModal", false);
    dispatchAction(TOGGLE_STATE, "showFilters");
    dispatchAction(SET_VALUE, "applyFilters", true);
  };

  const handlePostDelete = () => {
    deleteModalDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_POST,
    });
  };

  const handleCancelPostDelete = () => {
    deleteModalDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_HIDE,
    });
  };

  const loadPosts = async () => {
    if (!applyFilters) return;

    const objectiveURL = () => {
      let objective = queryParams.objective;
      switch (objective) {
        case "OPEN":
          return "&objective=incoming";
        case "CLOSED":
          return "&objective=archived";
        default:
          return "";
      }
    };
    const searchKeyword = queryParams.s_keyword;
    const searchURL = () => {
      if (searchKeyword)
        return `&keywords=${encodeURIComponent(searchKeyword)}`;
      else return "";
    };

    const limit = PAGINATION_LIMIT;
    const skip = page * limit;
    let baseURL = gePostsBasetUrl(organisationId, limit, skip);
    switch (queryParams.s_category) {
      case "POSTS":
        break;
      case "INDIVIDUALS":
        baseURL = `/api/users?includeMeta=true&limit=${limit}&skip=${skip}`;
        break;
      case "ORGANISATIONS":
        baseURL = `/api/organisations/search?includeMeta=true&limit=${limit}&skip=${skip}`;
        break;
      default:
        break;
    }
    let endpoint = `${baseURL}${objectiveURL()}${searchURL()}`;
    dispatch(postsActions.fetchPostsBegin());

    try {
      const {
        data: { data: posts, meta },
      } = await axios.get(endpoint);
      if (searchKeyword) {
        TagManager.dataLayer({
          dataLayer: {
            event: "SEARCH_KEYWORD",
            keyword: searchKeyword,
            category: queryParams.s_category || "POSTS",
            resultsCount: meta.total,
          },
        });
      }
      if (posts.length && meta.total) {
        if (prevTotalPostCount !== meta.total) {
          setTotalPostCount(meta.total);
        }
        if (posts.length < limit) {
          dispatch(postsActions.finishLoadingAction());
        } else if (meta.total === limit) {
          dispatch(postsActions.finishLoadingAction());
        }
        let postsInState;
        if (history.location.state) {
          const { keepPostsState, keepPageState } = history.location.state;
          postsInState = keepPostsState;
          if (keepPageState >= page) {
            dispatch(postsActions.setPageAction(keepPageState));
          }
        }
        if (postsInState) {
          if (Object.keys(postsInState).length === meta.total) {
            dispatch(
              postsActions.setLoadingAction({
                isLoading: true,
                loadMore: false,
              }),
            );
          }
        }
        const lastPage = Math.ceil(meta.total / limit) - 1;
        // console.log(page, lastPage, meta.total);
        if (page === lastPage) {
          dispatch(
            postsActions.setLoadingAction({
              isLoading: true,
              loadMore: false,
            }),
          );
        }
        const loadedPosts = posts.reduce((obj, item) => {
          obj[item._id] = item;
          return obj;
        }, {});
        if (postsInState) {
          dispatch(
            postsActions.fetchPostsSuccess({
              posts: { ...postsInState, ...loadedPosts },
            }),
          );
        } else if (Object.keys(postsList).length && page) {
          dispatch(
            postsActions.fetchPostsSuccess({
              posts: { ...postsList, ...loadedPosts },
            }),
          );
        } else {
          dispatch(
            postsActions.fetchPostsSuccess({
              posts: { ...loadedPosts },
            }),
          );
        }
      } else if (posts) {
        dispatch(
          postsActions.fetchPostsSuccess({
            posts: { ...postsList },
          }),
        );
        dispatch(postsActions.finishLoadingAction());
      } else {
        dispatch(postsActions.finishLoadingAction());
      }
    } catch (error) {
      dispatch(postsActions.fetchPostsError(error));
    }
  };

  useEffect(() => {
    getStateFromQuery();
  }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setQueryFromState();
  }, [applyFilters, selectedOptions, location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (applyFilters) {
      loadPosts();
    }
  }, [toggleRefetch, page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const createPostAttemptLoggedOut = sessionStorage.getItem(
      "createPostAttemptLoggedOut",
    );
    if (createPostAttemptLoggedOut) {
      handleCreatePost();
    }
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
          dispatch(postsActions.setNextPageAction());
          dispatchAction(SET_VALUE, "applyFilters", true);
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
        handleOption,
        handleQuit,
        handleLocation,
        handleOnClose,
        showFilters,
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
                selectedKeys={[queryParams.objective || "ALL"]}
                onClick={handleChangeType}
              >
                {Object.keys(POST_TYPE).map((item, index) => (
                  <>
                    <StyledMenuItem key={item} id={gtmTag(gtmTagsMap[item])}>
                      {POST_TYPE[item]}
                      <StyledForwardIcon />
                    </StyledMenuItem>
                  </>
                ))}
              </MenuWrapper>
            </>
            <FiltersSidebar
              locationOnly={
                !(!queryParams.s_category || queryParams.s_category === "POSTS")
              }
              gtmPrefix={GTM.feed.prefix}
            />
          </SiderWrapper>
          <ContentWrapper>
            <HeaderWrapper empty={emptyFeed()}>
              {/*delete completely? */}
            </HeaderWrapper>
            <MobileSearchWrapper>
              <FeedSearch
                isMobile={true}
                options={SEARCH_OPTIONS}
                isObject={true}
                displayValue={"name"}
                placeholder={t("feed.search.placeholder")}
                t={t}
              />
            </MobileSearchWrapper>
            <Posts
              isAuthenticated={isAuthenticated}
              filteredPosts={postsList}
              postDelete={postDelete}
              postDispatch={dispatch}
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
              highlightWords={queryParams.s_keyword}
              page={page}
            />

            {emptyFeed() ? (
              <NoPosts>
                <Trans
                  i18nKey={
                    !queryParams.s_category ||
                    queryParams.s_category === "POSTS"
                      ? "feed.noResultsPosts"
                      : queryParams.s_category === "INDIVIDUALS"
                      ? "feed.noResultsPeople"
                      : "feed.noResultsOrgs"
                  }
                  components={[<a />]}
                />
              </NoPosts>
            ) : null}
          </ContentWrapper>
        </LayoutWrapper>
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

const gePostsBasetUrl = (organisationId, limit, skip) => {
  const actorId = organisationId ? `&actorId=${organisationId}` : "";
  return `/api/posts?&includeMeta=true&limit=${limit}&skip=${skip}${actorId}`;
};

export default Feed;
