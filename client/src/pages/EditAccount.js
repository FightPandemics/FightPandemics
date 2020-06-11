import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "components/Input/Checkbox";
import { getInitials } from "utils/userInfo";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
import { Link } from "react-router-dom";
import UnderLineDescription from "components/Input/UnderlineDescription";
import InputLabel from "components/Input/Label";
import {
  EditLayout,
  TitlePictureWrapper,
  FillEmptySpace,
  CustomLink,
  CustomForm,
  CustomHeading,
  ChangePicButton,
  CustomSubmitButton,
  OptionDiv,
  FormLayout,
  CheckBoxWrapper,
  Label,
  HelpWrapper,
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
  updateUser,
  updateUserError,
  updateUserSuccess,
} from "../hooks/actions/userActions";
import axios from "axios";
import Marker from "../assets/create-profile-images/location-marker.svg";
import { blockLabelStyles } from "../constants/formStyles";
import AddressInput from "../components/Input/AddressInput";
import styled from "styled-components";

const InputWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  position: relative;
`;

const OBJECTIVES = {
  donate: "Donate",
  shareInformation: "Share Information",
  volunteer: "Volunteer",
};

const NEEDS = {
  medicalHelp: ["Medical Help", "I have symptoms of COVID-19"],
  otherHelp: [
    "Other Help",
    "I need assistance getting groceries, medicine, etc.",
  ],
};

function EditAccount() {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const {
    clearError,
    control,
    errors,
    formState,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;
  const {
    firstName = "",
    lastName = "",
    location = {},
    objectives = {},
    needs = {},
  } = user || {};

  console.log({ location });

  const onSubmit = async (formData) => {
    console.log({ formData });
    userProfileDispatch(updateUser());
    try {
      const res = await axios.patch("/api/users/current", formData);
      userProfileDispatch(updateUserSuccess(res.data));
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      userProfileDispatch(
        updateUserError(`Failed updating profile, reason: ${message}`),
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
          fetchUserError(`Failed loading account data, reason: ${message}`),
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
              Account Information
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>
            <ProfilePic
              resolution={"7680px"}
              noPic={true}
              initials={getInitials(firstName, lastName)}
            />
            <ChangePicButton>Change</ChangePicButton>
          </ProfilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink isSelected>
              <Link to="/edit-account">Account Information</Link>
            </CustomLink>
            <CustomLink>
              <Link to="/edit-profile">Profile Information</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <FormInput
              inputTitle="First name"
              name="firstName"
              type="text"
              defaultValue={firstName}
              error={errors.firstName}
              ref={register({})}
            />
            <FormInput
              inputTitle="Last name"
              name="lastName"
              type="text"
              defaultValue={lastName}
              error={errors.lastName}
              ref={register({})}
            />
            <InputWrapper>
              <InputLabel
                htmlFor="location"
                icon={Marker}
                style={blockLabelStyles}
                label="Address"
              />
              <AddressInput
                errors={errors.location}
                location={location}
                onLocationChange={() => {
                  setValue(location);
                }}
                ref={register(
                  { name: "location" },
                  {
                    required: "Location is required",
                  },
                )}
              />
            </InputWrapper>
            <Label>I want to</Label>
            <HelpWrapper>
              {Object.entries(OBJECTIVES).map(([key, label]) => (
                <CheckBoxWrapper key={key}>
                  <Controller
                    as={Checkbox}
                    defaultChecked={objectives[key]}
                    name={`objectives.${key}`}
                    control={control}
                    onChange={([event]) => event.target.checked}
                  >
                    <Label inputColor="#000000">{label}</Label>
                  </Controller>
                </CheckBoxWrapper>
              ))}
            </HelpWrapper>
            <Label>I need</Label>
            <HelpWrapper>
              {Object.entries(NEEDS).map(([key, [label, description]]) => (
                <CheckBoxWrapper key={key}>
                  <Controller
                    as={Checkbox}
                    defaultChecked={needs[key]}
                    name={`needs.${key}`}
                    control={control}
                    onChange={([event]) => event.target.checked}
                  >
                    <Label inputColor="black">{label}</Label>
                    <UnderLineDescription>{description}</UnderLineDescription>
                  </Controller>
                </CheckBoxWrapper>
              ))}
            </HelpWrapper>
            <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
              Save Changes
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(EditAccount);
