import React from "react";
import { WhiteSpace } from "antd-mobile";
import { MenuOutlined } from "@ant-design/icons";

const linkedinIcon = require("../assets/icons/social-linkedin.svg");
const twitterIcon = require("../assets/icons/social-twitter.svg");
const offerHelpInactive = require("../assets/help-gesture-unselected.svg");
const needHelpInactive = require("../assets/thermometer-unselected.svg");
const firstName = "Cees";
const lastName = "Wang";
const email = "ceeswang@Test.com";
const location = "NY, USA";
const needHelp = true;

function getInitials(firstName, lastName) {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

export const Profile = () => {
  return (
    <div style={profile}>
      <div style={backgroundHeader}>
        <div style={{ textAlign: "right" }}>
          <MenuOutlined
            style={{
              color: "#FFFFFF",
              fontSize: "2rem",
              marginTop: "3rem",
              marginRight: "2rem",
            }}
          />
        </div>
      </div>
      <div style={userInfoStyle}>
        <div style={initialsStyle}>{getInitials(firstName, lastName)}</div>
        <div style={nameStyle}>{`${firstName + " " + lastName}`}</div>
        <div style={emailStyle}>{email}</div>
        <div style={locationStyle}>{location}</div>
        <div style={iconsContainer}>
          <div style={statusContainer}>
            <img
              style={statusImgStyle}
              src={needHelp ? needHelpInactive : offerHelpInactive}
            />
            <div style={statusTextStyle}>
              {needHelp ? "I need help" : "I want to help"}
            </div>
          </div>
          <div style={{ flex: "1" }}></div>
          <img style={iconStyle} src={linkedinIcon} />
          <img style={iconStyle} src={twitterIcon} />
        </div>
        <WhiteSpace />
        <div style={sections}>
          <section>
            <div style={title}>About</div>
            <WhiteSpace />
            <div style={about}>
              {" "}
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna.
            </div>
          </section>
          <WhiteSpace />
          <section>
            <div style={title}>My activity</div>
            <WhiteSpace />
          </section>
        </div>
      </div>
    </div>
  );
};

//styling

const wrapper = {
  height: "40vh",
};
const profile = {
  backgroundColor: "#F9F9F9",
  height: "100vh",
  width: "100vw",
  maxWidth: "100%",
  maxHeight: "100%",
  flexDirection: "row",
};

const backgroundHeader = {
  height: "23vh",
  left: "0",
  right: "0",
  backgroundColor: "#425AF2",
  borderBottomRightRadius: "30px",
  position: "absolute",
};

const userInfoStyle = {
  height: "30%",
  backgroundColor: "#FFFFFF",
  marginTop: "10vh",
  left: "0",
  right: "0",
  marginLeft: "2.5rem",
  marginRight: "2.5rem",
  borderRadius: "10px",
  position: "absolute",
  zIndex: "8",
  filter: "drop-shadow(#00000012 5px 0px 5px)",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
};

const title = {
  color: "#939393",
  fontWeight: "lighter",
};

const sections = {
  // width: '100vw',
};

const about = {
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
};

const initialsStyle = {
  marginTop: "3rem",
  marginBottom: "1rem",
  borderRadius: "50%",
  border: "0.2rem solid #425AF2",
  color: "#425AF2",
  fontSize: "3rem",
  lineHeight: "6rem",
  width: "6rem",
  textAlign: "center",
  backgroundColor: "rgba(66, 90, 245, 0.04)",
};

const nameStyle = {
  color: "#000000",
  fontSize: "1.5rem",
};

const emailStyle = {
  color: "#77869E",
  fontSize: "1rem",
};

const locationStyle = {
  color: "#5A6FF4",
  fontSize: "1.5rem",
};

const iconsContainer = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
};

const statusContainer = {
  alignSelf: "left",
  display: "flex",
  flexDirection: "column",
  width: "30%",
  border: "0.1rem solid #6C80FF",
  borderRadius: "0.2rem",
  textAlign: "center",
  alignItems: "center",
  marginLeft: "1rem",
  marginBottom: "1rem",
};

const statusImgStyle = {
  marginTop: "1rem",
  marginBottom: "0.5rem",
  width: "35%",
};

const statusTextStyle = {
  fontSize: "0.8rem",
};

const iconStyle = {
  alignSelf: "flex-end",
  width: "10%",
  marginRight: "1rem",
  marginBottom: "1rem",
};
