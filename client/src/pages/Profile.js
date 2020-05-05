import React, { useState } from "react";
import { connect } from "react-redux";
import { Popover, WhiteSpace } from "antd-mobile";
import ProfilePic from "../components/Picture/ProfilePic";
import Title from "../components/Title/Title";
import styled from "styled-components";
import { getInitials } from "../utils/userInfo";
import { Link } from "react-router-dom";
import fakePosts from "assets/data/fakePosts"; // feed
import Posts from "../components/Feed/Posts"; // feed
import FeedWrapper from "../components/Feed/FeedWrapper"; //feed
import ButtonModal from "../components/Feed/ButtonModal"; // feed

// ICONS
import SvgIcon from "../components/Icon/SvgIcon";
import menu from "~/assets/icons/menu.svg";
import edit from "~/assets/icons/edit.svg";
import createPost from "~/assets/icons/create-post.svg"; // feed
import linkedinBlue from "~/assets/icons/social-linkedin-blue.svg";
import twitterBlue from "~/assets/icons/social-twitter-blue.svg";
const offerHelpInactive = require("assets/help-gesture-unselected.svg");
const needHelpInactive = require("assets/thermometer-unselected.svg");

const SectionHeader = (props) => (
  <Title
    style={{
      color: "#939393",
      fontWeight: "lighter",
      fontSize: "1.5rem",
      textAlign: "left",
      marginLeft: "2.5rem",
      marginBottom: "1rem",
    }}
    {...props}
  />
);
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
  position: relative;import { Link } from "react-router-dom";
`;
const AboutDescription = styled.div`
  background-color: #ffffff;
  borderradius: 5px;
  width: 100%;
  font-size: 1.2rem;
  color: #939393;
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
  border: 0.1rem solid #6c80ff;
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
        <Title
          title={`${firstName + " " + lastName}`}
          style={{ color: "#000000", fontSize: "1.5rem" }}
        />
        <Title title={email} style={{ color: "#77869E", fontSize: "1rem" }} />
        <Title
          title={location}
          style={{ color: "#5A6FF4", fontSize: "1.5rem", marginBottom: "1rem" }}
        />
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
            <Title
              title={needHelp ? "I need help" : "I want to help"}
              style={{ fontSize: "0.8rem" }}
            />
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
  backgroundColor: "#FFFFFF",
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
