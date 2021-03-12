import { WhiteSpace } from "antd-mobile";
import { Menu } from "antd";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { theme, mq } from "constants/theme";

import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import {
  FeedWrapper,
  SeeAllTabsWrapper,
  SeeAllContentWrapper,
} from "components/Feed/FeedWrappers";
import ProfilePic from "components/Picture/ProfilePic";
import UploadPic from "../components/Picture/UploadPic";
import MessageModal from "../components/Feed/MessagesModal/MessageModal.js";
import CreatePostButton from "components/Feed/CreatePostButton";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";
import Verification from "components/Verification/";
import VerificationTick from "components/Verification/Tick";
import ProfileDesktop from "components/Profile/ProfileDesktop";
import { Tabs } from "antd";

import {
  ProfileLayout,
  ProfileBackgroup,
  UserInfoContainer,
  EditIcon,
  UserInfoDesktop,
  NameDiv,
  PlaceholderIcon,
  DescriptionDesktop,
  IconsContainer,
  HelpContainer,
  SocialIcon,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
  PhotoUploadButton,
  AvatarPhotoContainer,
  NamePara,
  MobileMenuWrapper,
  DesktopMenuWrapper,
} from "../components/Profile/ProfileComponents";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
} from "constants/urls";

import { selectPosts, postsActions } from "reducers/posts";

import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import { UserContext, withUserContext } from "context/UserContext";
import { getInitialsFromFullName } from "utils/userInfo";
import GTM from "constants/gtm-tags";
import Loader from "components/Feed/StyledLoader";
import { selectOrganisationId, selectActorId } from "reducers/session";

// ICONS
import createPost from "assets/icons/create-post.svg";
import edit from "assets/icons/edit.svg";
import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import githubIcon from "assets/icons/social-github.svg";
import websiteIcon from "assets/icons/website-icon.svg";

import locationIcon from "assets/icons/status-indicator.svg";
import useWindowDimensions from "../utils/windowSize";
import { lowerCase } from "lodash";

