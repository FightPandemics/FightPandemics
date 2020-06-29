import React from "react";
import styled from "styled-components";
import notionLogo from "../../assets/icons/notion-logo.svg";

// ICONS
import edit from "../../assets/icons/edit.svg";
import editEmpty from "../../assets/icons/edit-empty.svg";
import linkedinBlue from "../../assets/icons/social-linkedin-blue.svg";
import twitterBlue from "../../assets/icons/social-twitter-blue.svg";
import locationIcon from "../../assets/icons/location.svg";
import {
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

  return (
    <UserInfoContainer>
      <EditIcon src={edit} />
      <PictureContainer>
        <img src={notionLogo} alt="organization logo" />
      </PictureContainer>
      <UserInfoDesktop>
        <NameDiv>
          Notion
          <PlaceholderIcon />
          <EditEmptyIcon src={editEmpty} />
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
