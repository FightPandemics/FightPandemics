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

import { ContentWrapper } from "components/Feed/FeedWrappers";

import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
} from "hooks/actions/organisationActions";
import { UserContext, withUserContext } from "context/UserContext";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";

import GTM from "constants/gtm-tags";
import { selectPosts, postsActions } from "reducers/posts";
import { selectOrganisationId, selectActorId } from "reducers/session";
import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import { lowerCase } from "lodash";
import { theme, mq } from "constants/theme";

const gtmTagsMap = {
  // ALL: GTM.post.allPost,
  REQUESTS: `${GTM.profile.requests}`,
  OFFERS: `${GTM.profile.offers}`,
};

const gtmTag = (tag) => GTM.profile.viewProfilePrefix + tag;

let TAB_TYPE = {
  POSTS: {
    REQUESTS: "Requests",
    OFFERS: "Offers",
  },
  REQS_OFFRS: {
    ACTIVE: "Active",
    ARCHIVED: "Archived",
    DRAFTS: "Drafts",
  },
};

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

export const MenuWrapper = styled(Menu)`
  line-height: 40px;
  width: 54rem;

  &.ant-menu {
    border-top: 0.2rem solid ${theme.colors.lightGray};
    border-bottom: 0.2rem solid ${theme.colors.lighterGray};

    li.ant-menu-item {
      height: 3rem;
      padding-bottom: 1rem;
      border-left: 0.5rem solid ${theme.colors.white};
      color: ${theme.colors.darkerGray};
      font-size: ${theme.typography.size.large};
      line-height: 21px;

      &:hover {
        color: ${theme.colors.darkerGray};
      }
    }

    &.ant-menu .ant-menu-item-selected {
      background-color: transparent;
      border-bottom: solid 0.2rem #282828;
      font-weight: bold;
    }
  }
`;

