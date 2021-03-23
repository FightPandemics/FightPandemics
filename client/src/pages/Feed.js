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
import { mq } from "constants/theme";

// Antd
import { Menu } from "antd";
import { WhiteSpace } from "antd-mobile";
// Local
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "components/Alert/ErrorAlert";
import filterOptions from "assets/data/filterOptions";
import createPostSettings from "assets/data/createPostSettings";
import {
  FeedWrapper,
  SiderWrapper,
  FiltersWrapper,
  MenuWrapper,
  LayoutWrapper,
  ContentWrapper,
  HeaderWrapper,
  TabsWrapper,
  MobileSearchWrapper,
} from "components/Feed/FeedWrappers";
import { StyledCheckbox } from "components/Feed/StyledAccordion";
import FilterBox from "components/Feed/FilterBox";
import FiltersSidebar from "components/Feed/FiltersSidebar";
import FiltersList from "components/Feed/FiltersList";
import Posts from "components/Feed/Posts";
import { selectOrganisationId } from "reducers/session";
import { selectPosts, postsActions } from "reducers/posts";
import Users from "components/Feed/Users";
import FeedSearch from "components/Input/FeedSearch";
import { setQueryKeysValue } from "components/Feed/utils";
import CreatePostButton from "components/Feed/CreatePostButton";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";

import {
  optionsReducer,
  feedReducer,
  deletePostModalreducer,
  deletePostState,
} from "hooks/reducers/feedReducers";

// ICONS
import { CreatePostIcon } from "../components/Profile/ProfileComponents";
import creatPost from "assets/icons/create-post.svg";
import { ReactComponent as FiltersIcon } from "assets/icons/filters.svg";

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
import WithSummitBanner from "components/WithSummitBanner";
import SortSelector from "../components/Feed/SortSelector";
import useWindowDimensions from "../utils/windowSize";

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

export const FeedContext = React.createContext();

let HELP_TYPE = {
  ALL: "All posts",
  REQUEST: "Requesting help",
  OFFER: "Offering help",
};

