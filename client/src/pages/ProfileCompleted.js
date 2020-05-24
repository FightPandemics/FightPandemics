import React from "react";
import {
  ProfileCompletedButtonsWrapper,
  ProfileCompletedWrapper,
  ProfileCompletedHeadingWrapper,
  ProfileCompletedHeading,
  ProfileCompletedHeader,
  HeadingIcon,
  StyledButton,
} from "components/CompletedProfile/CompletedProfile";

const ProfileCompleted = () => {
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
        <StyledButton secondary={true}>View my Profile</StyledButton>
        <StyledButton secondary={true}>Continue posting</StyledButton>
      </ProfileCompletedButtonsWrapper>
    </ProfileCompletedWrapper>
  );
};

export default ProfileCompleted;
