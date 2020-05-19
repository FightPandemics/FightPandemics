import React, { useState } from "react";
import { connect } from "react-redux";
import { Popover, WhiteSpace } from "antd-mobile";

import ProfilePic from "components/Picture/ProfilePic";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";
import { theme, mq } from "constants/theme";

import styled from "styled-components";
import { getInitials } from "utils/userInfo";
import { Link } from "react-router-dom";
import fakePosts from "assets/data/fakePosts"; // feed
import Posts from "components/Feed/Posts"; // feed
import FeedWrapper from "components/Feed/FeedWrapper"; //feed
import ButtonModal from "components/Feed/ButtonModal"; // feed
import {
  DARK_GRAY,
  ROYAL_BLUE,
  TROPICAL_BLUE,
  LIGHTER_GRAY,
  LIGHT_GRAY,
  DARKER_GRAY,
} from "constants/colors";
// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import createPost from "assets/icons/create-post.svg"; // feed
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";
const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const needHelpInactive = require("assets/thermometer-unselected.svg");
const { colors, typography } = theme;
const SectionHeader = styled(Heading)`
  &.ant-typography {
    display: flex;
    align-items: center;
    color: #939393;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }
`;

const EditEmptyIcon = styled(SvgIcon)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    float: right;
    margin-right: 1.5rem;
    width: 2rem;
  }
`;
const CreatePostIcon = styled(SvgIcon)`
  position: fixed;
  z-index: 1;
  bottom: 5%;
  right: 5%;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    bottom: 0;
    right: 0;
    width: 4.2rem;
    position: initial;
  }
`;
const CreatePostDiv = styled.div`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    color: #000000;
    display: initial;
    margin-right: 1rem;
  }
`;
const LocationIcon = styled(SvgIcon)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    margin-right: 0.5rem;
  }
`;

const LinkedinBlueIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 2.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }
`;

const TwitterBlueIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: 0;
    width: 2.5rem;
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }
`;

const NameDiv = styled(TextLabel)`
  align-self: center;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    width: 100%;
    align-self: flex-start;
    &.ant-typography {
      font-size: 3rem;
      font-weight: bold;
    }
  }
`;
const LocationMobileDiv = styled(TextLabel)`
  align-self: center;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
const LocationDesktopDiv = styled(TextLabel)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    margin-top: 1rem;
    align-self: flex-start;
    &.ant-typography {
      color: ${DARK_GRAY};
    }
  }
`;
const EditIcon = styled(SvgIcon)`
  color: #425af2;
  align-self: flex-end;
  margin-right: 2rem;
  margin-top: 2rem;
`;
const MenuIcon = styled(SvgIcon)`
  color: #ffffff;
  margin-right: 2rem;
  margin-top: 3rem;
  float: right;
`;
const BackgroundHeader = styled.div`
  height: 23vh;
  left: 0;
  right: 0;
  background-color: #425af2;
  border-bottom-right-radius: 30px;
  position: relative;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
    margin-bottom: 100px;
  }
`;
const DescriptionMobile = styled.div`
  background-color: #ffffff;
  borderradius: 5px;
  width: 100%;
  font-size: 1.2rem;
  color: #939393;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
const ProfileLayout = styled.div`
  background-color: #f9f9f9;
  max-width: 100%;
  max-height: 100%;
  flex-direction: row;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: auto;
    padding: 0 10rem;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    justify-content: initial;
  }
`;
const HelpContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 0.1rem solid #6c80ff;
  border-radius: 0.2rem;
  text-align: center;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
    border: transparent;
    width: 100%;
    margin-left: 0;
  }
`;

const UserInfoContainer = styled.div`
  background-color: #ffffff;
  margin-top: -13vh;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  border-radius: 10px;
  z-index: 1;
  filter: drop-shadow(#00000012 5px 0px 5px);
  flex-direction: column;
  display: flex;
  align-items: center;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    z-index: 0;
    margin-top: 9vh;
    padding-top: 5rem;
    border-radius: 0;
    background-color: transparent;
    align-items: initial;
    flex-direction: row;
  }
`;

const PlaceholderIcon = styled.div`
  flex: 1;
`;

const HelpImage = styled.img`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 35%;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;
const UserInfoDesktop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 60%;
  }
`;

const DescriptionDesktop = styled.div`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    color: ${DARK_GRAY};
  }
`;

const Profile = (props) => {
  const { firstName, lastName, about, neighborhood, country } = props.user;
  const needHelp = true;
  const Item = Popover.Item;

  const [modal, setModal] = useState(false);
  const popover = (props) => {
    return (
      <Popover
        mask
        overlay={[
          <Item key="editAccountInfo" value="Edit Account Information">
            Edit Account Information
          </Item>,
          <Item
            key="editProfile"
            value="Edit Profile"
            style={{ whiteSpace: "nowrap" }}
          >
            Edit Profile
          </Item>,
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [0, 10],
        }}
        onSelect={(opt) =>
          opt.key === "editAccountInfo"
            ? props.history.push("/edit-account")
            : props.history.push("/edit-profile")
        }
      >
        <EditIcon src={edit} />
      </Popover>
    );
  };
  //requires responsive implementation
  const renderMyActivities = () => {
    return (
      <>
        <FeedWrapper>
          <Posts filteredPosts={fakePosts} />
          <ButtonModal
            onClose={() => setModal(false)}
            maskClosable={true}
            closable={false}
            visible={modal}
            transparent
          >
            <h2 className="title">Continue Posting As</h2>
            <div className="links">
              <button className="primary">
                <Link to="/create-post">Individual</Link>
              </button>
              <button className="outline">
                <Link to="/create-post">Organization</Link>
              </button>
            </div>
          </ButtonModal>
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
        {/* {popover(props)} */}
        <ProfilePic noPic={true} initials={getInitials(firstName, lastName)} />
        <UserInfoDesktop>
          <NameDiv>
            {firstName} {lastName}
            <PlaceholderIcon />
            <EditEmptyIcon src={editEmpty} />
          </NameDiv>
          <DescriptionDesktop> {about} </DescriptionDesktop>
          <LocationMobileDiv color={DARK_GRAY}>
            {neighborhood}, {country}
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
              {needHelp ? "I need help" : "I want to help"} • {neighborhood},{" "}
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
      <WhiteSpace />
    </ProfileLayout>
  );
};

//styling

const iconStyle = {
  alignSelf: "flex-end",
  width: "3rem",
  marginRight: "1rem",
  marginBottom: "1rem",
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
