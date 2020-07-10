import React from "react";
import { Link } from "react-router-dom";
import { FEED, PROFILE } from "../templates/RouteWithSubRoutes";

import {
  ProfileCompletedButtonsWrapper,
  ProfileCompletedWrapper,
  ProfileCompletedHeadingWrapper,
  ProfileCompletedHeading,
  ProfileCompletedHeader,
  HeadingIcon,
  StyledButton,
} from "components/CompletedProfile/CompletedProfile";

const ProfileCompleted = ({ user }) => {
  return (
    <ProfileCompletedWrapper>
      <ProfileCompletedHeader>
        <ProfileCompletedHeadingWrapper>
          <HeadingIcon />
          <ProfileCompletedHeading>
            Thank you for joining our community!
          </ProfileCompletedHeading>
        </ProfileCompletedHeadingWrapper>
      </ProfileCompletedHeader>
      <ProfileCompletedButtonsWrapper>
        {/* TODO: consistently return _id or id or both */}
        <Link to={`${PROFILE}/${user?.id || user?._id}`}>
          <StyledButton tertiary={true}>View my Profile</StyledButton>
        </Link>
        <Link to={FEED}>
          <StyledButton tertiary={true}>Continue posting</StyledButton>
        </Link>
      </ProfileCompletedButtonsWrapper>
    </ProfileCompletedWrapper>
  );
};

export default ProfileCompleted;
