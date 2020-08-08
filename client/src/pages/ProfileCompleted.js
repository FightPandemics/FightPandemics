import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FEED, PROFILE } from "../templates/RouteWithSubRoutes";
import { refetchUser } from "actions/authActions";

import {
  ProfileCompletedButtonsWrapper,
  ProfileCompletedWrapper,
  ProfileCompletedHeadingWrapper,
  ProfileCompletedHeading,
  ProfileCompletedHeader,
  HeadingIcon,
  StyledButton,
} from "components/CompletedProfile/CompletedProfile";
import GTM from "constants/gtm-tags";
import { connect } from "react-redux";

const ProfileCompleted = ({ user, refetchUser }) => {
  const location = useLocation();
  useEffect(() => {
    refetchUser();
    // will only run once (on mount) to update navbar org list
  }, [refetchUser]);
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
        <Link
          to={
            location?.state?.orgId
              ? `organisation/${location.state.orgId}`
              : `${PROFILE}/${user?.id || user?._id}`
          }
        >
          <StyledButton
            tertiary={true}
            id={GTM.user.profilePrefix + GTM.profile.viewProfile}
          >
            View my Profile
          </StyledButton>
        </Link>
        <Link to={FEED}>
          <StyledButton
            tertiary={true}
            id={GTM.user.profilePrefix + GTM.profile.continuePosting}
          >
            {sessionStorage.getItem("createPostAttemptLoggedOut")
              ? "Continue posting"
              : "View Help Board"}
          </StyledButton>
        </Link>
      </ProfileCompletedButtonsWrapper>
    </ProfileCompletedWrapper>
  );
};

const mapDispatchToProps = {
  refetchUser,
};

export default connect(null, mapDispatchToProps)(ProfileCompleted);
