import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from "axios";
import { Menu } from "antd";

import { SeeAllWrapper } from "components/Feed/FeedWrappers";

/* import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions"; */
/* import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
} from "hooks/actions /organisationActions";*/
import { UserContext, withUserContext } from "context/UserContext";
/* import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
 */
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
import { theme, mq } from "constants/theme";
import { WhiteSpace } from "antd-mobile";

const gtmTagsMap = {
  // ALL: GTM.post.allPost,
  REQUESTS: `${GTM.profile.requests}`,
  OFFERS: `${GTM.profile.offers}`,
};

const gtmTag = (tag) => GTM.profile.viewProfilePrefix + tag;

const TAB_TYPE = {
  POSTS: {
    REQUESTS: "Requests",
    OFFERS: "Offers",
  },
  // REQS_OFFRS: {
  //   ACTIVE: "Active",
  //   ARCHIVED: "Archived",
  //   DRAFTS: "Drafts",
  // },
  REQUESTS: {
    ACTIVE_REQS: "Active",
    ARCHIVED_REQS: "Archived",
    DRAFTS_REQS: "Drafts",
  },
  OFFERS: {
    ACTIVE_OFRS: "Active",
    ARCHIVED_OFRS: "Archived",
    DRAFTS_OFRS: "Drafts",
  },
};

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;
// const isMobile = true;
export const MenuWrapper = styled(Menu)`
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
  // const isMobile = window.screen.width <= parseInt(mq.phone.wide.maxWidth);
  if (isOrg) {
    orgId = pathUserId;
  }
  // console.log("In See All Component menuView - ", menuView);
  /* const { userProfileState, userProfileDispatch } = useContext(UserContext); */
  /* const { orgProfileState: organisation, orgProfileDispatch } = useContext(
    OrganisationContext,
  ); */
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
  //const { error, loading, user } = userProfileState;
  const {
    id: userId,
    about,
    firstName,
    lastName,
    location = {},
    needs = {},
    objectives = {},
    ownUser,
    urls = {},
    usesPassword = false,
    verified,
  } = user || {};
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
    /* if (menuView === "REQUESTS" || menuView === "OFFERS") {
      return "REQS_OFFRS";
    } */
    return menuView;
  };

  const viewType = getviewType();

  /* const defaultState = menuView === "POSTS" ? "REQUESTS" : "ACTIVE"; */
  const defaultState = useCallback(() => {
    if (menuView === "POSTS") return "REQUESTS";
    else if (menuView === "REQUESTS") return "ACTIVE_REQS";
    else return "ACTIVE_OFRS";
  });
  // console.log("menuView defaultState changed", menuView, defaultState);

  const [queryParams, setQueryParams] = useState(defaultState);
  console.log("queryParams", queryParams);

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
    console.log("calling handleTabChange queryParams", e.key, queryParams);
    setQueryParams(e.key);
    currentActiveTab = e.key;
    console.log(
      "calling after handleTabChange queryParams",
      e.key,
      currentActiveTab,
    );
    console.log("menuView - ", menuView, queryParams);
    console.log("viewType", viewType);
  };

  useEffect(() => {
    console.log("calling menuview", menuView);
    /* menuView === "POSTS" ? setQueryParams("REQUESTS") : setQueryParams("ACTIVE"); */
    setQueryParams(defaultState);
  }, [menuView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // console.log("Useeddfect");
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("in fetch posts useeffects", currentActiveTab);
    console.log("queryParams", queryParams);
    let _isMounted = false;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      try {
        // console.log("in fetch posts try userId", userId, isOrg, orgId);
        if (userId || (isOrg && orgId)) {
          console.log("In If");
          if (isOrg) {
            console.log("Is Org");
          }
          let baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${userId}${getActorQuery()}`;
          if (orgId) {
            baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${orgId}${getActorQuery()}`;
          }

          // console.log("queryParams", queryParams);
          const view =
            viewType !== "POSTS"
              ? lowerCase(menuView).slice(0, -1)
              : lowerCase(queryParams).slice(0, -1);

          const objURL = `&objective=${view}`;

          // console.log("TAB TYpe", viewType, view, queryParams);
          const mode =
            viewType !== "POSTS" &&
            /* lowerCase(queryParams) === lowerCase(TAB_TYPE[viewType].ARCHIVED_REQS) */
            lowerCase(queryParams).includes("archive")
              ? "IA"
              : "D";
          //console.log("mode",lowerCase(queryParams),lowerCase(TAB_TYPE[viewType].ARCHIVED),mode,);

          const modeURL = `&postMode=${mode}`;
          const endpoint = `${baseURL}${objURL}${modeURL}`;
          console.log("endpoint", endpoint);

          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);
          // console.log("Done");
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
          console.log("another error happened:" + error.message);
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
    console.log("In refetch Posts");
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
      <MenuWrapper
        defaultSelectedKeys={[defaultState]}
        selectedKeys={[queryParams || defaultState]}
        onClick={handleTabChange}
        mode="horizontal"
        isMobile={isMobile}
      >
        {Object.keys(TAB_TYPE[viewType]).map((item, index) => (
          <Menu.Item id={gtmTag(gtmTagsMap[item])} key={item}>
            {t(TAB_TYPE[viewType][item])}
          </Menu.Item>
        ))}
      </MenuWrapper>
      <WhiteSpace size={"lg"}></WhiteSpace>
      {/* <ContentWrapper> */}
      {/* <HeaderWrapper>Request/Offers</HeaderWrapper> */}
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
      {/* <Posts
                isAuthenticated={true}
                filteredPosts={postsList}
                
                postDispatch={dispatch}
                user={user}
                // postDelete={postDelete}
                //deleteModalVisibility={deleteModalVisibility}
                // handlePostDelete={handlePostDelete}
                // handleCancelPostDelete={handleCancelPostDelete} 
                isNextPageLoading={isLoading}
                loadNextPage={loadNextPage}
                itemCount={itemCount}
                isItemLoaded={isItemLoaded}
                hasNextPage={loadMore}
                totalPostCount={totalPostCount}
                // highlightWords={queryParams.s_keyword}
                page={page}
              /> */}
      {emptyFeed() && <>"No Posts matching your crieteria."</>}
    </SeeAllWrapper>
  );
};

export default SeeAll;
