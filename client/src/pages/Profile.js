import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePic from "components/Picture/ProfilePic";
import { WhiteSpace } from "antd-mobile";
import { getInitials } from "utils/userInfo";
import fakePosts from "assets/data/fakePosts"; // feed
import Posts from "components/Feed/Posts"; // feed
import FeedWrapper from "components/Feed/FeedWrapper"; //feed
import CreatePost from "components/CreatePost/CreatePost";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import createPost from "assets/icons/create-post.svg"; // feed
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";
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
  HelpImage,
  LocationIcon,
  LinkedinBlueIcon,
  TwitterBlueIcon,
  DescriptionMobile,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
} from "../components/Profile/ProfileComponents";

const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const needHelpInactive = require("assets/thermometer-unselected.svg");

const Profile = (props) => {
  const { firstName, lastName, about, address, country } = props.user;
  const needHelp = true;
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  //requires responsive implementation
  const renderMyActivities = () => {
    return (
      <>
        <FeedWrapper>
          <Posts filteredPosts={fakePosts} />
          <SvgIcon
            src={createPost}
            className="create-post"
            onClick={() => setModal(!modal)}
          />
          <CreatePost onCancel={() => setModal(false)} visible={modal} />
        </FeedWrapper>
      </>
    );
  };
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
            {address}, {country}
          </LocationMobileDiv>
          <IconsContainer>
            <HelpContainer>
              <HelpImage
                src={needHelp ? needHelpInactive : offerHelpInactive}
                alt="help-type-icon"
              />
              {needHelp ? "I need help" : "I want to help"}
            </HelpContainer>
            <LocationDesktopDiv>
              <LocationIcon src={locationIcon} />
              {needHelp ? "I need help" : "I want to help"} • {address},{" "}
              {country}
            </LocationDesktopDiv>
            <PlaceholderIcon />
            <LinkedinBlueIcon src={linkedinBlue} />
            <TwitterBlueIcon src={twitterBlue} />
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
          <CreatePostDiv>Create post</CreatePostDiv>
          <CreatePostIcon src={createPost} onClick={() => setModal(!modal)} />
        </SectionHeader>
        {renderMyActivities()}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
