import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from "axios";
import { Menu } from "antd";

import { SeeAllWrapper } from "components/Feed/FeedWrappers";

import { ChildMenuWrapper } from "components/Profile/ProfileComponents";

import {
  deletePostModalreducer,
  deletePostState,
} from "hooks/reducers/feedReducers";
import GTM from "constants/gtm-tags";
import { selectPosts, postsActions } from "reducers/posts";
import {
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";

import { selectOrganisationId, selectActorId } from "reducers/session";
import Activity from "components/Profile/Activity";
import ErrorAlert from "components/Alert/ErrorAlert";
import { lowerCase } from "lodash";

import { WhiteSpace } from "antd-mobile";

const gtmTagsMap = {
  REQUESTS: `${GTM.profile.posts + GTM.profile.requests}`,
  OFFERS: `${GTM.profile.posts + GTM.profile.offers}`,
  ACTIVE_OFRS: `${GTM.profile.offers + GTM.profile.active}`,
  ACTIVE_REQS: `${GTM.profile.requests + GTM.profile.active}`,
  ARCHIVED_OFRS: `${GTM.profile.offers + GTM.profile.archived}`,
  ARCHIVED_REQS: `${GTM.profile.offers + GTM.profile.archived}`,
  DRAFTS_REQS: `${GTM.profile.requests + GTM.profile.draft}`,
  DRAFTS_OFRS: `${GTM.profile.offers + GTM.profile.draft}`,
};

const gtmTag = (tag) => GTM.user.profilePrefix + tag;

const TAB_TYPE = {
  POSTS: {
    REQUESTS: "requests",
    OFFERS: "offers",
  },
  REQUESTS: {
    ACTIVE_REQS: "active",
    ARCHIVED_REQS: "archived",
    DRAFTS_REQS: "drafts",
  },
  OFFERS: {
    ACTIVE_OFRS: "active",
    ARCHIVED_OFRS: "archived",
    DRAFTS_OFRS: "drafts",
  },
};

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

/* export const MenuWrapper = styled(Menu)`
  height: 4rem;
  margin: 0rem 1rem;
  display: flex;
  justify-content: space-between;

  &.ant-menu {
    ${({ isMobile }) =>
      isMobile
        ? `
      border-top: 0.2rem solid ${theme.colors.lightGray};
      width: 100%;
      border-bottom: 0.2rem solid ${theme.colors.lightGray};
  `
        : `border-bottom: 0.2rem solid ${theme.colors.darkGray};`}

    li.ant-menu-item {
      margin: 0.8rem 0;
      height: 3rem;
      padding-bottom: 0rem;

      color: ${theme.colors.darkerGray};
      font-size: ${theme.typography.size.large};
      line-height: 21px;
      width: 50%;
      &:hover {
        color: ${theme.colors.darkerGray};
      }
      text-align: center;
    }

    &.ant-menu .ant-menu-item-selected {
      background-color: transparent;
      border-bottom: 0.2rem solid ${theme.colors.black};
      font-weight: bold;
    }
  }
`;
 */
let currentActiveTab = "";

const SeeAll = ({
  isAuthenticated,
  isOrg,
  profileId: pathUserId,
  user,
  menuView,
  isMobile,
}) => {
  const { t } = useTranslation();
  let orgId = "";
  if (isOrg) {
    orgId = pathUserId;
  }

  const [deleteModal, deleteModalDispatch] = useReducer(
    deletePostModalreducer,
    deletePostState,
  );
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);

  const { id: userId } = user || {};
  const {
    error: postsError,
    isLoading,
    loadMore,
    page,
    posts: postsList,
  } = posts;
  const { deleteModalVisibility } = deleteModal;

  const prevTotalPostCount = usePrevious(totalPostCount);
  const userPosts = Object.entries(postsList);
  const prevUserId = usePrevious(userId);
  const organisationId = useSelector(selectOrganisationId);
  const actorId = useSelector(selectActorId);
  const isSelf = actorId === userId;

  const getviewType = () => {
    return menuView;
  };

  const viewType = getviewType();

  const defaultState = useCallback(() => {
    if (menuView === "POSTS") return "REQUESTS";
    else if (menuView === "REQUESTS") return "ACTIVE_REQS";
    else return "ACTIVE_OFRS";
  });

  const [childTab, setChildTab] = useState(defaultState);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const getActorQuery = () => {
    return organisationId ? `&actorId=${organisationId}` : "";
  };

  const handleTabChange = (e) => {
    setChildTab(e.key);
    currentActiveTab = e.key;
  };

  useEffect(() => {
    setChildTab(defaultState);
  }, [menuView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [childTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let _isMounted = false;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      try {
        if (userId || (isOrg && orgId)) {
          let baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${userId}${getActorQuery()}`;
          if (orgId) {
            baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${orgId}${getActorQuery()}`;
          }

          const view =
            viewType !== "POSTS"
              ? lowerCase(menuView).slice(0, -1)
              : lowerCase(childTab).slice(0, -1);

          const objURL = `&objective=${view}`;

          const mode =
            viewType !== "POSTS" && lowerCase(childTab).includes("archive")
              ? "IA"
              : "D";

          const modeURL = `&postMode=${mode}`;
          const endpoint = `${baseURL}${objURL}${modeURL}`;

          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);

          if (!_isMounted) {
            if (prevUserId !== userId) {
              dispatch(
                postsActions.fetchPostsSuccess({
                  posts: [],
                }),
              );
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
              const loadedPosts = posts.reduce((obj, item) => {
                obj[item._id] = item;
                return obj;
              }, {});

              if (prevUserId === userId && postsList) {
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
            } else if (prevUserId === userId && posts) {
              dispatch(
                postsActions.fetchPostsSuccess({
                  posts: { ...postsList },
                }),
              );
              dispatch(postsActions.finishLoadingAction());
            } else {
              dispatch(postsActions.finishLoadingAction());
            }
          }
        }
      } catch (error) {
        console.log("Error - ", error);
        dispatch(postsActions.fetchPostsError(error));
        if (axios.isCancel(error)) {
          console.log(`request cancelled:${error.message}`);
        } else {
          console.log("Error:" + error.message);
        }
      }
    };
    fetchPosts();
    return () => {
      _isMounted = true;
      source.cancel("Cancelling is cleanup");
    };
  }, [userId, page, toggleRefetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const isItemLoaded = useCallback((index) => !!userPosts[index], [userPosts]);

  const refetchPosts = useCallback((isLoading, loadMore) => {
    dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  });

  const loadNextPage = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoading &&
        loadMore &&
        stopIndex >= userPosts.length &&
        userPosts.length
      ) {
        return new Promise((resolve) => {
          dispatch(postsActions.setNextPageAction());
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [dispatch, isLoading, loadMore, userPosts.length],
  );

  useEffect(() => {
    setItemCount(loadMore ? userPosts.length + 1 : userPosts.length);
  }, [loadMore, userPosts.length]);

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;
    if (user && (user._id === post.author.id || user.id === post.author.id)) {
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          const allPosts = {
            ...postsList,
          };
          delete allPosts[post._id];
          setTotalPostCount(totalPostCount - 1);
          if (totalPostCount <= PAGINATION_LIMIT) {
            const isLoading = true;
            const loadMore = false;
            refetchPosts(isLoading, loadMore);
          } else {
            refetchPosts();
          }
        }
      } catch (error) {
        console.log({
          error,
        });
      }
    }
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

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;

  return (
    <SeeAllWrapper isMobile={isMobile}>
      <ChildMenuWrapper
        defaultSelectedKeys={[defaultState]}
        selectedKeys={[childTab || defaultState]}
        onClick={handleTabChange}
        mode="horizontal"
        isMobile={isMobile}
      >
        {Object.keys(TAB_TYPE[viewType]).map((item, index) => (
          <Menu.Item
            id={gtmTag(gtmTagsMap[item])}
            key={item}
            disabled={item.toLowerCase().includes("draft")}
          >
            {t(`profile.views.${TAB_TYPE[viewType][item]}`)}
          </Menu.Item>
        ))}
      </ChildMenuWrapper>
      <WhiteSpace size={"lg"}></WhiteSpace>
      <Activity
        postDispatch={dispatch}
        filteredPosts={postsList}
        user={user}
        postDelete={postDelete}
        handlePostDelete={handlePostDelete}
        // handleEditPost={handleEditPost}
        deleteModalVisibility={deleteModalVisibility}
        handleCancelPostDelete={handleCancelPostDelete}
        loadNextPage={loadNextPage}
        isNextPageLoading={isLoading}
        itemCount={itemCount}
        isItemLoaded={isItemLoaded}
        hasNextPage={loadMore}
        totalPostCount={totalPostCount}
      />
      {postsError && (
        <ErrorAlert
          message={t([
            `error.${postsError.message}`,
            `error.http.${postsError.message}`,
          ])}
        />
      )}
      {emptyFeed() && <>"No Posts matching your crieteria."</>}
    </SeeAllWrapper>
  );
};

export default SeeAll;
