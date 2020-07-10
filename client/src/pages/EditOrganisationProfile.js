import React, { useContext, useEffect } from "react";
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
import { getInitialsFromFullName } from "utils/userInfo";
import { validateURL } from "utils/validators";
import {
  APPSTORE_URL,
  PLAYSTORE_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from "constants/urls";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
  updateOrganisation,
  updateOrganisationError,
  updateOrganisationSuccess,
} from "hooks/actions/organisationActions";
import axios from "axios";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";

const URLS_CONFIG = {
  appStore: [
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
    APPSTORE_URL,
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
  linkedin: [
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
    "Website",
    {
      validate: (str) => !str || validateURL(str) || "Invalid URL",
    },
  ],
};
const ABOUT_MAX_LENGTH = 160;

const editProfile = true;

function EditOrganisationProfile(props) {
  const organisationId = window.location.pathname.split("/")[2];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { register, handleSubmit, errors } = useForm();
  const { loading, organisation } = orgProfileState;
  const { name, language, about, urls = {} } = organisation || {};

  const onSubmit = async (formData) => {
    orgProfileDispatch(updateOrganisation());
    try {
      const res = await axios.patch(
        `/api/organisations/${organisationId}`,
        formData,
      );
      orgProfileDispatch(updateOrganisationSuccess(res.data));
      props.history.push(`/organisation/${res.data._id}`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      orgProfileDispatch(
        updateOrganisationError(
          `Failed updating organisation profile, reason: ${message}`,
        ),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      orgProfileDispatch(fetchOrganisation());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        orgProfileDispatch(fetchOrganisationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        orgProfileDispatch(
          fetchOrganisationError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [orgProfileDispatch, organisationId]);

  const renderProfilePicture = () => {
    if (organisation) {
      return (
        <ProfilePicWrapper>
          <ProfilePic
            resolution={"7680px"}
            noPic={true}
            initials={getInitialsFromFullName(name)}
          />
          {/* hide this until backend API is available
          <ChangePicButton>Change</ChangePicButton> */}
        </ProfilePicWrapper>
      );
    }
  };

  if (loading) return <div>"loading"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            {editProfile
              ? "Edit Organisation Profile"
              : "Complete Organisation Profile"}
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>{renderProfilePicture()}</ProfilePicWrapper>

          <MobilePicWrapper>{renderProfilePicture()}</MobilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to={`/edit-organisation-account/${organisationId}`}>
                Account Information
              </Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to={`/edit-organisation-profile/${organisationId}`}>
                Profile Information
              </Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            <FormInput
              inputTitle="Organisation Description"
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
              inputTitle="Organisation Language"
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

export default withOrganisationContext(EditOrganisationProfile);
