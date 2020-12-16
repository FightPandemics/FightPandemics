import {
  ContentWrapper,
  FeedWrapper,
  LayoutWrapper,
  MenuWrapper,
  SiderWrapper,
} from "components/Feed/FeedWrappers";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { postsActions, selectPosts } from "reducers/posts";
import { useDispatch, useSelector } from "react-redux";

import AdminDashboard from "components/DashBoard/AdminDashboard";
import AuditLog from "components/DashBoard/AuditLog";
import Stats from "components/DashBoard/Stats";

// ICONS
import { ReactComponent as BackIcon } from "assets/icons/back-black.svg";
// Antd
import { Menu } from "antd";
import Posts from "components/DashBoard/Posts";
import { SET_VALUE } from "hooks/actions/feedActions";
import axios from "axios";
import qs from "query-string";
// Local
import filterOptions from "assets/data/filterOptions";
import styled from "styled-components";
import { feedReducer } from "hooks/reducers/feedReducers";
import { setQueryKeysValue } from "components/Feed/utils";
// Constants
import { theme, mq } from "constants/theme";
import { SCOPES } from "constants/permissions";

export const FeedContext = React.createContext();

let REPORTS_TYPE = {
  PENDING: "Pending",
  ACCEPTED: "Removed Posts",
  REJECTED: "Kept Posts",
};

let ADMIN_PANELS = {
  STATS: "Statistics",
  LOGS: "Audit Logs",
  MANAGE: "Manage Users",
};

