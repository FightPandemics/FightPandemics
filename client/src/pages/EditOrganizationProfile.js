import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "components/Input/FormInput";
import { Link } from "react-router-dom";
import {
  FillEmptySpace,
  EditLayout,
  TitlePictureWrapper,
  CustomLink,
  CustomForm,
  CustomHeading,
  CustomSubmitButton,
  OptionDiv,
  FormLayout,
  Background,
  ProfilePicWrapper,
  MobilePicWrapper,
} from "../components/EditProfile/EditComponents";
import ProfilePic from "components/Picture/ProfilePic";
import { getInitials } from "utils/userInfo";
import { validateURL } from "utils/validators";
import {
  APPLESTORE_URL,
  PLAYSTORE_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from "constants/urls";
import {
  fetchOrganization,
  fetchOrganizationError,
  fetchOrganizationSuccess,
  updateOrganization,
  updateOrganizationError,
  updateOrganizationSuccess,
} from "hooks/actions/organizationActions";
import axios from "axios";
import {
  OrganizationContext,
  withOrganizationContext,
} from "context/OrganizationContext";

const URLS_CONFIG = {
  appleStore: [
    "Link to Apple Store",
    {
      pattern: {
        value: /^[a-zA-Z0-9.]*$/,
        message:
          "Invalid entry: only alphanumeric characters and . are allowed",
      },
      minLength: {
        value: 5,
        message: "Min. length is 5 characters",
      },
    },
    APPLESTORE_URL,
  ],
  playStore: [
    "Link to Google Play",
    {
      pattern: {
        value: /^[a-zA-Z0-9]*$/,
        message: "Invalid entry: only alphanumeric characters are allowed",
      },
    },
    PLAYSTORE_URL,
  ],
  twitter: [
    "Twitter URL",
    {
      pattern: {
        value: /^[a-zA-Z0-9_]*$/,
        message:
          "Invalid entry: only alphanumeric characters and _ are allowed",
      },
      maxLength: {
        value: 15,
        message: "Max. length is 15 characters",
      },
    },
    TWITTER_URL,
  ],
  linkedIn: [
    "LinkedIn URL",
    {
      pattern: {
        value: /^[a-zA-Z0-9_-]*$/,
        message:
          "Invalid entry: only alphanumeric characters and _ are allowed",
      },
    },
    LINKEDIN_URL,
  ],
  website: [
    "Personal Website",
    {
      validate: (str) => !str || validateURL(str) || "Invalid URL",
    },
  ],
};
const ABOUT_MAX_LENGTH = 160;

const editProfile = true;

function EditOrganizationProfile(props) {
  const organizationId = window.location.pathname.split("/")[2];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganizationContext,
  );
  const { register, handleSubmit, errors } = useForm();
  const { loading, organization } = orgProfileState;
  const { name, language, about, urls = {} } = organization || {};

  const onSubmit = async (formData) => {
    orgProfileDispatch(updateOrganization());
    try {
      const res = await axios.patch(
        `/api/organizations/${organizationId}`,
        formData,
      );
      orgProfileDispatch(updateOrganizationSuccess(res.data));
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      orgProfileDispatch(
        updateOrganizationError(
          `Failed updating organization profile, reason: ${message}`,
        ),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      orgProfileDispatch(fetchOrganization());
      try {
        const res = await axios.get(`/api/organizations/${organizationId}`);
        orgProfileDispatch(fetchOrganizationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        orgProfileDispatch(
          fetchOrganizationError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [orgProfileDispatch, organizationId]);

  const renderProfilePicture = () => {
    let firstName, lastName;
    if (organization) {
      const nameArr = name.split(" ");
      if (nameArr.length < 2) {
        firstName = nameArr[0];
        lastName = firstName.split("").pop();
      } else {
        firstName = nameArr[0];
        lastName = nameArr[1];
      }
      return (
        <ProfilePicWrapper>
          <ProfilePic
            resolution={"7680px"}
            noPic={true}
            initials={getInitials(firstName, lastName)}
          />
          {/* hide this until backend API is available
          <ChangePicButton>Change</ChangePicButton> */}
        </ProfilePicWrapper>
      );
    }
  };

  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            {editProfile
              ? "Edit Organization Profile"
              : "Complete Organization Profile"}
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>{renderProfilePicture()}</ProfilePicWrapper>

          <MobilePicWrapper>{renderProfilePicture()}</MobilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to={`/edit-organization-account/${organizationId}`}>
                Account Information
              </Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to={`/edit-organization-profile/${organizationId}`}>
                Profile Information
              </Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            <FormInput
              inputTitle="Organization Description"
              name="about"
              type="text"
              defaultValue={about}
              error={errors.about}
              ref={register({
                maxLength: {
                  value: ABOUT_MAX_LENGTH,
                  message: `Max. ${ABOUT_MAX_LENGTH} characters`,
                },
              })}
            />
            <FormInput
              inputTitle="Organization Language"
              name="language"
              type="text"
              defaultValue={language}
              error={errors.language}
              ref={register()}
            />
            {Object.entries(URLS_CONFIG).map(
              ([key, [label, validation, prefix]]) => (
                <FormInput
                  type={prefix ? "text" : "url"}
                  inputTitle={label}
                  name={`urls.${key}`}
                  error={errors.urls?.[key]}
                  prefix={prefix}
                  defaultValue={urls[key]}
                  ref={register(validation)}
                  key={key}
                />
              ),
            )}
            <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withOrganizationContext(EditOrganizationProfile);
