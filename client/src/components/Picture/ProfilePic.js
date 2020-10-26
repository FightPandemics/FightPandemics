import React from "react";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import "react-image-crop/dist/ReactCrop.css";

const colors = theme.colors;

const InitialDiv = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: ${(props) => (props.hasPhoto ? "none" : "0.2rem solid #425af2;")}
  color: #425af2;
  font-size: 3rem;
  line-height: 6rem;
  width: 7rem;
  text-align: center;
  font-weight: 500;
  background-color: #f3f4fe;
  @media screen and (min-width: ${(props) =>
    props.resolution ? props.resolution : mq.tablet.narrow.minWidth}) {
    margin: 0;
    height: 80%;
    line-height: ${(props) => (props.hasPhoto ? `10rem` : `11rem`)};
    width: ${(props) => (props.hasPhoto ? `12.2rem` : `12rem`)};
    margin-right: 3rem;
    font-size: 5rem;
  }
`;

const ProfilePic = ({ initials, resolution, user }) => {
  return (
    <InitialDiv resolution={resolution} hasPhoto={user && user.photo}>
      {user && user.photo ? (
        <img
          style={{
            maxWidth: "100%",
            borderRadius: "50%",
            boxSizing: "content-box",
          }}
          src={user.photo}
        />
      ) : (
        initials
      )}
    </InitialDiv>
  );
};

export default ProfilePic;

const InitialsContainer = styled.div`
  margin: auto;
  border-radius: 50%;
  border: 0.2rem solid #425af2;
  color: #425af2;
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: 500;
  background-color: #f3f4fe;
  font-size: 0.5vw;
`;

export const ProfilePhoto = ({ initials, user }) => {
  if (user && user.photo) {
    return (
      <img
        style={{
          maxWidth: "100%",
          borderRadius: "50%",
          boxSizing: "content-box",
        }}
        src={user.photo}
      />
    );
  }
  return <ProfileInitials initials={initials} />;
};

const ProfileInitials = ({ initials }) => (
  <InitialsContainer>{initials}</InitialsContainer>
);
