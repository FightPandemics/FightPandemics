import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
            {t("profile.common.thankyou")}
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
            {t("profile.common.viewMyProfile")}
          </StyledButton>
        </Link>
        <Link to={FEED}>
          <StyledButton
            tertiary={true}
            id={GTM.user.profilePrefix + GTM.profile.continuePosting}
          >
            {sessionStorage.getItem("createPostAttemptLoggedOut")
              ? t("profile.common.continuePosting")
              : t("profile.common.viewFeed")}
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