//delete post
import {
  deletePostModalreducer,
  deletePostState,
} from "hooks/reducers/feedReducers";
import {
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";

const URLS = {
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

const TAB_TYPE = {
  POSTS: {
    REQUESTS: "Requests",
    OFFERS: "Offers",
  },
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

const gtmTagsMap = {
  REQUESTS: `${GTM.profile.requests}`,
  OFFERS: `${GTM.profile.offers}`,
};

const gtmTag = (tag) => GTM.profile.viewProfilePrefix + tag;

const Profile = ({
  isAuthenticated,
  match: {
    params: { id: pathUserId },
  },
}) => {
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const { userProfileState, userProfileDispatch } = useContext(UserContext);

  const posts = useSelector(selectPosts);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { t } = useTranslation();

  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);

  const { error, loading, user } = userProfileState;
  const [sectionView, setSectionView] = useState(t("requests"));
  const [navMenu, setNavMenu] = useState([]);
  const [internalTab, setInternalTab] = useState("Requests");
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
  const needHelp = Object.values(needs).some((val) => val === true);
  const offerHelp = Object.values(objectives).some((val) => val === true);
  const { address } = location;
  const {
    isLoading,
    loadMore,
    page,
    posts: postsList,
    error: postsError,
  } = posts;

  if (ownUser) sessionStorage.removeItem("msgModal");
  const [deleteModal, deleteModalDispatch] = useReducer(
    deletePostModalreducer,
    deletePostState,
  );
  const { deleteModalVisibility } = deleteModal;

  const prevTotalPostCount = usePrevious(totalPostCount);
  const userPosts = Object.entries(postsList);
  const prevUserId = usePrevious(userId);
  const organisationId = useSelector(selectOrganisationId);

  const actorId = useSelector(selectActorId);
  const isSelf = actorId === userId;

  const isItemLoaded = useCallback((index) => !!userPosts[index], [userPosts]);

  const buildNavMenu = () => {
    if (typeof isSelf === "undefined") {
      return;
    }
    const baseMenu = [
      {
        name: t("profile.views.activity"),
        disabled: true,
        gtm: "activity",
      },
      {
        name: t("profile.views.organizations"),
        disabled: true,
        gtm: "organizations",
      },
      {
        name: t("profile.views.badges"),
        disabled: true,
        gtm: "badges",
      },
      {
        name: t("profile.views.thanks"),
        disabled: true,
        gtm: "thanks",
      },
    ];
    if (isSelf) {
      baseMenu.splice(1, 0, {
        name: t("profile.views.requests"),
        disabled: false,
        gtm: "requests",
      });
      baseMenu.splice(2, 0, {
        name: t("profile.views.offers"),
        disabled: false,
        gtm: "offers",
      });
      setSectionView(t("profile.views.requests"));
    } else {
      baseMenu.splice(1, 0, {
        name: t("profile.views.posts"),
        disable: false,
        gtm: "posts",
      });
      setSectionView(t("profile.views.posts"));
    }
    setNavMenu(baseMenu);
  };

  useEffect(() => {
    buildNavMenu();
  }, [isSelf]); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    let _isMounted = false;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      try {
        if (userId) {
          let baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${userId}${getActorQuery()}`;
          // const childTab = "Requests";
          const view =
            sectionView.toUpperCase() !== "POSTS"
              ? lowerCase(sectionView).slice(0, -1)
              : lowerCase(internalTab).slice(0, -1);

          const objURL = `&objective=${view}`;

          const mode =
            sectionView.toUpperCase() !== "POSTS" &&
            lowerCase(internalTab).includes("archive")
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

  useEffect(() => {
    dispatch(postsActions.resetPageAction({}));
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
  }, [pathUserId, userProfileDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
  }, [internalTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = (isLoading, loadMore) => {
    dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

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

  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;

  const handleMenuToggle = (e) => {
    setSectionView(e.key);
  };

  const setTab = (childTab) => {
    setInternalTab(childTab);
  };

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;

  return (
    <>
      <ProfileBackgroup />
      <ProfileLayout>
        <UserInfoContainer>
          <AvatarPhotoContainer>
            <ProfilePic
              user={user}
              initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
            />
            <PhotoUploadButton>
              {isSelf && (
                <UploadPic gtmPrefix={GTM.user.profilePrefix} user={user} />
              )}
            </PhotoUploadButton>
          </AvatarPhotoContainer>
          <UserInfoDesktop>
            <NameDiv>
              <div className="name-container">
                <NamePara>
                  {firstName} {lastName}
                  {verified && <VerificationTick />}
                </NamePara>
                {address && (
                  <div title={address} className="address-container">
                    <img src={locationIcon} alt={address} />
                    {address}
                  </div>
                )}
              </div>
              {isSelf && (
                <EditIcon
                  src={edit}
                  id={GTM.user.profilePrefix + GTM.profile.modify}
                  onClick={onToggleDrawer}
                />
              )}
              {!ownUser && (
                <MessageModal
                  isAuthenticated={isAuthenticated}
                  isFromUserCard={"USER"}
                  isFromProfile={true}
                  postAuthorName={`${firstName} ${lastName}`}
                  authorId={userId}
                />
              )}
            </NameDiv>
            {about && <DescriptionDesktop> {about} </DescriptionDesktop>}
            <IconsContainer>
              <HelpContainer>
                {needHelp && <div>{t("profile.individual.needHelp")}</div>}
                {offerHelp && <div> {t("profile.individual.wantHelp")}</div>}
              </HelpContainer>
              <div className="social-icons">
                {Object.entries(urls).map(([name, url]) => {
                  return (
                    url && (
                      <a
                        href={
                          name === "website"
                            ? getHref(url)
                            : `${URLS[name][1]}${url}`
                        }
                        key={name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon src={URLS[name][0]} />
                      </a>
                    )
                  );
                })}
              </div>
            </IconsContainer>
          </UserInfoDesktop>
        </UserInfoContainer>
        <WhiteSpace />
        {isSelf && !verified && (
          <Verification gtmPrefix={GTM.user.profilePrefix} />
        )}
        <WhiteSpace />
        <SectionHeader>
          <PlaceholderIcon />
          {isSelf && (
            <>
              <CreatePostIcon
                id={GTM.user.profilePrefix + GTM.post.createPost}
                src={createPost}
                onClick={onToggleCreatePostDrawer}
              />
              <CreatePostButton
                onClick={onToggleCreatePostDrawer}
                id={GTM.user.profilePrefix + GTM.post.createPost}
                inline={true}
                icon={<PlusIcon />}
              >
                {t("post.create")}
              </CreatePostButton>
            </>
          )}
        </SectionHeader>
        {isSelf && (
          <CreatePost
            onCancel={onToggleCreatePostDrawer}
            loadPosts={refetchPosts}
            visible={modal}
            user={user}
            gtmPrefix={GTM.user.profilePrefix}
          />
        )}
        <div>
          {window.width <= parseInt(mq.phone.wide.maxWidth) ? (
            <MobileMenuWrapper
              defaultSelectedKeys={[sectionView]}
              selectedKeys={sectionView}
              onClick={handleMenuToggle}
            >
              {navMenu.map((item, index) => (
                <Menu.Item
                  key={item.name}
                  disabled={item.disabled}
                  id={GTM.user.profilePrefix + GTM.profile[item.gtm]}
                >
                  {item.name}
                </Menu.Item>
              ))}
            </MobileMenuWrapper>
          ) : null}
          {window.width <= parseInt(mq.phone.wide.maxWidth) ? null : (
            <div style={{ display: "flex" }}>
              <DesktopMenuWrapper
                defaultSelectedKeys={[sectionView]}
                selectedKeys={sectionView}
                onClick={handleMenuToggle}
              >
                {navMenu.map((item, index) => (
                  <Menu.Item
                    key={item.name}
                    disabled={item.disabled}
                    id={GTM.user.profilePrefix + GTM.profile[item.gtm]}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              </DesktopMenuWrapper>

              {sectionView === "Requests" ||
              sectionView === "Offers" ||
              sectionView === "Posts" ? (
                <div style={{ width: "100%" }}>
                  <SeeAllTabsWrapper>
                    <SeeAllContentWrapper>
                      <FeedWrapper isProfile>
                        <WhiteSpace size={"xl"}></WhiteSpace>
                        <ProfileDesktop
                          setInternalTab={setTab}
                          // profileId={pathUserId}
                          isOrg={false}
                          isAuthenticated={isAuthenticated}
                          menuView={sectionView.toUpperCase()}
                          isMobile={false}
                          postDispatch={dispatch}
                          profilePost={postsList}
                          user={user}
                          postDelete={postDelete}
                          handlePostDelete={handlePostDelete}
                          // // handleEditPost={handleEditPost}
                          deleteModalVisibility={deleteModalVisibility}
                          handleCancelPostDelete={handleCancelPostDelete}
                          loadNextPage={loadNextPage}
                          isNextPageLoading={isLoading}
                          itemCount={itemCount}
                          isItemLoaded={isItemLoaded}
                          hasNextPage={loadMore}
                          totalPostCount={totalPostCount}
                          isProfile={true}
                        ></ProfileDesktop>
                      </FeedWrapper>
                    </SeeAllContentWrapper>
                  </SeeAllTabsWrapper>

                  {postsError && (
                    <ErrorAlert
                      message={t([
                        `error.${postsError.message}`,
                        `error.http.${postsError.message}`,
                      ])}
                    />
                  )}
                  {emptyFeed() && <>"No Posts to display."</>}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {isSelf && (
          <CustomDrawer
            placement="bottom"
            closable={false}
            onClose={onToggleDrawer}
            visible={drawer}
            height="auto"
            key="bottom"
          >
            <DrawerHeader>
              <Link to="/edit-account">
                {t("profile.individual.editAccount")}
              </Link>
            </DrawerHeader>
            <DrawerHeader>
              <Link to="/edit-profile">
                {t("profile.individual.editProfile")}{" "}
              </Link>
            </DrawerHeader>
            {usesPassword && (
              <DrawerHeader>
                <Link to="/edit-security">
                  {t("profile.individual.editSecurity")}{" "}
                </Link>
              </DrawerHeader>
            )}
            <DrawerHeader>
              <Link to="/edit-notifications">
                {t("profile.individual.editNotification")}{" "}
              </Link>
            </DrawerHeader>
          </CustomDrawer>
        )}
      </ProfileLayout>
    </>
  );
};

export default withUserContext(Profile);
