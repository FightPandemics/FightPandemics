import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

// ICONS
import createPost from "assets/icons/create-post.svg";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import facebookIcon from "assets/icons/social-facebook.svg";
import instagramIcon from "assets/icons/social-instagram-unfilled.svg";
import githubIcon from "assets/icons/social-github.svg";
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import playStoreIcon from "assets/icons/play-store-icon.svg";
import appStoreIcon from "assets/icons/app-store-icon.svg";

import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import FeedWrapper from "components/Feed/FeedWrapper";
import ProfilePic from "components/Picture/ProfilePic";
import Loader from "components/Feed/StyledLoader";
import {
  ProfileLayout,
  BackgroundHeader,
  MenuIcon,
  UserInfoContainer,
  EditIcon,
  UserInfoDesktop,
  NameDiv,
  PlaceholderIcon,
  EditEmptyIcon,
  DescriptionDesktop,
  LocationDesktopDiv,
  LocationMobileDiv,
  IconsContainer,
  LocationIcon,
  SocialIcon,
  DescriptionMobile,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
} from "../components/Profile/ProfileComponents";
import { isAuthorOrg, isAuthorUser } from "pages/Feed";
import { getInitialsFromFullName } from "utils/userInfo";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  GITHUB_URL,
  APPSTORE_URL,
  PLAYSTORE_URL,
} from "constants/urls";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
} from "hooks/actions/organisationActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
  SET_LIKE,
  SET_LOADING,
  NEXT_PAGE,
  RESET_PAGE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
  ERROR_POSTS,
  SET_POSTS,
  FETCH_POSTS,
} from "hooks/actions/feedActions";
import {
  postsReducer,
  postsState as initialPostsState,
} from "hooks/reducers/feedReducers";
import { UserContext, withUserContext } from "context/UserContext";
import GTM from "constants/gtm-tags";