const SeeAll = ({
  isAuthenticated,
  isOrg,
  profileId: pathUserId,
  menuView,
}) => {
  const { t } = useTranslation();
  let orgId = "";
  const isMobile = window.screen.width <= parseInt(mq.phone.wide.maxWidth);
  if (isOrg) {
    orgId = pathUserId;
  }
  console.log("In See All Component", isMobile, pathUserId);
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const { orgProfileState: organisation, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const { error, loading, user } = userProfileState;
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

  const prevTotalPostCount = usePrevious(totalPostCount);
  const userPosts = Object.entries(postsList);
  const prevUserId = usePrevious(userId);
  const organisationId = useSelector(selectOrganisationId);
  const actorId = useSelector(selectActorId);
  const isSelf = actorId === userId;

  const getviewType = () => {
    if (menuView === "REQUESTS" || menuView === "OFFERS") {
      return "REQS_OFFRS";
    }
    return menuView;
  };

  const viewType = getviewType();

  let defaultState = menuView === "POSTS" ? "REQUESTS" : "ACTIVE";
  console.log("menuView defaultState changed", menuView, defaultState);

  let [queryParams, setQueryParams] = useState(defaultState);
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
    setQueryParams(e.key);
  };

  useEffect(() => {
    dispatch(postsActions.resetPageAction({}));
    if (!isOrg) {
      (async function fetchProfile() {
        userProfileDispatch(fetchUser());
        try {
          const res = await axios.get(`/api/users/${pathUserId}`);
          userProfileDispatch(fetchUserSuccess(res.data));
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          const translatedErrorMessage = t([
            `error.${message}`,
            `error.http.${message}`,
          ]);
          userProfileDispatch(
            fetchUserError(
              `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
            ),
          );
        }
      })();
    } else {
      (async function fetchOrgProfile() {
        orgProfileDispatch(fetchOrganisation());
        userProfileDispatch(fetchUser());
        try {
          const res = await axios.get(`/api/organisations/${orgId}`);
          orgProfileDispatch(fetchOrganisationSuccess(res.data));
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          const translatedErrorMessage = t([
            `error.${message}`,
            `error.http.${message}`,
          ]);
          orgProfileDispatch(
            fetchOrganisationError(
              `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
            ),
          );
        }
      })();
    }
  }, [pathUserId, orgId, userProfileDispatch, orgProfileDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("Useeddfect");
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("in fetch posts useeffects");
    const fetchPosts = async () => {
      console.log("in fetch posts");
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      try {
        console.log("in fetch posts try userId", userId, isOrg, orgId);
        if (userId || (isOrg && orgId)) {
          console.log("In If");
          if (isOrg) {
            console.log("Is Org");
          }
          let baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${userId}${getActorQuery()}`;
          if (orgId) {
            baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${orgId}${getActorQuery()}`;
          }

          console.log("queryParams", queryParams, isMobile);
          const view =
            viewType !== "POSTS"
              ? lowerCase(menuView).slice(0, -1)
              : lowerCase(queryParams).slice(0, -1);

          let objURL = "";
          /* if(viewType === 'POSTS'){ */
          objURL = `&objective=${view}`;
          /*  } */

          console.log("TAB TYpe", viewType, view, TAB_TYPE[viewType].ACTIVE);
          const mode =
            viewType !== "POSTS" &&
            lowerCase(queryParams) === lowerCase(TAB_TYPE[viewType].ARCHIVED)
              ? "IA"
              : "D";
          console.log(
            "mode",
            lowerCase(queryParams),
            lowerCase(TAB_TYPE[viewType].ARCHIVED),
            mode,
          );
          const modeURL = `&postMode=${mode}`;
          const endpoint = `${baseURL}${objURL}${modeURL}`;
          console.log("endpoint", endpoint);

          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);

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
      } catch (error) {
        console.log("Error - ", error);
        dispatch(postsActions.fetchPostsError(error));
      }
    };
    fetchPosts();
  }, [userId, page, toggleRefetch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("is Mobile");
    refetchPosts();
  }, [isMobile, refetchPosts]);

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

  // useEffect(() => {
  //     getStateFromQuery();
  //   }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;

  return (
    <div>
      {/* // <LayoutWrapper> */}
      {/* <SiderWrapper
            breakpoint="md"
            className="site-layout-background"
            width="29rem"
            
          > */}
      <MenuWrapper
        defaultSelectedKeys={[defaultState]}
        selectedKeys={[queryParams || defaultState]}
        onClick={handleTabChange}
        mode="horizontal"
      >
        {Object.keys(TAB_TYPE[viewType]).map((item, index) => (
          <Menu.Item id={gtmTag(gtmTagsMap[item])} key={item}>
            {t(TAB_TYPE[viewType][item])}
          </Menu.Item>
        ))}
      </MenuWrapper>

      {/* </SiderWrapper> */}
      <ContentWrapper>
        {/* <FeedWrapper isProfile> */}
        {/* <HeaderWrapper>Request/Offers</HeaderWrapper> */}
        <Activity
          postDispatch={dispatch}
          filteredPosts={postsList}
          user={user}
          // postDelete={postDelete}
          // handlePostDelete={handlePostDelete}
          // handleEditPost={handleEditPost}
          // deleteModalVisibility={deleteModalVisibility}
          // handleCancelPostDelete={handleCancelPostDelete}
          loadNextPage={loadNextPage}
          isNextPageLoading={isLoading}
          itemCount={itemCount}
          isItemLoaded={isItemLoaded}
          hasNextPage={loadMore}
          totalPostCount={totalPostCount}
        />
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
        {emptyFeed() && <>"No Posts."</>}
        {isSelf && (
          <CreatePost
            // onCancel={onToggleCreatePostDrawer}
            // loadPosts={refetchPosts}
            // visible={modal}
            user={user}
            gtmPrefix={GTM.user.profilePrefix}
          />
        )}
        {/* </FeedWrapper> */}
      </ContentWrapper>
      {/* </LayoutWrapper> */}
    </div>
  );
};

export default SeeAll;
