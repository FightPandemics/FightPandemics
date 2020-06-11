import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
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
  ChangePicButton,
  CustomSubmitButton,
  OptionDiv,
  FormLayout,
  Background,
} from "components/EditProfile/EditComponents";
import { UserContext, withUserContext } from "context/UserContext";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import { getInitials } from "utils/userInfo";
import Input from "../components/Input/BaseInput";
import InputError from "../components/Input/InputError";
import { inputStyles } from "../constants/formStyles";

const URLS_CONFIG = {
  facebook: [
    "Facebook URL",
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
    "https://www.facebook.com/",
  ],
  linkedin: [
    "LinkedIn URL",
    {
      pattern: {
        value: /^[a-zA-Z0-9]*$/,
        message: "Invalid entry: only alphanumeric characters are allowed",
      },
    },
    "https://www.linkedin.com/in/",
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
    "https://twitter.com/",
  ],
  github: [
    "Github URL",
    {
      pattern: {
        value: /^[a-zA-Z0-9_-]*$/,
        message:
          "Invalid entry: only alphanumeric characters and _ are allowed",
      },
    },
    "https://github.com/",
  ],
  website: [
    "Personal Website",
    {
      pattern: {
        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
        message: "Invalid URL",
      },
    },
  ],
};
const ABOUT_MAX_LENGTH = 160;

function EditProfile() {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const { errors, register, handleSubmit } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;
  const { firstName = "", lastName = "", urls = {}, about } = user || {};

  const onSubmit = async (formData) => {
    console.log(formData);
    // make a put/patch request to backend to update users profile information
  };

  useEffect(() => {
    (async function fetchProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        userProfileDispatch(
          fetchUserError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [userProfileDispatch]);
  console.log({ errors });

  if (loading) return <div>"loading"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            Edit Profile
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePic
            resolution={"7680px"}
            noPic={true}
            initials={getInitials(firstName, lastName)}
          />
        </TitlePictureWrapper>
        <ChangePicButton>Change</ChangePicButton>
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to="/edit-account">Account Information</Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to="/edit-profile">Profile Information</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <FormInput
              inputTitle="Self-introduction"
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
              maxlength={ABOUT_MAX_LENGTH}
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
              Save Changes
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(EditProfile);