const initialState = {
  showFilters: false,
  applyFilters: false,
  activePanel: null,
  status: "STATS",
  logs: [],
  users: [],
  stats: null,
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

const StyledForwardIcon = styled(BackIcon)`
  align-self: flex-end;
  transform: rotate(180deg);
`;

const StyledMenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  svg {
    path {
      fill: ${theme.colors.royalBlue};
    }
  }
`;

const DBoardContentWrapper = styled(ContentWrapper)`
    margin: 0 1rem;
    overflow-x: visible !important;
    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      margin: 3.3rem 37.5rem; 3.3rem 37.5rem;
    }
  `;

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const Feed = (props) => {
  const dispatch = useDispatch();
  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
  });
  const posts = useSelector(selectPosts);
  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const [totalLogsCount, setTotalLogsCount] = useState(0);
  const [queryParams, setQueryParams] = useState({});
  const {
    activePanel,
    location,
    applyFilters,
    showFilters,
    status,
    logs,
    stats,
    users,
  } = feedState;
  const filters = Object.values(filterOptions);
  const {
    error: postsError,
    isLoading,
    loadMore,
    page,
    posts: postsList,
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

  const getStateFromQuery = () => {
    const query = qs.parse(history.location.search);
    // tab (Tab)
    handleChangeType({ key: query.tab || "PENDING" });
    // will trigger => refetchPosts() =(if needed)> loadPosts()
    setQueryParams(query);
  };

  const setQueryFromState = () => {
    const newQuery = {};
    if (applyFilters) {
      newQuery.tab = status || null;
    }
    setQueryKeysValue(history, newQuery);
  };

  const handleChangeType = (e) => {
    const value = e.key ? e.key : e;
    dispatchAction(SET_VALUE, "status", value);
  };

  const setShowContent = (data) => {
    dispatch(postsActions.showContent({ postId: data.id }));
  };

  const loadPosts = async () => {
    if (!applyFilters) return;

    const statusURL = () => {
      switch (status) {
        case "PENDING":
          return "&status=flagged";
        case "ACCEPTED":
          return "&status=removed";
        case "REJECTED":
          return "&status=public";
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
    let baseURL = `/api/reports/posts?includeMeta=true&limit=${limit}&skip=${skip}`;
    let endpoint = `${baseURL}${statusURL()}${searchURL()}`;
    dispatch(postsActions.fetchPostsBegin());

    if (status === "STATS") {
      // Audit log
      endpoint = `/api/reports/stats`;
      try {
        const {
          data: { stats },
        } = await axios.get(endpoint);
        if (stats) {
          dispatchAction(SET_VALUE, "stats", stats);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (status === "LOGS") {
      // Audit log
      endpoint = `/api/reports/logs?limit=${limit}&skip=${skip}`;
      try {
        const {
          data: { logs, meta },
        } = await axios.get(endpoint);
        if (logs) {
          setTotalLogsCount(meta.total);
          dispatchAction(SET_VALUE, "logs", logs);
          dispatch(postsActions.finishLoadingAction());
        }
      } catch (error) {
        console.log(error);
      }
    } else if (status === "MANAGE") {
      // manage users
      endpoint = `/api/users/roles`;
      try {
        const {
          data: { users },
        } = await axios.get(endpoint);
        if (users) {
          dispatchAction(SET_VALUE, "users", users);
          dispatch(postsActions.finishLoadingAction());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const {
          data: { data: posts, meta },
        } = await axios.get(endpoint);
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
        dispatch(postsActions.finishLoadingAction());
      }
    }
  };

  useEffect(() => {
    getStateFromQuery();
  }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setQueryFromState();
  }, [applyFilters, status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (applyFilters) {
      loadPosts();
    }
  }, [toggleRefetch, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const isItemLoaded = useCallback((index) => !!feedPosts[index], [feedPosts]);

  const loadNextPage = useCallback(
    ({ stopIndex, loadLogsPage }) => {
      if (loadLogsPage !== undefined) {
        dispatch(postsActions.setPageAction(loadLogsPage));
        return Promise.resolve();
      }
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

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;

  return (
    <FeedContext.Provider
      value={{
        filters,
        activePanel,
        location,
        status,
        dispatchAction,
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
                defaultSelectedKeys={["PENDING"]}
                selectedKeys={[status || "PENDING"]}
                onClick={handleChangeType}
                isDashboard
              >
                {Object.keys(REPORTS_TYPE).map((item, index) => (
                  <>
                    <StyledMenuItem key={item}>
                      {REPORTS_TYPE[item]}
                      <StyledForwardIcon />
                    </StyledMenuItem>
                  </>
                ))}
                <div style={{ height: "calc(100% - 27rem)" }} />
                {user?.permissions & SCOPES.LOGS_READ && (
                  <StyledMenuItem key={"LOGS"}>
                    {ADMIN_PANELS["LOGS"]}
                    <StyledForwardIcon />
                  </StyledMenuItem>
                )}
                {user?.permissions & SCOPES.STATS_READ && (
                  <StyledMenuItem key={"STATS"}>
                    {ADMIN_PANELS["STATS"]}
                    <StyledForwardIcon />
                  </StyledMenuItem>
                )}
                {user?.permissions & SCOPES.MANAGE_USERS && (
                  <StyledMenuItem key={"MANAGE"}>
                    {ADMIN_PANELS["MANAGE"]}
                    <StyledForwardIcon />
                  </StyledMenuItem>
                )}
              </MenuWrapper>
            </>
          </SiderWrapper>
          <DBoardContentWrapper>
            {(() => {
              if (status === "LOGS")
                return (
                  <AuditLog
                    logs={logs}
                    pagination={{
                      current: page + 1,
                      pageSize: 10,
                      total: totalLogsCount,
                    }}
                    loadNextPage={loadNextPage}
                  />
                );
              else if (status === "MANAGE")
                return (
                  <AdminDashboard
                    users={users}
                    toggleRefetch={toggleRefetch}
                    setToggleRefetch={setToggleRefetch}
                  />
                );
              else if (status === "STATS") return <Stats stats={stats} />;
              else
                return (
                  <>
                    <Posts
                      setShowContent={setShowContent}
                      isAuthenticated={isAuthenticated}
                      filteredPosts={postsList}
                      postDispatch={dispatch}
                      user={user}
                      isNextPageLoading={isLoading}
                      loadNextPage={loadNextPage}
                      itemCount={itemCount}
                      isItemLoaded={isItemLoaded}
                      hasNextPage={loadMore}
                      totalPostCount={totalPostCount}
                      highlightWords={queryParams.s_keyword}
                      page={page}
                      changeType={handleChangeType}
                      activeTab={status}
                    />
                    {emptyFeed() ? (
                      <NoPosts>
                        There are no "{REPORTS_TYPE[status]}" reports.
                      </NoPosts>
                    ) : null}
                  </>
                );
            })()}
          </DBoardContentWrapper>
        </LayoutWrapper>
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

export default Feed;
