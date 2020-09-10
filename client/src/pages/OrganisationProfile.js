import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import { ERROR_POSTS, SET_POSTS, FETCH_POSTS } from "hooks/actions/feedActions";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
  SET_LIKE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
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

  const { email, name, location = {}, about = "", isOwner, urls = {} } =
    organisation || {};

  const urlsAndEmail = { ...urls, email };

  const { deleteModalVisibility } = postsState;

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
  }, [orgProfileDispatch, organisationId, userProfileDispatch]);

  const fetchOrganisationPosts = async () => {
    postsDispatch({ type: FETCH_POSTS });
    try {
      const res = await axios.get(
        `/api/posts?ignoreUserLocation=true&limit=-1&authorId=${organisationId}`,
      );
      const loadedPosts =
        res?.data?.length &&
        res.data.reduce((obj, item) => {
          obj[item._id] = item;
          return obj;
        }, {});

      postsDispatch({
        type: SET_POSTS,
        posts: loadedPosts,
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      postsDispatch({
        type: ERROR_POSTS,
        error: `${t("error.failedLoadingActivity")} ${translatedErrorMessage}`,
      });
    }
  };

  useEffect(() => {
    fetchOrganisationPosts();
  }, [organisationId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

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
            ...postsState.posts,
          };
          delete allPosts[post._id];
          fetchOrganisationPosts();
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

  const renderProfileData = () => {
    if (!organisation) {
      return <p>Loading...</p>;
    } else {
      const { address } = location;
      return (
        <>
          <UserInfoContainer>
            {isOwner && (
              <EditIcon
                src={edit}
                id={GTM.organisation.orgPrefix + GTM.profile.modify}
                onClick={() => setDrawer(true)}
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
                    onClick={() => setDrawer(true)}
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
                    onClick={() => setModal(!modal)}
                  />
                </>
              )}
            </SectionHeader>
            <FeedWrapper>
              <Activity
                filteredPosts={postsState.posts}
                user={user}
                postDelete={postDelete}
                handlePostDelete={handlePostDelete}
                handleEditPost={handleEditPost}
                deleteModalVisibility={deleteModalVisibility}
                handleCancelPostDelete={handleCancelPostDelete}
                handlePostLike={handlePostLike}
              />
              {isOwner && (
                <CreatePost
                  gtmPrefix={GTM.organisation.orgPrefix}
                  onCancel={() => setModal(false)}
                  loadPosts={fetchOrganisationPosts}
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
              onClose={() => setDrawer(false)}
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
  if (loading) return <div>"loading"</div>;
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
