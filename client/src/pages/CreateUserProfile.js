import { Flex, WhiteSpace } from "antd-mobile";
import React, { useReducer, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  InputWrapper,
  InputGroup,
  CheckboxContainer,
} from "components/OrganisationProfile/CreateProfileComponents";
import StyledCheckbox from "components/Input/Checkbox";
import PersonalDataImage from "assets/create-profile-images/personal-data.svg";
import Marker from "assets/create-profile-images/location-marker.svg";
import logo from "assets/logo.svg";
import LocationInput from "components/Input/LocationInput";
import ErrorAlert from "components/Alert/ErrorAlert";
import Logo from "components/Logo";
import Input from "components/Input/BaseInput";
import Checkbox from "components/Input/Checkbox";
import InputError from "components/Input/InputError";
import Label from "components/Input/Label";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";
import SubmitButton from "components/Button/SubmitButton";
import PrivacyPolicyContent from "components/PolicyPages/PrivacyPolicyContent";
import TermsConditionsContent from "components/PolicyPages/TermsConditionsContent";
import PolicyModal from "components/PolicyPages/PolicyModal";
import { theme, mq } from "constants/theme";
import {
  blockLabelStyles,
  inputStyles,
  inlineLabelStyles,
} from "constants/formStyles";
import { CREATE_USER, CREATE_USER_ERROR } from "hooks/actions/userActions";
import {
  createUserFormReducer,
  initialState,
} from "hooks/reducers/userReducers";
import { validateEmail } from "../utils/validators";
import axios from "axios";
import { SET_USER } from "../constants/action-types";
import GTM from "constants/gtm-tags";

const StyledUnderlineLink = styled.a`
  text-decoration-line: underline;
`;

const BrandLink = styled(Link)`
  align-self: flex-start;
  img {
  }
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    padding-left: 4rem;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  .form-container {
    background-color: ${theme.colors.offWhite};
    width: 100%;
    @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      margin-left: 50%;
      width: 50%;
    }
    @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
      margin-left: 40%;
      width: 60%;
    }
  }
  .image-container {
    background-color: ${theme.colors.selago};
    display: flex;
    justify-content: flex-start;
    @media only screen and ${mq.phone.wide.max} {
      display: none;
    }
    @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      height: 100vh;
      position: fixed;
      width: 50%;
    }
    @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
      height: 100vh;
      position: fixed;
      width: 40%;
    }
    .main-bg-image {
      margin-top: 14rem;
    }
  }
  .form-container,
  .image-container {
    padding: 1rem;
  }
`;

const ProfileFormGroup = styled.form`
  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    width: 35rem;
    h1 {
      margin-left: -${theme.typography.size.large};
    }
  }
  p {
    margin-bottom: 0;
  }
`;

const CheckboxGroup = ({
  defaultValue,
  description,
  label,
  name,
  onChange,
}) => {
  return (
    <CheckboxContainer>
      <Checkbox
        defaultValue={defaultValue}
        color={theme.colors.royalBlue}
        id={name}
        name={name}
        size={theme.typography.size.xxlarge}
        onChange={onChange}
      />
      <Flex direction="column" align="start">
        <Label htmlFor={name} style={inlineLabelStyles} label={label} />
        {description && <span>{description}</span>}
      </Flex>
    </CheckboxContainer>
  );
};

const Submit = styled(SubmitButton)`
  font-weight: 500;
`;

const handleCheckboxChange = ([evt]) => evt.target.checked;

