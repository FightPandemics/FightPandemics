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

const SOCIAL_ALLOWED_CHARS = /^[a-zA-Z0-9\.]*$/;
const URLS_CONFIG = {
  facebook: ["Facebook URL", SOCIAL_ALLOWED_CHARS, "https://www.facebook.com/"],
  linkedin: [
    "LinkedIn URL",
    SOCIAL_ALLOWED_CHARS,
    "https://www.linkedin.com/in/",
  ],
  twitter: ["Twitter URL", SOCIAL_ALLOWED_CHARS, "https://twitter.com/"],
  github: ["Github URL", SOCIAL_ALLOWED_CHARS, "https://github.com/"],
  website: ["Personal Website"],
};

const ABOUT_MAX_LENGTH = 160;

function EditProfile() {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const { errors, register, handleSubmit } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;
  const { firstName = "", lastName = "", urls = {}, about } = user || {};

  const onSubmit = (data) => {
    // console.log(data);
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
              style={inputStyles}
              maxlength={ABOUT_MAX_LENGTH}
            />
            {Object.entries(URLS_CONFIG).map(
              ([key, [label, regex, prefix]]) => (
                <FormInput
                  type={prefix ? "text" : "url"}
                  inputTitle={label}
                  name={`urls.${key}`}
                  error={errors[`urls.${key}`]}
                  prefix={prefix}
                  defaultValue={urls[key]}
                  reference={register({
                    pattern: {
                      value: SOCIAL_ALLOWED_CHARS,
                      message:
                        "Invalid entry: only alphanumeric characters and . are allowed",
                    },
                  })}
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