const URLS = {
  playStore: [playStoreIcon, PLAYSTORE_URL],
  appStore: [appStoreIcon, APPSTORE_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
  email: [envelopeBlue],
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;
const OrganisationProfile = () => {
  let url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { error, loading, organisation } = orgProfileState;
  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState,
  );

  const {
    userProfileState: { user },
    userProfileDispatch,
  } = useContext(UserContext);

  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const { email, name, location = {}, about = "", isOwner, urls = {} } =
    organisation || {};

  const urlsAndEmail = { ...urls, email };

  const {
    isLoading,
    loadMore,
    page,
    posts: postsList,
    deleteModalVisibility,
    status,
    error: postsError,
  } = postsState;
  const prevTotalPostCount = usePrevious(totalPostCount);
  const prevOrgId = usePrevious(organisationId);
  const organisationPosts = Object.entries(postsList);
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  useEffect(() => {
    (async function fetchOrgProfile() {
      orgProfileDispatch(fetchOrganisation());
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
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
    (async function fetchUserProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
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
  }, [orgProfileDispatch, organisationId, t, userProfileDispatch]);

  useEffect(() => {
    const fetchOrganisationPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      postsDispatch({ type: FETCH_POSTS });
      try {
        if (organisationId) {
          const endpoint = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${organisationId}`;
          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);

          if (prevOrgId !== organisationId) {
            postsDispatch({
              type: SET_POSTS,
              posts: [],
            });
          }
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

            if (prevOrgId === organisationId && postsList) {
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
          } else if (prevOrgId === organisationId && posts) {
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
        }
      } catch (error) {
        postsDispatch({ error, type: ERROR_POSTS });
      }
    };
    fetchOrganisationPosts();
  }, [organisationId, page, toggleRefetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = (isLoading, loadMore) => {
    postsDispatch({
      type: RESET_PAGE,
      isLoading,
      loadMore,
    });
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

  const isItemLoaded = useCallback((index) => !!organisationPosts[index], [
    organisationPosts,
  ]);

  const loadNextPage = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoading &&
        loadMore &&
        stopIndex >= organisationPosts.length &&
        organisationPosts.length
      ) {
        return new Promise((resolve) => {
          postsDispatch({ type: NEXT_PAGE });
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [isLoading, loadMore, organisationPosts.length],
  );

  useEffect(() => {
    setItemCount(
      loadMore ? organisationPosts.length + 1 : organisationPosts.length,
    );
  }, [loadMore, organisationPosts.length]);

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;
    if (
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

  const handleEditPost = () => {
    if (postsState.editPostModalVisibility) {
      postsDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: false,
      });
    } else {
      postsDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: true,
      });
    }
  };

  const handlePostLike = async (postId, liked, create) => {
    sessionStorage.removeItem("likePost");

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
  };

  const renderURL = () => {
    if (organisation) {
      if (urlsAndEmail.length !== 0) {
        return Object.entries(urlsAndEmail).map(([name, url]) => {
          let href;
          if (name === "website") {
            href = getHref(url);
          } else if (name === "email") {
            href = `mailto:${url}`;
          } else {
            href = `${URLS[name][1]}${url}`;
          }

          return (
            url && (
              <a
                href={href}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon src={URLS[name][0]} alt={name} />
              </a>
            )
          );
        });
      } else {
        return;
      }
    }
  };

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;
  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);
  const renderProfileData = () => {
    if (!organisation) {
      return <Loader />;
    } else {
      const { address } = location;
      return (
        <>
          <UserInfoContainer>
            {isOwner && (
              <EditIcon
                src={edit}
                id={GTM.organisation.orgPrefix + GTM.profile.modify}
                onClick={onToggleDrawer}
              />
            )}
            <ProfilePic noPic={true} initials={getInitialsFromFullName(name)} />
            <UserInfoDesktop>
              <NameDiv>
                {name}
                <PlaceholderIcon />
                {isOwner && (
                  <EditEmptyIcon
                    src={editEmpty}
                    id={GTM.organisation.orgPrefix + GTM.profile.modify}
                    onClick={onToggleDrawer}
                  />
                )}
              </NameDiv>
              <DescriptionDesktop> {about} </DescriptionDesktop>
              <LocationMobileDiv>{address}</LocationMobileDiv>
              <IconsContainer>
                <LocationDesktopDiv>
                  <LocationIcon src={locationIcon} />
                  {address}
                </LocationDesktopDiv>
                <PlaceholderIcon />
                {renderURL()}
              </IconsContainer>
            </UserInfoDesktop>
          </UserInfoContainer>
          <WhiteSpace />
          <div style={{ margin: "0 2.5rem" }}>
            <WhiteSpace />
            <DescriptionMobile>
              <SectionHeader> {t("profile.org.about")}</SectionHeader>
              {about}
            </DescriptionMobile>
            <WhiteSpace />
            <SectionHeader>
              {t("profile.org.activity")}
              <PlaceholderIcon />
              {isOwner && (
                <>
                  <CreatePostDiv>{t("post.create")}</CreatePostDiv>
                  <CreatePostIcon
                    src={createPost}
                    id={GTM.organisation.orgPrefix + GTM.post.createPost}
                    onClick={onToggleCreatePostDrawer}
                  />
                </>
              )}
            </SectionHeader>
            <FeedWrapper>
              <Activity
                filteredPosts={postsList}
                user={user}
                postDelete={postDelete}
                handlePostDelete={handlePostDelete}
                handleEditPost={handleEditPost}
                deleteModalVisibility={deleteModalVisibility}
                handleCancelPostDelete={handleCancelPostDelete}
                handlePostLike={handlePostLike}
                loadNextPage={loadNextPage}
                isNextPageLoading={isLoading}
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
              {emptyFeed() && <></>}
              {isOwner && (
                <CreatePost
                  gtmPrefix={GTM.organisation.orgPrefix}
                  onCancel={onToggleCreatePostDrawer}
                  loadPosts={refetchPosts}
                  visible={modal}
                  user={user}
                />
              )}
            </FeedWrapper>
          </div>
          {isOwner && (
            <CustomDrawer
              placement="bottom"
              closable={false}
              onClose={onToggleDrawer}
              visible={drawer}
              height="150px"
              key="bottom"
            >
              <DrawerHeader>
                <Link to={`/edit-organisation-account/${organisationId}`}>
                  {t("profile.org.editAccount")}
                </Link>
              </DrawerHeader>
              <DrawerHeader>
                <Link to={`/edit-organisation-profile/${organisationId}`}>
                  {t("profile.individual.editProfile") + " "}
                </Link>
              </DrawerHeader>
            </CustomDrawer>
          )}
        </>
      );
    }
  };

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;
  return (
    <ProfileLayout>
      <BackgroundHeader>
        <MenuIcon src={menu} />
      </BackgroundHeader>
      {renderProfileData()}
      <WhiteSpace />
    </ProfileLayout>
  );
};

export default withUserContext(withOrganisationContext(OrganisationProfile));
