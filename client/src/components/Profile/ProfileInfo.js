import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import notionLogo from "../../assets/icons/notion-logo.svg";
import { WhiteSpace } from "antd-mobile";
import { getInitials } from "../../utils/userInfo";
import fakePosts from "../../assets/data/fakePosts"; // feed
import Posts from "../Feed/Posts"; // feed
// import FeedWrapper from "components/Feed/FeedWrapper"; //feed
import CreatePost from "../CreatePost/CreatePost";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import createPost from "../../assets/icons/create-post.svg"; // feed
import menu from "../../assets/icons/menu.svg";
import edit from "../../assets/icons/edit.svg";
import editEmpty from "../../assets/icons/edit-empty.svg";
import linkedinBlue from "../../assets/icons/social-linkedin-blue.svg";
import twitterBlue from "../../assets/icons/social-twitter-blue.svg";
import locationIcon from "../../assets/icons/location.svg";
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
} from "./ProfileComponents";

const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const needHelpInactive = require("assets/thermometer-unselected.svg");

const PictureContainer = styled.div`
  img {
    margin-right: 3rem;
  }
`;

const ProfleInfo = (props) => {
  const needHelp = true;
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  return (
    <UserInfoContainer>
      <EditIcon src={edit} onClick={() => setDrawer(true)} />
      <PictureContainer>
        <img src={notionLogo} alt="picture" />
      </PictureContainer>
      <UserInfoDesktop>
        <NameDiv>
          Notion
          <PlaceholderIcon />
          <EditEmptyIcon src={editEmpty} onClick={() => setDrawer(true)} />
        </NameDiv>
        <DescriptionDesktop>
          {" "}
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna{" "}
        </DescriptionDesktop>
        <LocationMobileDiv>contact@notion.com, California</LocationMobileDiv>
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
            {needHelp ? "I need help" : "I want to help"} • contact@notion.com,{" "}
            California
          </LocationDesktopDiv>
          <PlaceholderIcon />
          <LinkedinBlueIcon src={linkedinBlue} />
          <TwitterBlueIcon src={twitterBlue} />
        </IconsContainer>
      </UserInfoDesktop>
    </UserInfoContainer>
  );
};

export default ProfleInfo;
