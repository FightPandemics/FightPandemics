import React, { useState } from "react";
import { connect } from "react-redux";
import { Popover, WhiteSpace } from "antd-mobile";

import PostAs from "components/PostAs/PostAs";
import ProfilePic from "components/Picture/ProfilePic";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";
import { theme } from "constants/theme";

import styled from "styled-components";
import { getInitials } from "utils/userInfo";
import { Link } from "react-router-dom";
import fakePosts from "assets/data/fakePosts"; // feed
import Posts from "components/Feed/Posts"; // feed
import FeedWrapper from "components/Feed/FeedWrapper"; //feed

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import createPost from "assets/icons/create-post.svg"; // feed
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const needHelpInactive = require("assets/thermometer-unselected.svg");

const { darkGray, royalBlue, white, primary } = theme.colors;

const SectionHeader = (props) => (
  <Heading
    style={{
      color: `${darkGray}`,
      fontWeight: "lighter",
      fontSize: "1.5rem",
    }}
    {...props}
  />
);
const EditIcon = styled(SvgIcon)`
  color: ${royalBlue};
  align-self: flex-end;
  margin-right: 2rem;
  margin-top: 2rem;
`;
const MenuIcon = styled(SvgIcon)`
  color: ${white};
  margin-right: 2rem;
  margin-top: 3rem;
  float: right;
`;
const BackgroundHeader = styled.div`
  height: 23vh;
  left: 0;
  right: 0;
  background-color: ${royalBlue};
  border-bottom-right-radius: 30px;
  position: relative;import { Link } from "react-router-dom";
`;
const AboutDescription = styled.div`
  background-color: ${white};
  borderradius: 5px;
  width: 100%;
  font-size: 1.2rem;
  color: ${darkGray};
  padding: 0 2.5rem;
`;
const ProfileLayout = styled.div`
  background-color: #f9f9f9;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  flex-direction: row;
`;
const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const HelpContainer = styled.div`
  align-self: left;
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 0.1rem solid ${primary};
  border-radius: 0.2rem;
  text-align: center;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;
const PlaceholderIcon = styled.div`
  flex: 1;
`;

const SectionContainer = styled.div``;
const Profile = (props) => {
  const { firstName, lastName, about, email, location } = props.user;
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
        <div style={{ margin: "0 2.5rem" }}>
          <FeedWrapper>
            <Posts filteredPosts={fakePosts} />
            <SvgIcon
              src={createPost}
              className="create-post"
              onClick={() => setModal(!modal)}
            />
            <PostAs
              onClose={() => setModal(false)}
              maskClosable
              visible={modal}
            />
          </FeedWrapper>
        </div>
      </>
    );
  };

  return (
    <ProfileLayout>
      <BackgroundHeader>
        <MenuIcon src={menu} />
      </BackgroundHeader>
      <div style={userInfoStyle}>
        {popover(props)}
        <ProfilePic noPic={true} initials={getInitials(firstName, lastName)} />
        <TextLabel weight="500" block="true" size={theme.typography.size.large}>
          {firstName} {lastName}
        </TextLabel>
        <TextLabel
          block="true"
          color={darkGray}
          size={theme.typography.size.medium}
        >
          {email}
        </TextLabel>
        {location}
        <IconsContainer>
          <HelpContainer>
            <img
              style={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
                width: "35%",
              }}
              src={needHelp ? needHelpInactive : offerHelpInactive}
              alt="help-type-icon"
            />
            {needHelp ? "I need help" : "I want to help"}
          </HelpContainer>
          <PlaceholderIcon />
          <SvgIcon src={linkedinBlue} style={iconStyle} />
          <SvgIcon src={twitterBlue} style={iconStyle} />
        </IconsContainer>
      </div>
      <WhiteSpace />
      <SectionHeader title="About" />
      <WhiteSpace />
      <AboutDescription>{about}</AboutDescription>
      <WhiteSpace />
      <SectionHeader title="My Activity" marginTop="2rem" />
      <SectionContainer>{renderMyActivities()}</SectionContainer>

      <WhiteSpace />
    </ProfileLayout>
  );
};

//styling
const userInfoStyle = {
  backgroundColor: `${white}`,
  marginTop: "-13vh",
  left: "0",
  right: "0",
  marginLeft: "2.5rem",
  marginRight: "2.5rem",
  borderRadius: "10px",
  position: "relative",
  zIndex: "8",
  filter: "drop-shadow(#00000012 5px 0px 5px)",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
};

const iconStyle = {
  alignSelf: "flex-end",
  width: "10%",
  marginRight: "1rem",
  marginBottom: "1rem",
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
