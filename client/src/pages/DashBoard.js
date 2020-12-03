import React, {
  useReducer,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

// Antd
import { Menu, Table, Tag } from "antd";

// Local
import filterOptions from "assets/data/filterOptions";
import {
  FeedWrapper,
  SiderWrapper,
  MenuWrapper,
  LayoutWrapper,
  ContentWrapper,
} from "components/Feed/FeedWrappers";
import Posts from "components/DashBoard/Posts";
import { selectPosts, postsActions } from "reducers/posts";
import { feedReducer } from "hooks/reducers/feedReducers";
import TextAvatar from "components/TextAvatar";

// ICONS
import { ReactComponent as BackIcon } from "assets/icons/back-black.svg";
// Constants
import { theme } from "constants/theme";
import { SET_VALUE } from "hooks/actions/feedActions";

export const FeedContext = React.createContext();

let REPORTS_TYPE = {
  PENDING: "Pending",
  ACCEPTED: "Removed Posts",
  REJECTED: "Kept Posts",
};

const initialState = {
  showFilters: false,
  applyFilters: false,
  activePanel: null,
  status: "PENDING",
  logs: [],
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
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const auditLogsColumns = [
  {
    title: "Moderator",
    dataIndex: "moderator",
    render: (user) => (
      <>
        <TextAvatar
          style={{ display: "inline-block" }}
          mobile={true}
          src={user.photo}
        >
          {user.name}
        </TextAvatar>{" "}
        {user.name}
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (action) => (
      <>
        <Tag color={action === "accept" ? "green" : "red"} key={action}>
          {action.toUpperCase()}
        </Tag>
      </>
    ),
  },
  {
    title: "Justification",
    dataIndex: "justification",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
  {
    title: "Post",
    dataIndex: "postId",
    render: (postId) => (
      <>
        <Link style={{ color: "blue" }} to={`post/${postId}`}>
          View Post
        </Link>
      </>
    ),
  },
];

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
  const {
    activePanel,
    location,
    applyFilters,
    showFilters,
    status,
    logs,
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

  const handleChangeType = (e) => {
    const value = e.key;
    dispatchAction(SET_VALUE, "status", value);
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

    /*
    const searchKeyword = s_keyword;
    const searchURL = () => {
      if (searchKeyword)
        return `&keywords=${encodeURIComponent(searchKeyword)}`;
      else return "";
    };
*/
    const limit = PAGINATION_LIMIT;
    const skip = page * limit;
    let baseURL = `/api/reports/posts?includeMeta=true&limit=${limit}&skip=${skip}`;
    let endpoint = `${baseURL}${statusURL()}`;
    dispatch(postsActions.fetchPostsBegin());
    console.log(status);
    console.log(logs);

    if (status !== "LOGS") {
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
    } else {
      // Audit log
      endpoint = `/api/reports/logs?limit=${limit}&skip=${skip}`;
      try {
        const {
          data: { logs: logs },
        } = await axios.get(endpoint);
        if (logs) {
          console.log(typeof logs);
          dispatchAction(SET_VALUE, "logs", logs);
          dispatch(postsActions.finishLoadingAction());
          console.log(logs);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (applyFilters) {
      loadPosts();
    }
  }, [toggleRefetch, page]); // eslint-disable-line react-hooks/exhaustive-deps

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
              >
                {Object.keys(REPORTS_TYPE).map((item, index) => (
                  <>
                    <StyledMenuItem key={item}>
                      {REPORTS_TYPE[item]}
                      <StyledForwardIcon />
                    </StyledMenuItem>
                  </>
                ))}
                <StyledMenuItem key={"LOGS"}>
                  Audit Logs
                  <StyledForwardIcon />
                </StyledMenuItem>
              </MenuWrapper>
            </>
          </SiderWrapper>
          <ContentWrapper>
            {status !== "LOGS" ? (
              <>
                <Posts
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
                  highlightWords={null /*queryParams.s_keyword*/}
                  page={page}
                />
                {emptyFeed() ? (
                  <NoPosts>
                    There are no "{REPORTS_TYPE[status]}" reports.
                  </NoPosts>
                ) : null}
              </>
            ) : (
              <Table dataSource={logs || []} columns={auditLogsColumns} />
            )}
          </ContentWrapper>
        </LayoutWrapper>
      </FeedWrapper>
    </FeedContext.Provider>
  );
};

export default Feed;
