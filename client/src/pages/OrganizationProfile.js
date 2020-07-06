import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";

// ICONS
import createPost from "assets/icons/create-post.svg";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";
import smileIcon from "assets/icons/smile-icon.svg";

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
import { isAuthorOrg } from "pages/Feed";
import { getInitialsFromFullName } from "utils/userInfo";
import {
  LINKEDIN_URL,
  TWITTER_URL,
  APPLESTORE_URL,
  PLAYSTORE_URL,
} from "constants/urls";
import {
  fetchOrganization,
  fetchOrganizationError,
  fetchOrganizationSuccess,
} from "hooks/actions/organizationActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import {
  OrganizationContext,
  withOrganizationContext,
} from "context/OrganizationContext";
import { ERROR_POSTS, SET_POSTS, FETCH_POSTS } from "hooks/actions/feedActions";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
  postsReducer,
  postsState as initialPostsState,
} from "hooks/reducers/feedReducers";
import { UserContext, withUserContext } from "context/UserContext";

const URLS = {
  playStore: ["", PLAYSTORE_URL],
  appleStore: ["", APPLESTORE_URL],
  linkedin: [linkedinBlue, LINKEDIN_URL],
  twitter: [twitterBlue, TWITTER_URL],
  website: [smileIcon],
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

const OrganizationProfile = () => {
  let url = window.location.pathname.split("/");
  const organizationId = url[url.length - 1];

  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganizationContext,
  );
  const { error, loading, organization } = orgProfileState;
  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState,
  );

  const {
    userProfileState: { user },
    userProfileDispatch,
  } = useContext(UserContext);

  const { name, location = {}, about = "", isOwner, urls = {} } =
    organization || {};

  useEffect(() => {
    (async function fetchOrgProfile() {
      orgProfileDispatch(fetchOrganization());
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get(`/api/organizations/${organizationId}`);
        orgProfileDispatch(fetchOrganizationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        orgProfileDispatch(
          fetchOrganizationError(`Failed loading profile, reason: ${message}`),
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
        userProfileDispatch(
          fetchUserError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [orgProfileDispatch, organizationId, userProfileDispatch]);

  const fetchOrganizationPosts = async () => {
    postsDispatch({ type: FETCH_POSTS });
    try {
      const res = await axios.get(
        `/api/posts?limit=-1&authorId=${organizationId}`,
      );
      postsDispatch({
        type: SET_POSTS,
        posts: res.data,
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      postsDispatch({
        type: ERROR_POSTS,
        error: `Failed loading activity, reason: ${message}`,
      });
    }
  };

  useEffect(() => {
    fetchOrganizationPosts();
  }, [organizationId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;
    if (
      user &&
      (user._id === post.author.id ||
        user.id === post.author.id ||
        isAuthorOrg(user.organizations, post.author))
    ) {
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          const allPosts = {
            ...postsState.posts,
          };
          delete allPosts[post._id];
          fetchOrganizationPosts();
        }
      } catch (error) {
        console.log({
          error,
        });
      }
    }
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

  const renderURL = () => {
    if (organization) {
      if (urls.length !== 0) {
        return Object.entries(urls).map(([name, url]) => {
          return (
            url && (
              <a
                href={
                  name === "website" ? getHref(url) : `${URLS[name][1]}${url}`
                }
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon src={URLS[name][0]} />
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
    if (!organization) {
      return <p>Loading...</p>;
    } else {
      const { address } = location;
      return (
        <>
          <UserInfoContainer>
            {isOwner && <EditIcon src={edit} onClick={() => setDrawer(true)} />}
            <ProfilePic noPic={true} initials={getInitialsFromFullName(name)} />
            <UserInfoDesktop>
              <NameDiv>
                {name}
                <PlaceholderIcon />
                {isOwner && (
                  <EditEmptyIcon
                    src={editEmpty}
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
              <SectionHeader> About</SectionHeader>
              {about}
            </DescriptionMobile>
            <WhiteSpace />
            <SectionHeader>
              Activity
              <PlaceholderIcon />
              {isOwner && (
                <>
                  <CreatePostDiv>Create a post</CreatePostDiv>
                  <CreatePostIcon
                    src={createPost}
                    onClick={() => setModal(!modal)}
                  />
                </>
              )}
            </SectionHeader>
            <FeedWrapper>
              <Activity
                filteredPosts={postsState.posts}
                user={user}
                handlePostDelete={postDelete}
                handleEditPost={handleEditPost}
              />
              {isOwner && (
                <CreatePost
                  onCancel={() => setModal(false)}
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
                <Link to={`/edit-organization-account/${organizationId}`}>
                  Edit Account Information
                </Link>
              </DrawerHeader>
              <DrawerHeader>
                <Link to={`/edit-organization-profile/${organizationId}`}>
                  Edit Profile{" "}
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

export default withUserContext(withOrganizationContext(OrganizationProfile));
