import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ErrorAlert from "components/Alert/ErrorAlert";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
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
} from "components/EditProfile/EditComponents";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
} from "constants/urls";
import { UserContext, withUserContext } from "context/UserContext";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from "hooks/actions/userActions";
import { getInitialsFromFullName } from "utils/userInfo";
import { validateURL } from "utils/validators";

const ABOUT_MAX_LENGTH = 160;

function EditProfile(props) {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const { errors, formState, register, handleSubmit } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;
  const { t } = useTranslation();
  const { firstName, lastName, urls = {}, about } = user || {};

  const URLS_CONFIG = {
    facebook: [
      "Facebook URL",
      {
        pattern: {
          value: /^[a-zA-Z0-9.]*$/,
          message: t("profile.common.validCharacters", {
            characters: "A-z 0-9 .",
          }),
        },
        minLength: {
          value: 5,
          message: t("profile.common.minCharacters", { minNum: 5 }),
        },
      },
      FACEBOOK_URL,
    ],
    instagram: [
      "Instagram URL",
      {
        pattern: {
          value: /[a-z\d-_]{1,255}\s*$/,
          message: t("profile.common.validCharacters", {
            characters: "A-Z a-z 0-9 . _ -",
          }),
        },
      },
      INSTAGRAM_URL,
    ],
    linkedin: [
      "LinkedIn URL",
      {
        pattern: {
          value: /^[a-zA-Z0-9_\-/]*$/,
          message: t("profile.common.validCharacters", {
            characters: "A-Z a-z 0-9 -",
          }),
        },
      },
      LINKEDIN_INDIVIDUAL_URL,
    ],
    twitter: [
      "Twitter URL",
      {
        pattern: {
          value: /^[a-zA-Z0-9_]*$/,
          message: t("profile.common.validCharacters", {
            characters: "A-Z a-z 0-9 _",
          }),
        },
        maxLength: {
          value: 15,
          message: t("profile.common.maxCharacters", { maxNum: 15 }),
        },
      },
      TWITTER_URL,
    ],
    github: [
      "Github URL",
      {
        pattern: {
          value: /^[a-zA-Z0-9_-]*$/,
          message: t("profile.common.validCharacters", {
            characters: "A-Z a-z 0-9 _",
          }),
        },
      },
      GITHUB_URL,
    ],
    website: [
      "Personal Website",
      {
        validate: (str) =>
          !str || validateURL(str) || t("profile.common.invalidURL"),
      },
    ],
  };

  const onSubmit = async (formData) => {
    userProfileDispatch(updateUser());
    try {
      const res = await axios.patch("/api/users/current", formData);
      userProfileDispatch(updateUserSuccess(res.data));
      // TODO: consistently return _id or id or both
      props.history.push(`/profile/${res.data._id}`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      userProfileDispatch(
        updateUserError(
          `${t("error.failedUpdatingProfile")} ${translatedErrorMessage}`,
        ),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
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
  }, [userProfileDispatch]);

  if (loading) return <div>"{t("profile.common.loading")}"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            {t("profile.individual.editProfile")}
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePic
            resolution={"768rem"}
            allowUpload={false}
            user={user}
            initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
          />
        </TitlePictureWrapper>
        {/* hide this until backend API is available
        <ChangePicButton>Change</ChangePicButton> */}
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to="/edit-account">{t("profile.common.accountInfo")}</Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to="/edit-profile">{t("profile.common.profileInfo")}</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <FormInput
              inputTitle={t("profile.individual.intro")}
              name="about"
              type="text"
              defaultValue={about}
              error={errors.about}
              ref={register({
                maxLength: {
                  value: ABOUT_MAX_LENGTH,
                  message: t("profile.common.maxCharacters", {
                    maxNum: ABOUT_MAX_LENGTH,
                  }),
                },
              })}
            />
            {Object.entries(URLS_CONFIG).map(
              ([key, [label, validation, prefix]]) => (
                <FormInput
                  type={prefix ? "text" : "url"}
                  inputTitle={t("profile.common.urls." + key)}
                  name={`urls.${key}`}
                  error={errors.urls?.[key]}
                  prefix={prefix}
                  defaultValue={urls[key]}
                  ref={register(validation)}
                  key={key}
                />
              ),
            )}
            <CustomSubmitButton
              disabled={!formState.isValid}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              {t("profile.common.saveChanges")}
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(EditProfile);
