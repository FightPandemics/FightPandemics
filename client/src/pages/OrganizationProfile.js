import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

// ICONS
import createPost from "assets/icons/create-post.svg";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import facebookIcon from "assets/icons/social-facebook.svg";
import githubIcon from "assets/icons/social-github.svg";
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
import { getInitials } from "utils/userInfo";
import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  GITHUB_URL,
} from "constants/urls";

const URLS = {
  github: [githubIcon, GITHUB_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  linkedin: [linkedinBlue, LINKEDIN_URL],
  twitter: [twitterBlue, TWITTER_URL],
  website: [smileIcon],
};

const organizationData = {
  needs: {
      donations: false,
      other: false,
      staff: false,
      volunteers: true
  },
  __t: "OrganizationUser",
  _id: "5ee40463c937e03e3075f346",
  name: "Blurtech",
  email: "help@gmail.com",
  global: true,
  type: "Company",
  industry: "Banking",
  location: {
      address: "Boulder, CO, USA",
      coordinates: [
          -105.2705456,
          40.0149856
      ],
      city: "Boulder",
      state: "CO",
      country: "US"
  },
  urls: {
    facebook: "www.facebook.com",
    github: "github.com",
    linkedin: "www.linkedin.com",
    twitter: "www.twitter.com",
    website: "www.blurtech.com",
  },
  ownerId: "5ee3978f0a06f52484c80b28",
  createdAt: "2020-06-12T22:40:35.573Z",
  updatedAt: "2020-06-12T22:40:35.573Z",
  __v: 0
}


const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

const OrganizationProfile = () => {

  // const { error, loading, user } = organizationData;
  const {
    name,
    email,
    location = {},
    needs,
    objectives = {},
    urls = {},
  } = organizationData || {};

  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);


  const needHelp = Object.values(needs).some((val) => val === true);
  const offerHelp = Object.values(objectives).some((val) => val === true);
  const { address } = location;


  // if (error) {
  //   return <ErrorAlert message={error} type="error" />;
  // }
  // if (loading) return <div>"loading"</div>;

  const renderURL = () => {
    if(urls.length !== 0) {
    return (
      Object.entries(urls).map(([name, url]) => {
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
      })
    )
  } else {
    return
  }
  }

  return (
    <ProfileLayout>
      <BackgroundHeader>
        <MenuIcon src={menu} />
      </BackgroundHeader>
      <UserInfoContainer>
        <EditIcon src={edit} onClick={() => setDrawer(true)} />
        <ProfilePic noPic={true} initials={getInitials(name, email)} />
        <UserInfoDesktop>
          <NameDiv>
            {name}
            <PlaceholderIcon />
            <EditEmptyIcon src={editEmpty} onClick={() => setDrawer(true)} />
          </NameDiv>
          <DescriptionDesktop> about here </DescriptionDesktop>
          <LocationMobileDiv>{address}</LocationMobileDiv>
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
            {renderURL()}
          </IconsContainer>
        </UserInfoDesktop>
      </UserInfoContainer>
      <WhiteSpace />
      <div style={{ margin: "0 2.5rem" }}>
        <WhiteSpace />
        <DescriptionMobile>
          <SectionHeader> About</SectionHeader>
          about here....
        </DescriptionMobile>
        <WhiteSpace />
        <SectionHeader>
          My Activity
          <PlaceholderIcon />
          <CreatePostDiv>Create a post</CreatePostDiv>
          <CreatePostIcon src={createPost} onClick={() => setModal(!modal)} />
        </SectionHeader>
        <FeedWrapper>
          <Activity filteredPosts="" />
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
          <Link to="/edit-organization-account">Edit Account Information</Link>
        </DrawerHeader>
        <DrawerHeader>
          <Link to="/edit-organization-profile">Edit Profile </Link>
        </DrawerHeader>
      </CustomDrawer>
      <WhiteSpace />
    </ProfileLayout>
  )
}

export default OrganizationProfile;