const initialState = {
  showFilters: false,
  filterModal: false,
  showCreatePostModal: false,
  applyFilters: false,
  activePanel: null,
  location: null,
  ignoreUserLocation: true,
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

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const Feed = (props) => {
  const window = useWindowDimensions();
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
  const [sortValue, setSortValue] = useState("createdAt");
  const {
    filterModal,
    showCreatePostModal,
    activePanel,
    location,
    applyFilters,
    showFilters,
    ignoreUserLocation,
  } = feedState;
  const filters = Object.values(filterOptions);
  const workMode = Object.values(createPostSettings.workMode);
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

    // ignoreUserLocation
    if (query.near_me) {
      dispatchAction(SET_VALUE, "ignoreUserLocation", false);
    } else {
      dispatchAction(SET_VALUE, "ignoreUserLocation", true);
    }

    // location
    if (query.location) {
      query.location = JSON.parse(atob(query.location));
      dispatchAction(SET_VALUE, "location", query.location);
      sessionStorage.setItem("feedLocation", JSON.stringify(query.location));
    } else {
      dispatchAction(SET_VALUE, "location", "");
      sessionStorage.removeItem("feedLocation");
    }

    // filters / help type (objective)
    if (query.filters || query.objective) {
      let selectedFilters = {};
      if (query.filters) {
        if (!query.s_category) {
          query.filters = JSON.parse(atob(query.filters));
          selectedFilters = query.filters;
        } else delete query.filters;
      }
      if (query.objective) {
        let indexOfHelpType = Object.keys(HELP_TYPE).indexOf(
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

  //Sets query state for filters
  const setQueryFromState = () => {
    const newQuery = {};
    const oldFiltersLength =
      (queryParams.filters?.type || []).length +
      (queryParams.filters?.providers || []).length +
      (queryParams.filters?.workMode || []).length;
    const newFiltersLength =
      (selectedOptions?.type || []).length +
      (selectedOptions?.providers || []).length +
      (selectedOptions?.workMode || []).length;
    if (applyFilters && location) {
      newQuery.location = btoa(JSON.stringify(location));
    }
    if (applyFilters && selectedOptions.lookingFor?.length) {
      const selectedType =
        (selectedOptions["lookingFor"][1] ||
          selectedOptions["lookingFor"][0]) === "Request Help"
          ? "REQUEST"
          : "OFFER";
      newQuery.objective = selectedType;
      if (selectedOptions.lookingFor.length > 1) {
        optionsDispatch({
          type: REMOVE_OPTION,
          payload: {
            option: selectedOptions.lookingFor[0],
            label: "lookingFor",
          },
        });
        return;
      }
    }

    if (newFiltersLength) {
      if (applyFilters || oldFiltersLength > newFiltersLength) {
        newQuery.filters = btoa(JSON.stringify(selectedOptions));
      }
    } else if (queryParams.filters && !newFiltersLength)
      newQuery.filters = null;
    setQueryKeysValue(history, newQuery);
  };

  const handleFilterModal = () => {
    dispatchAction(TOGGLE_STATE, "filterModal");
    dispatchAction(SET_VALUE, "applyFilters", false);
  };

  const refetchPosts = (isLoading, loadMore, softRefresh = false) => {
    if (filterModal) {
      dispatchAction(TOGGLE_STATE, "filterModal");
    }

    if (showFilters) {
      dispatchAction(TOGGLE_STATE, "showFilters");
    }

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
    sessionStorage.removeItem("feedLocation");
    setQueryKeysValue(history, { location: null });

    setTimeout(() => {
      dispatchAction(SET_VALUE, "activePanel", null);
    }, 500);
    // perform soft refetch to only close filter modal etc.. but not actually refetch posts
    refetchPosts(null, null, true);
  };

  const toggleShowNearMe = (e) => {
    if (e.target.checked) {
      setQueryKeysValue(history, {
        s_keyword: null,
        s_category: null,
        location: null,
        near_me: e.target.checked,
      });
      setSortValue("proximity");
    } else {
      setQueryKeysValue(history, {
        near_me: e.target.checked,
      });
      setSortValue("createdAt");
    }
  };

  const changeHelpType = (selectedValue) => {
    switch (selectedValue) {
      case "INDIVIDUALS":
        HELP_TYPE = {
          ALL: "feed.allPeople",
        };
        break;
      case "ORGANISATIONS":
        HELP_TYPE = {
          ALL: "feed.allOrgs",
        };
        break;
      default:
        HELP_TYPE = {
          ALL: "feed.allPosts",
          REQUEST: "feed.request",
          OFFER: "feed.offer",
        };
        break;
    }
  };

  const handleLocation = (value) => {
    if (applyFilters) {
      dispatch(postsActions.resetPageAction({}));
    }
    if (!value && queryParams.location) {
      setQueryKeysValue(history, { location: null });
    }
    if (value) {
      setQueryKeysValue(history, {
        s_keyword: null,
        s_category: null,
        near_me: false,
      });
      dispatchAction(SET_VALUE, "location", value);
      setSortValue("proximity");
    } else {
      setSortValue("createdAt");
    }
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

  const handleCreatePost = (trigger) => {
    if (isAuthenticated) {
      dispatchAction(TOGGLE_STATE, "showCreatePostModal");
      sessionStorage.removeItem("createPostAttemptLoggedOut");
    } else {
      //prevent redirect if function was triggered by useEffect(on component mount)
      if (trigger === "useEffect") return;
      sessionStorage.setItem("createPostAttemptLoggedOut", "/feed");
      history.push(LOGIN);
    }
  };

  const handleChangeType = (e) => {
    const value = e.key;
    if (value && queryParams.objective?.toUpperCase() !== value) {
      setQueryKeysValue(history, {
        objective: e.key === "ALL" ? null : e.key,
      });
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
    dispatchAction(SET_VALUE, "applyFilters", false);
    const filterURL = () => {
      const filterObj = { ...(queryParams.filters || {}) };
      delete filterObj["lookingFor"];
      if (location) filterObj.location = location;
      return Object.keys(filterObj).length === 0
        ? ""
        : `&filter=${encodeURIComponent(JSON.stringify(filterObj))}`;
    };

    const objectiveURL = () => {
      let objective = queryParams.objective;
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
    const searchKeyword = queryParams.s_keyword;
    const sortQuery = () => {
      if (
        sortValue === "proximity-location" ||
        sortValue === "proximity-near"
      ) {
        return `&ignoreUserLocation=${ignoreUserLocation}`;
      } else if (sortValue === t("feed.filters.sortBy")) {
        return "";
      } else if (sortValue === "relevance") {
        if (searchKeyword)
          return `&keywords=${encodeURIComponent(searchKeyword)}`;
        else return "";
      } else {
        return `&sort=${sortValue}`;
      }
    };
    const limit = PAGINATION_LIMIT;
    const skip = page * limit;
    let baseURL = gePostsBasetUrl(organisationId, limit, skip);
    // ${searchURL()}&ignoreUserLocation=${ignoreUserLocation}
    switch (queryParams.s_category) {
      case "POSTS":
        break;
      case "INDIVIDUALS":
        baseURL = `/api/users?includeMeta=true&limit=${limit}&skip=${skip}`;
        break;
      case "ORGANISATIONS":
        baseURL = `/api/organisations/?includeMeta=true&limit=${limit}&skip=${skip}`;
        break;
      default:
        break;
    }
    let endpoint = `${baseURL}${objectiveURL()}${filterURL()}${sortQuery()}`;
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
        // clear the DataLayer
        TagManager.dataLayer({
          dataLayer: {
            event: -1,
            keyword: -1,
            category: -1,
            resultsCount: -1,
          },
        });
      }
      if (posts.length && meta.total) {
        if (prevTotalPostCount !== meta.total) {
          setTotalPostCount(meta.total);
        }

        const lastPage = Math.ceil(meta.total / limit) - 1;
        if (page === lastPage) {
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
            dispatch(postsActions.finishLoadingAction());
          }
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

  // useEffect(() => {}, [ignoreUserLocation]);

  useEffect(() => {
    getStateFromQuery();
  }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setQueryFromState();
  }, [applyFilters, selectedOptions, location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof queryParams.s_keyword !== "undefined") {
      setQueryKeysValue(history, {
        location: null,
        near_me: false,
      });
      dispatchAction(SET_VALUE, "location", null);
      setSortValue("relevance");
    } else if (location) {
      if (ignoreUserLocation) {
        setQueryKeysValue(history, {
          near_me: false,
        });
      }
      setSortValue("proximity-location");
    } else if (!ignoreUserLocation) {
      if (location) {
        setQueryKeysValue(history, {
          location: null,
        });
        dispatchAction(SET_VALUE, "location", null);
      }
      setSortValue("proximity-near");
    } else if (
      sortValue !== "views" &&
      sortValue !== "shares" &&
      sortValue !== "likes"
    ) {
      setSortValue("createdAt");
    }
  }, [queryParams, ignoreUserLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [sortValue, queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

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
      handleCreatePost("useEffect");
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
  const handleSortDropdown = (value) => {
    setQueryKeysValue(history, {
      s_keyword: null,
      s_category: null,
      location: null,
      near_me: false,
    });
    setSortValue(value);
  };
  return (
    <WithSummitBanner>
      <FeedContext.Provider
        value={{
          isAuthenticated,
          filters,
          filterModal,
          activePanel,
          location,
          ignoreUserLocation,
          dispatchAction,
          selectedOptions,
          handleShowFilters,
          handleOption,
          handleFilterModal,
          handleQuit,
          handleLocation,
          handleOnClose,
          toggleShowNearMe,
          showFilters,
          totalPostCount,
          workMode,
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
                  {Object.keys(HELP_TYPE).map((item, index) => (
                    <Menu.Item key={item} id={gtmTag(gtmTagsMap[item])}>
                      {t(HELP_TYPE[item])}
                    </Menu.Item>
                  ))}
                  {isAuthenticated && (
                    <StyledCheckbox
                      checked={!ignoreUserLocation}
                      onChange={toggleShowNearMe}
                    >
                      {t("feed.filters.postsNearMe")}
                    </StyledCheckbox>
                  )}
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
              <FiltersSidebar
                locationOnly={
                  !(
                    !queryParams.s_category ||
                    queryParams.s_category === "POSTS"
                  )
                }
                gtmPrefix={GTM.feed.prefix}
              />
            </SiderWrapper>
            <ContentWrapper>
              <HeaderWrapper
                empty={emptyFeed()}
                style={{ justifyContent: "flex-end" }}
              >
                <TabsWrapper
                  options={SEARCH_OPTIONS}
                  showOptions={!!queryParams.s_keyword}
                  displayValue={"name"}
                  t={t}
                />
                {window.width <= parseInt(mq.phone.wide.maxWidth) ? null : (
                  <SortSelector
                    handleSortDropdown={handleSortDropdown}
                    ignoreUserLocation={ignoreUserLocation}
                    filterLocation={typeof queryParams.location !== "undefined"}
                    keywordUsed={typeof queryParams.s_keyword !== "undefined"}
                    sortValue={sortValue}
                  />
                )}
                {(!queryParams.s_category ||
                  queryParams.s_category === "POSTS") && (
                  <CreatePostButton
                    id={gtmTag(GTM.post.createPost)}
                    onClick={handleCreatePost}
                    inline={true}
                    icon={<PlusIcon />}
                  >
                    {t("post.create")}
                  </CreatePostButton>
                )}
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
              {
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FilterBox
                    locationOnly={
                      !(
                        !queryParams.s_category ||
                        queryParams.s_category === "POSTS"
                      )
                    }
                    gtmPrefix={GTM.feed.prefix}
                  />
                  {window.width <= parseInt(mq.phone.wide.maxWidth) ? (
                    <SortSelector
                      handleSortDropdown={handleSortDropdown}
                      ignoreUserLocation={ignoreUserLocation}
                      filterLocation={
                        typeof queryParams.location !== "undefined"
                      }
                      keywordUsed={typeof queryParams.s_keyword !== "undefined"}
                      sortValue={sortValue}
                    />
                  ) : null}
                </div>
              }
              <WhiteSpace size={"lg"} />
              {!queryParams.s_category || queryParams.s_category === "POSTS" ? (
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
              ) : (
                <Users
                  isAuthenticated={isAuthenticated}
                  filteredUsers={postsList}
                  user={user}
                  isNextPageLoading={isLoading}
                  loadNextPage={loadNextPage}
                  itemCount={itemCount}
                  isItemLoaded={isItemLoaded}
                  hasNextPage={loadMore}
                  totalUsersCount={totalPostCount}
                  highlightWords={queryParams.s_keyword}
                />
              )}
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
                    components={[
                      <a
                        id={gtmTag(GTM.post.createPost)}
                        onClick={handleCreatePost}
                      />,
                    ]}
                  />
                </NoPosts>
              ) : (
                (!queryParams.s_category ||
                  queryParams.s_category === "POSTS") && (
                  <CreatePostIcon
                    id={gtmTag(GTM.post.createPost)}
                    src={creatPost}
                    onClick={handleCreatePost}
                    className="create-post"
                  />
                )
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
    </WithSummitBanner>
  );
};

const gePostsBasetUrl = (organisationId, limit, skip) => {
  const actorId = organisationId ? `&actorId=${organisationId}` : "";
  return `/api/posts?&includeMeta=true&limit=${limit}&skip=${skip}${actorId}`;
};

export default Feed;
