import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import StyledCheckbox from "components/Input/Checkbox";
import { getInitialsFromFullName } from "utils/userInfo";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
import { Link } from "react-router-dom";
import { validateEmail } from "utils/validators";

import {
  EditLayout,
  TitlePictureWrapper,
  FillEmptySpace,
  CustomLink,
  CustomForm,
  CustomHeading,
  CustomDeleteButton,
  OptionDiv,
  FormLayout,
  ToggleHeading,
  ProfilePicWrapper,
  CustomEditAccountHeader,
  Background,
} from "../components/EditProfile/EditComponents";
import { UserContext, withUserContext } from "../context/UserContext";
import ErrorAlert from "../components/Alert/ErrorAlert";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  deleteUser,
  deleteUserError,
  deleteUserSuccess,
} from "../hooks/actions/userActions";
import axios from "axios";
import styled from "styled-components";
import { stubTrue } from "lodash";

const Text = styled.p`
  margin: 2.2rem auto;
  max-width: 100%;
  position: relative;
  
`;
const Title = styled.h3`
  font-weight: bold;
  line-height: 3rem;
  color: red;
`;
function DeleteAccount(props) {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const [consent, setConsent] = useState("");
  const {
    clearError,
    control,
    errors,
    formState,
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;

  const { firstName, lastName, email } =
    user || {};

  const handleInputChangeConsent = (e) => {
    setConsent(e.target.checked);
  };

  const onSubmit = async (formData) => {
    if (!consent) {
      alert("You must agree that this action cannot be undone.");
      return;
    }
    if (formData.email != email) {
      alert("Email doesn't match");
      return;
    }
    userProfileDispatch(deleteUser());
    try {
      const res = await axios.delete("/api/users/");
      userProfileDispatch(deleteUserSuccess());
      props.history.push(`/auth/logout`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      userProfileDispatch(
        deleteUserError(`Failed deleting account, reason: ${message}`),
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
        userProfileDispatch(
          fetchUserError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [userProfileDispatch]);

  if (loading) return <div>"loading"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomEditAccountHeader className="h4">
            Edit Profile
          </CustomEditAccountHeader>
          <ToggleHeading>
            <CustomHeading level={4} className="h4">
              Delete Acount
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>
            <ProfilePic
              resolution={"7680px"}
              noPic={true}
              initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
            />
            {/* hide this until backend API is available
              <ChangePicButton>Change</ChangePicButton> */}
          </ProfilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to="/edit-account">Account Information</Link>
            </CustomLink>
            <CustomLink >
              <Link to="/edit-profile">Profile Information</Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to="/delete-account">Delete Account</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <Title>DISCLAIMER</Title>
            <Text>
              By deleting your account, all your data will be permanently deleted,
              If you change your mind, you might not be able to recover it.
              This includes your profile, organizations you own, comments, and posts.
            </Text>
            <FormInput
              inputTitle="Confirm Email"
              name="email"
              type="email"
              error={errors.email}
              ref={register({
                required: "Email is required.",
                validate: (email) =>
                  validateEmail(email) || "Invalid email",
                maxLength: {
                  value: 200,
                  message: `Max. 200 characters`,
                },
              })}
            />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              onChange={handleInputChangeConsent}
            >
              I understand that this action cannot be undone.
            </StyledCheckbox>
            <CustomDeleteButton
              disabled={!formState.isValid}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              Delete Account
            </CustomDeleteButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(DeleteAccount);
