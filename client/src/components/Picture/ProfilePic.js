import React, { useState } from "react";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import "react-image-crop/dist/ReactCrop.css";
import { UserContext, withUserContext } from "context/UserContext";

const { colors } = theme;

const InitialDiv = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 0.2rem solid #425af2;
  color: #425af2;
  font-size: 3rem;
  line-height: 6rem;
  width: 7rem;
  text-align: center;
  font-weight: 500;
  background-color: ${(props) =>
    props.hasPhoto ? colors.royalBlue : `#f3f4fe`};
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
    <InitialDiv
      resolution={resolution}
      hasPhoto={user && user.photo ? true : false}
    >
      {user && user.photo ? (
        <img
          style={{
            maxWidth: "100%",
            borderRadius: "50%",
          }}
          src={user.photo}
        />
      ) : (
        initials
      )}
    </InitialDiv>
  );
};

export default withUserContext(ProfilePic);
