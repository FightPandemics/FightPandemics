import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import GTM from "constants/gtm-tags";

const ProfileCompleted = ({ user }) => {
  const { t } = useTranslation();

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
        <Link to={`${PROFILE}/${user?.id || user?._id}`}>
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
            {t("profile.common.continuePosting")}
          </StyledButton>
        </Link>
      </ProfileCompletedButtonsWrapper>
    </ProfileCompletedWrapper>
  );
};

export default ProfileCompleted;
