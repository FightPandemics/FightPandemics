import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

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
  HelpContainer,
  LocationIcon,
  SocialIcon,
  DescriptionMobile,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
} from "../components/Profile/ProfileComponents";
import {
  postsReducer,
  postsState as initialPostsState,
} from "hooks/reducers/feedReducers";
import {
  ERROR_POSTS,
  FETCH_POSTS,
  SET_POSTS,
} from "../hooks/actions/feedActions";
import {
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
} from "hooks/actions/userActions";
import {
  userProfileReducer,
  initialProfileState,
} from "hooks/reducers/userReducers";
import { getInitials } from "utils/userInfo";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import createPost from "assets/icons/create-post.svg";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";

const socialIcons = {
  google: linkedinBlue,
  facebook: linkedinBlue,
  linkedin: linkedinBlue,
  twitter: twitterBlue,
  website: linkedinBlue,
};

const Profile = () => {
  const [userProfileState, userProfileDispatch] = useReducer(
    userProfileReducer,
    initialProfileState,
  );
  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState,
  );
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { error, loading, user } = userProfileState;
  const {
    id: userId,
    about,
    firstName = "",
    lastName = "",
    location = {},
    needs = {},
    objectives = {},
    urls = {},
  } = user || {};
  const needHelp = Object.values(needs).some((val) => val === true);
  const offerHelp = Object.values(objectives).some((val) => val === true);
  const { address, country } = location;

  useEffect(() => {
    (async function fetchProfile() {
      userProfileDispatch({ type: FETCH_USER });
      try {
        const res = await axios.get("/api/users/current");
        userProfileDispatch({
          type: FETCH_USER_SUCCESS,
          user: res.data,
        });
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        userProfileDispatch({
          type: FETCH_USER_ERROR,
          error: `Failed loading profile, reason: ${message}`,
        });
      }
    })();
  }, []);
  useEffect(() => {
    (async function fetchPosts() {
      postsDispatch({ type: FETCH_POSTS });
      try {
        const res = await axios.get(
          `/api/posts?limit=5&skip0=&userId=${userId}`,
        );
        postsDispatch({
          type: SET_POSTS,
          user: res.data,
        });
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        postsDispatch({
          type: ERROR_POSTS,
          error: `Failed loading activity, reason: ${message}`,
        });
      }
    })();
  }, [userId]);

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <div>"loading"</div>;
  return (
    <ProfileLayout>
      <BackgroundHeader>
        <MenuIcon src={menu} />
      </BackgroundHeader>
      <UserInfoContainer>
        <EditIcon src={edit} onClick={() => setDrawer(true)} />
        <ProfilePic noPic={true} initials={getInitials(firstName, lastName)} />
        <UserInfoDesktop>
          <NameDiv>
            {firstName} {lastName}
            <PlaceholderIcon />
            <EditEmptyIcon src={editEmpty} onClick={() => setDrawer(true)} />
          </NameDiv>
          <DescriptionDesktop> {about} </DescriptionDesktop>
          <LocationMobileDiv>
            {address}
          </LocationMobileDiv>
          <IconsContainer>
            <HelpContainer>
              {needHelp && "I need help "}
              {offerHelp && "I want to help"}
            </HelpContainer>
            <LocationDesktopDiv>
              <LocationIcon src={locationIcon} />
              {needHelp && "I need help "}
              {offerHelp && "I want to help "} • {address}
            </LocationDesktopDiv>
            <PlaceholderIcon />
            {Object.entries(urls).map(([name, url]) => (
              <a
                href={url}
                key="name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon src={socialIcons[name]} />
              </a>
            ))}
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
          My Activity
          <PlaceholderIcon />
          <CreatePostDiv>Create a post</CreatePostDiv>
          <CreatePostIcon src={createPost} onClick={() => setModal(!modal)} />
        </SectionHeader>
        <FeedWrapper>
          <Activity filteredPosts={postsState.posts} />
          <CreatePost onCancel={() => setModal(false)} visible={modal} />
        </FeedWrapper>
      </div>
      <CustomDrawer
        placement="bottom"
        closable={false}
        onClose={() => setDrawer(false)}
        visible={drawer}
        height="150px"
        key="bottom"
      >
        <DrawerHeader>
          <Link to="/edit-profile">Edit Account Information</Link>
        </DrawerHeader>
        <DrawerHeader>
          <Link to="/edit-profile">Edit Profile </Link>
        </DrawerHeader>
      </CustomDrawer>
      <WhiteSpace />
    </ProfileLayout>
  );
};

export default Profile;
