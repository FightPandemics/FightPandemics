import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Checkbox from "components/Input/Checkbox";
import { getInitialsFromFullName } from "utils/userInfo";
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
import LocationInput from "../components/Input/LocationInput";
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

function EditAccount(props) {
  // TODO: integrate location w proper react-hook-forms use
  const [location, setLocation] = useState({});
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const {
    clearError,
    control,
    errors,
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "change",
  });
  const { t } = useTranslation();
  const { error, loading, user } = userProfileState;
  const { firstName, hide = {}, lastName, needs = {}, objectives = {} } =
    user || {};

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };

  const onSubmit = async (formData) => {
    if (!location?.address) {
      // all location objects should have address (+coordinates), others optional
      return setError(
        "location",
        "required",
        t("profile.common.addressRequired"),
      );
    }
    userProfileDispatch(updateUser());
    try {
      const res = await axios.patch("/api/users/current", {
        ...formData,
        location,
      });
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
        setLocation(res.data.location);
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
          <CustomEditAccountHeader className="h4">
            {t("profile.individual.editProfile")}
          </CustomEditAccountHeader>
          <ToggleHeading>
            <CustomHeading level={4} className="h4">
              {t("profile.common.accountInfo")}
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>
            <ProfilePic
              resolution={"768rem"}
              allowUpload={false}
              user={user}
              initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
            />
            {/* hide this until backend API is available
              <ChangePicButton>Change</ChangePicButton> */}
          </ProfilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink isSelected>
              <Link to="/edit-account">{t("profile.common.accountInfo")}</Link>
            </CustomLink>
            <CustomLink>
              <Link to="/edit-profile">{t("profile.common.profileInfo")}</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <FormInput
              inputTitle={t("profile.individual.firstName")}
              name="firstName"
              type="text"
              defaultValue={firstName}
              error={errors.firstName}
              ref={register({
                required: t("profile.individual.firstNameRequired"),
                maxLength: {
                  value: 30,
                  message: t("profile.common.maxCharacters", { maxNum: 30 }),
                },
              })}
            />
            <FormInput
              inputTitle={t("profile.individual.lastName")}
              name="lastName"
              type="text"
              defaultValue={lastName}
              error={errors.lastName}
              ref={register({
                required: t("profile.individual.lastNameRequired"),
                maxLength: {
                  value: 30,
                  message: t("profile.common.maxCharacters", { maxNum: 30 }),
                },
              })}
            />
            <InputWrapper>
              <InputLabel
                htmlFor="location"
                icon={Marker}
                style={blockLabelStyles}
                label={t("profile.common.address")}
              />
              <LocationInput
                formError={errors.location}
                location={location}
                onLocationChange={handleLocationChange}
              />
            </InputWrapper>
            <CheckBoxWrapper>
              <Controller
                as={Checkbox}
                defaultValue={hide.address}
                name="hide.address"
                control={control}
                onChange={([event]) => event.target.checked}
                valueName="checked"
              >
                <Label inputColor="#000000">
                  {t("profile.individual.hideAddress")}
                </Label>
              </Controller>
            </CheckBoxWrapper>
            <Label>{t("profile.individual.iWant")}</Label>
            <HelpWrapper>
              {Object.entries(OBJECTIVES).map(([key, label]) => (
                <CheckBoxWrapper key={key}>
                  <Controller
                    as={Checkbox}
                    defaultValue={objectives[key]}
                    name={`objectives.${key}`}
                    control={control}
                    onChange={([event]) => event.target.checked}
                    valueName="checked"
                  >
                    <Label inputColor="#000000">
                      {t("profile.individual." + key)}
                    </Label>
                  </Controller>
                </CheckBoxWrapper>
              ))}
            </HelpWrapper>
            <Label>{t("profile.individual.iNeed")}</Label>
            <HelpWrapper>
              {Object.entries(NEEDS).map(([key, [label, description]]) => (
                <CheckBoxWrapper key={key}>
                  <Controller
                    as={Checkbox}
                    defaultValue={needs[key]}
                    name={`needs.${key}`}
                    control={control}
                    onChange={([event]) => event.target.checked}
                    valueName="checked"
                  >
                    <Label inputColor="black">
                      {label === "Medical Help"
                        ? t("profile.individual.medical")
                        : t("profile.individual.other")}
                    </Label>
                    <UnderLineDescription>
                      {description === "I have symptoms of COVID-19"
                        ? t("profile.individual.haveCovidSymptoms")
                        : t("profile.individual.otherDesc")}
                    </UnderLineDescription>
                  </Controller>
                </CheckBoxWrapper>
              ))}
            </HelpWrapper>
            <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
              {t("profile.common.saveChanges")}
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(EditAccount);