const CreateProfile = ({ email, firstName, lastName, history }) => {
  const [location, setLocation] = useState(null);
  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(
    false,
  );
  const [
    termsConditionsModalVisible,
    setTermsConditionsModalVisible,
  ] = useState(false);
  const dispatch = useDispatch();
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
  const [createUserFormState, createUserFormDispatch] = useReducer(
    createUserFormReducer,
    initialState,
  );
  const { t } = useTranslation();

  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.checked);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.checked);
  };

  const showPrivacyPolicyModal = (e) => {
    e.preventDefault();
    setPrivacyPolicyModalVisible(true);
  };
  const hidePrivacyPolicyModal = () => {
    setPrivacyPolicyModalVisible(false);
  };

  const showTermsConditionsModal = (e) => {
    e.preventDefault();
    setTermsConditionsModalVisible(true);
  };
  const hideTermsConditionsModal = () => {
    setTermsConditionsModalVisible(false);
  };

  const onSubmit = async (formData) => {
    if (!privacy) {
      alert(t("error.privacyPolicyRequired"));
      return;
    } else if (!conditions) {
      alert(t("error.termsConditionsRequired"));
      return;
    } else if (!location) {
      // all location objects should have address (+coordinates), others optional
      return setError(
        "location",
        "required",
        t("profile.common.addressRequired"),
      );
    }
    createUserFormDispatch({ type: CREATE_USER });
    try {
      const { email, ...body } = formData;
      body.location = location;
      const res = await axios.post("/api/users", body);

      dispatch({
        type: SET_USER,
        payload: { user: res.data },
      });
      history.push("/profile-completed");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      createUserFormDispatch({
        type: CREATE_USER_ERROR,
        error: `${t("error.failedCreatingUser")} ${translatedErrorMessage}`,
      });
    }
  };

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };

  return (
    <Container>
      <Flex className="image-container" direction="column">
        <BrandLink to="/">
          <Logo src={logo} alt={t("alt.logo")} />
        </BrandLink>
        <img
          className="main-bg-image"
          src={PersonalDataImage}
          alt={t("alt.personalDataImage")}
        />
      </Flex>
      <Flex className="form-container" direction="column">
        <WhiteSpace size="xl" />
        <ProfileFormGroup>
          <Heading className="text-center" level={4}>
            {t("profile.common.createProfile")}
          </Heading>
          {createUserFormState.error && (
            <ErrorAlert message={createUserFormState.error} type="error" />
          )}
          <InputGroup>
            <InputWrapper>
              <Label
                htmlFor="email"
                style={{ ...blockLabelStyles, color: theme.colors.darkGray }}
                label={t("profile.individual.email")}
              />
              <Input
                type="email"
                name="email"
                required
                id="email"
                className={errors.email && "has-error"}
                disabled
                ref={register({
                  validate: (email) =>
                    validateEmail(email) || t(`profile.common.${validateEmail.errorMessage}`),
                })}
                style={inputStyles}
                value={email}
              />
              {errors.email && <InputError>{errors.email.message}</InputError>}
            </InputWrapper>

            <InputWrapper>
              <Label
                htmlFor="firstName"
                style={blockLabelStyles}
                label={t("profile.individual.firstName")}
              />
              <Input
                type="text"
                name="firstName"
                id="firstName"
                className={errors.firstName && "has-error"}
                ref={register({
                  required: t("profile.individual.firstNameRequired"),
                  maxLength: {
                    value: 30,
                    message: t("profile.common.maxCharacters", {
                      maxNum: 30,
                    }),
                  },
                })}
                style={inputStyles}
                value={firstName}
              />
              {errors.firstName && (
                <InputError>{errors.firstName.message}</InputError>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label
                htmlFor="lastName"
                style={blockLabelStyles}
                label={t("profile.individual.lastName")}
              />
              <Input
                type="text"
                name="lastName"
                id="lastName"
                className={errors.lastName && "has-error"}
                ref={register({
                  required: t("profile.individual.lastNameRequired"),
                  maxLength: {
                    value: 30,
                    message: t("profile.common.maxCharacters", { maxNum: 30 }),
                  },
                })}
                style={inputStyles}
                value={lastName}
              />
              {errors.lastName && (
                <InputError>{errors.lastName.message}</InputError>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label
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
          </InputGroup>
          {/*
            temporarily disabled until the fields are added to the API
          <CheckboxGroup description="I am traveling" />
          */}
          <InputGroup>
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label={t("profile.individual.hideAddress")}
              name="hide.address"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <TextLabel
              color={theme.colors.royalBlue}
              size={theme.typography.size.large}
              weight={500}
            >
              {t("profile.individual.iWant")}
            </TextLabel>
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label={t("profile.individual.volunteer")}
              name="objectives.volunteer"
              onChange={handleCheckboxChange}
            />
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label={t("profile.individual.donate")}
              name="objectives.donate"
              onChange={handleCheckboxChange}
            />
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label={t("profile.individual.shareInformation")}
              name="objectives.shareInformation"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <TextLabel
              color={theme.colors.royalBlue}
              size={theme.typography.size.large}
              weight={500}
            >
              {t("profile.individual.iNeed")}
            </TextLabel>
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              description={t("profile.individual.haveCovidSymptoms")}
              label={t("profile.individual.medical")}
              name="needs.medicalHelp"
              onChange={handleCheckboxChange}
            />
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              description={t("profile.individual.otherDesc")}
              label={t("profile.individual.other")}
              name="needs.otherHelp"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputWrapper>
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Privacy Policy"
              onChange={handleInputChangePrivacy}
            >
              <Trans i18nKey="profile.common.agreePrivacy">
                <StyledUnderlineLink onClick={showPrivacyPolicyModal}>
                  Privacy Policy
                </StyledUnderlineLink>
              </Trans>
            </StyledCheckbox>
            <WhiteSpace />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Terms and Conditions"
              onChange={handleInputChangeConditions}
            >
              <Trans i18nKey="profile.common.agreeTerms">
                <StyledUnderlineLink onClick={showTermsConditionsModal}>
                  Terms and Conditions
                </StyledUnderlineLink>
              </Trans>
            </StyledCheckbox>
          </InputWrapper>
          <InputGroup>
            <Submit
              disabled={!formState.isValid || !(privacy && conditions)}
              primary="true"
              onClick={handleSubmit(onSubmit)}
              id={GTM.user.profilePrefix + GTM.profile.createProfile}
            >
              {createUserFormState.loading
                ? t("profile.common.submitLoading")
                : t("profile.common.submit")}
            </Submit>
          </InputGroup>
        </ProfileFormGroup>
      </Flex>
      <PolicyModal
        title="Privacy Policy"
        visible={privacyPolicyModalVisible}
        handleHideModal={hidePrivacyPolicyModal}
      >
        <PrivacyPolicyContent />
      </PolicyModal>
      <PolicyModal
        title={`Terms & Conditions`}
        visible={termsConditionsModalVisible}
        handleHideModal={hideTermsConditionsModal}
      >
        <TermsConditionsContent />
      </PolicyModal>
    </Container>
  );
};

const mapStateToProps = ({ session }) => ({
  email: session.email,
  firstName: session.firstName,
  lastName: session.lastName,
});

export default connect(mapStateToProps)(CreateProfile);
