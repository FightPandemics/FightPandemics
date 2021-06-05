import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import ApplyButton, {
  ApplyButtonContainer,
} from "components/Positions/PositionsButton";
import ProfilePic from "components/Picture/ProfilePic";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
} from "hooks/actions/organisationActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getInitialsFromFullName } from "utils/userInfo";
import ErrorAlert from "../components/Alert/ErrorAlert";
import {
  PositionDescription,
  PositionsContainer,
  PositionTitle,
} from "../components/Profile/PositionsComponents";
import {
  AvatarPhotoContainer,
  DescriptionDesktop,
  NameDiv,
  NamePara,
  ProfileBackgroup,
  ProfileLayout,
  UserInfoContainer,
  UserInfoDesktop,
} from "../components/Profile/ProfileComponents";
import isEqual from "lodash/isEqual";

const Positions = () => {
  let url = window.location.pathname.split("/");
  const organisationId = url[url.length - 2];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { error, loading, organisation } = orgProfileState;
  const { userProfileDispatch } = useContext(UserContext);
  const { t } = useTranslation();
  const { name, location = {}, about = "" } = organisation || {};

  useEffect(() => {
    (async function fetchOrgProfile() {
      orgProfileDispatch(fetchOrganisation());
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        orgProfileDispatch(fetchOrganisationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        orgProfileDispatch(
          fetchOrganisationError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
    (async function fetchUserProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        userProfileDispatch(
          fetchUserError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
  }, [orgProfileDispatch, organisationId, userProfileDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;

  if (!organisation) {
    return <Loader />;
  } else {
    const { address } = location;

    return (
      // Header and class/component container for position info will be needed from new profile design to be consistent
      <>
        <ProfileBackgroup />
        <div>yooo</div>
        <ProfileLayout>
          <UserInfoContainer>
            <AvatarPhotoContainer>
              <ProfilePic
                user={organisation}
                initials={getInitialsFromFullName(name)}
              />
            </AvatarPhotoContainer>
            <UserInfoDesktop>
              <NameDiv>
                <div className="name-container">
                  <NamePara>{name}</NamePara>
                  {address && (
                    <div title={address} className="address-container">
                      <img src={locationIcon} alt={address} />
                      {address}
                    </div>
                  )}
                </div>
              </NameDiv>
              {about && <DescriptionDesktop> {about} </DescriptionDesktop>}

              {/* <IconsContainer>
                <div className="social-icons">{renderURL()}</div>
              </IconsContainer> */}
            </UserInfoDesktop>
          </UserInfoContainer>
          {
            // Position title and description to be pulled from backend / API
            // Placeholder text for ONE position is being used below
            // Component will be needed for multiple positions (based on backend schema / structure)
          }
          <PositionsContainer>
            <PositionTitle>Volunteer Position</PositionTitle>
            <PositionDescription>
              <p>
                We are now accepting volunteers who are as excited as us about
                our cause.
                <br />
                <br />
                Feel free to submit your application and we will get back to you
                as soon as possible.
                <br />
                <br />
                Happy volunteering!
              </p>
            </PositionDescription>
            {
              //Button will connect applications page
            }
            <ApplyButtonContainer>
              <Link to={`/organisation/${organisationId}/apply`}>
                <ApplyButton>{t("positions.apply")}</ApplyButton>
              </Link>
            </ApplyButtonContainer>
          </PositionsContainer>
        </ProfileLayout>
      </>
    );
  }
};

export default withUserContext(withOrganisationContext(Positions));
